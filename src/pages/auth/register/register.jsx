import { useState } from "react";
import logo from "@/assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUserApi } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handling error;
  const [firstNameError, setfirstNameError] = useState();
  const [lastNameError, setlastNameError] = useState();
  const [emailError, setemailError] = useState();
  const [addressError, setaddressError] = useState();
  const [passwordError, setpasswordError] = useState();
  const [confirmPasswordError, setconfirmPasswordError] = useState();

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    if (firstName.trim() === "") {
      setfirstNameError("Please enter first name");
      isValid = false;
    } else {
      setfirstNameError("");
    }

    if (lastName.trim() === "") {
      setlastNameError("Please enter last name");
      isValid = false;
    } else {
      setlastNameError("");
    }

    if (email.trim() === "") {
      setemailError("Please enter email");
      isValid = false;
    } else {
      setemailError("");
    }

    if (address.trim() === "") {
      setaddressError("Please enter address");
      isValid = false;
    } else {
      setaddressError("");
    }

    if (password.trim() === "") {
      setpasswordError("Please enter password");
      isValid = false;
    } else {
      setpasswordError("");
    }

    if (confirmPassword !== password) {
      setconfirmPasswordError("Passwords does not match!");
      isValid = false;
    } else {
      setconfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }

    // Proceed with form submission
    console.log(email, firstName, lastName, address, password, confirmPassword);
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      password: password,
    };
    registerUserApi(data).then((res) => {
      // sucess message true/false
      if (res.data.success === true) {
        toast({
          title: "Register Sucessfull!",
          description: "Welcome to Sajilo Sales!",
        }).then(navigate("/login"));
      } else {
        toast({
          variant: "destructive",
          title: "Register Unsucessful!",
          description: res.data.message,
        });
      }
    });
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 flex flex-col justify-center items-center ">
        <img
          src="https://images.unsplash.com/photo-1602665742701-389671bc40c0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9zfGVufDB8fDB8fHww"
          alt="Placeholder Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2  flex flex-col justify-center items-center">
        <Button variant="ghost" className="absolute right-0 top-0 m-7">
          <a href="/login" className="text-l ">
            Login
          </a>
        </Button>
        <a className="mb-8" />
        <div className="flex justify-center items-center  p-8">
          <img src={logo} alt="logo" />
          <h1 className="text-5xl font-bold ml-">Sajilo Sales</h1>
        </div>
        <h1 className="text-2xl mb-2">Create an account</h1>
        <p className="mb-8 text-gray-500 font-bold">
          Enter your details below to create your account
        </p>
        <form className="w-2/3" onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
            className="mb-4 "
          />
          {emailError && <p className="text-red-900">{emailError}</p>}

          <div className="flex">
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              className="mb-4 mr-2 "
            />
            <Input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last Name"
              className="mb-4 ml-2 "
            />
          </div>
          {(firstNameError || lastNameError) && (
            <p className="text-red-900 mb-1 mt-0">
              {firstNameError && <span>{firstNameError} </span>}
              {lastNameError && <span className="ml-40">{lastNameError}</span>}
            </p>
          )}
          <Input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter your address."
            className="mb-4 "
          />
          {addressError && <p className="text-red-800">{addressError}</p>}
          <div className="flex">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="mb-4 mr-2 "
            />
            <Input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="mb-4 ml-2 "
            />
          </div>
          {(passwordError || confirmPasswordError) && (
            <p className="text-red-900 mb-1 mt-0">
              {passwordError && <span>{passwordError} </span>}
              {confirmPasswordError && <span>{confirmPasswordError}</span>}
            </p>
          )}

          <Button type="submit" className="w-full mb-4">
            Sign In with email
          </Button>
        </form>
        <p className="text-gray-500 text-sm">
          By clicking continue, you agree to our
          <a href="/terms" className="underline text-gray-300">
            Terms of Service{" "}
          </a>
          and
          <a href="/privacy" className="underline text-gray-300">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
