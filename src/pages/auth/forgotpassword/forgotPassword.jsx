import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { forgotPasswordApi, resetPasswordApi } from "../../../api/api";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateVerificationCode = (code) => {
    return /^\d{6}$/.test(code);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateSendCode = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPassword = () => {
    const newErrors = {};
    if (!verificationCode)
      newErrors.verificationCode = "Verification code is required";
    else if (!validateVerificationCode(verificationCode))
      newErrors.verificationCode = "Verification code must be 6 digits";
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (!validatePassword(newPassword))
      newErrors.newPassword = "Password must be at least 8 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors({});
  };

  const handleSendCode = async () => {
    if (validateSendCode()) {
      setIsLoading(true);
      try {
        const res = await forgotPasswordApi({ email });
        if (res.data.success) {
          toast({
            title: "Verification code sent successfully!",
            description:
              "Check your email for the verification code and enter it along with your new password.",
          });
          setIsCodeSent(true);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response?.data?.message ||
            "Failed to send verification code. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (validateResetPassword()) {
      setIsLoading(true);
      try {
        const res = await resetPasswordApi({
          email,
          verificationCode,
          newPassword,
        });
        if (res.data.success) {
          toast({
            title: "Password Reset Successfully",
            description:
              "Your password has been updated. You can now log in with your new password.",
          });
          navigate("/login"); // Assuming you have a login route
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response?.data?.message ||
            "Failed to reset password. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot password</CardTitle>
          <CardDescription>
            {isCodeSent
              ? "Enter the verification code sent to your email and set a new password."
              : "Enter your email below to receive a verification code."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={handleInputChange(setEmail)}
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              required
              disabled={isCodeSent}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {isCodeSent && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  onChange={handleInputChange(setVerificationCode)}
                  id="verificationCode"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter verification code"
                  required
                />
                {errors.verificationCode && (
                  <p className="text-red-500 text-sm">
                    {errors.verificationCode}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  onChange={handleInputChange(setNewPassword)}
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  required
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={isCodeSent ? handleResetPassword : handleSendCode}
            disabled={loading}
          >
            {loading ? (
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-dark"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : isCodeSent ? (
              "Reset Password"
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
