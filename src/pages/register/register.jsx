import React, { useState } from "react";
import logo from "@/assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Address, SetAddress] = useState("");
  const [Password, SetPassword] = useState("");
  const [ConfirmPassword, SetConfirmPassword] = useState("");

  return (
    <div className="flex h-screen w-full">
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
        <Button variant="ghost" className="absolute right-0 top-0 m-7">
          <a href="/login" className="text-l text-white">
            Login
          </a>
        </Button>
        {/* <DarkModeToggle /> */}
        <a className="mb-8" />
        <h1 className="text-2xl mb-2 text-white">Create an account</h1>
        <p className="mb-8 text-gray-500">
          Enter your details below to create your account
        </p>
        <form className="w-2/3">
          <Input
            type="email"
            placeholder="name@example.com"
            className="mb-4 text-white"
          />
          <div className="flex">
            <Input
              type="fname"
              placeholder="First Name"
              className="mb-4 mr-2 text-white"
            />
            <Input
              type="lname"
              placeholder="Last Name"
              className="mb-4 ml-2 text-white"
            />
          </div>
          <Input
            type="text"
            placeholder="Enter your Address."
            className="mb-4 text-white"
          />
          <div className="flex">
            <Input
              type="password"
              placeholder="Password."
              className="mb-4 mr-2 text-white"
            />
            <Input
              type="password"
              placeholder="Confirm Password."
              className="mb-4 ml-2 text-white"
            />
          </div>

          <Button className="w-full mb-4">Sign In with Email</Button>
          {/* Remove the GitHub Button */}
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
