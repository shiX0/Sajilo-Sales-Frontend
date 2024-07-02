import { useState } from "react";
import logo from "@/assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginUserApi } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let isValid = true;
    if (email === "") {
      setEmailError("Please enter email");
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Please enter password");
      isValid = false;
    }
    return isValid;
  };
  const handlemailchange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlpasswordchange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const navigator = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const Form = new FormData();
    Form.append("email", email);
    Form.append("password", password);
    console.log(Form);
    loginUserApi(Form).then((res) => {
      if (res.data.sucess == true) {
        toast({
          title: "Log In Sucessfull!",
          description: "Welcome to Sajilo Sales!",
        });
        localStorage.setItem("token", res.data.token);

        const currentuser = JSON.stringify(res.data.user);
        localStorage.setItem("user", currentuser);
        navigator("/");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Try again with different credientials",
        });
      }
    });
  };
  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center text-white">
          <img
            src="https://images.unsplash.com/photo-1602665742701-389671bc40c0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9zfGVufDB8fDB8fHww"
            alt="Placeholder Image"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 flex justify-center items-center text-white p-8">
            <img src={logo} alt="logo" />
            <h1 className="text-5xl font-bold ml-4 text-gray-700">
              Sajilo Sales
            </h1>
          </div>
        </div>
        <div className="w-1/2 bg-black flex flex-col justify-center items-center">
          <a className="mb-8" />
          <h1 className="text-2xl mb-4 text-white">Login In with email</h1>
          <form className="w-2/3">
            <Input
              type="email"
              placeholder="name@example.com"
              className="mb-4 text-white"
              onChange={handlemailchange}
            />
            {emailError && <p className="text-red-900">{emailError}</p>}
            <Input
              type="password"
              placeholder="Enter your passsword"
              className="mb-4 text-white"
              onChange={handlpasswordchange}
            />
            {passwordError && <p className="text-red-900">{passwordError}</p>}
            <Button className="w-full mb-4" onClick={handleLogin}>
              Log In
            </Button>
            {/* Remove the GitHub Button */}
          </form>
          <div className="flex justify-around">
            <Button variant="ghost">
              <a href="/register">Register</a>
            </Button>
            <Button variant="ghost">
              <a href="/forgot-password">Forgot Password?</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
