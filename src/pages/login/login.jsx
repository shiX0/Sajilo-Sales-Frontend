import React from "react";
import logo from "@/assets/logo.svg";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import DarkModeToggle from "@/components/darkmodetoggle";

const Login = () => {
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
            />

            <Input
              type="password"
              placeholder="Enter your passsword"
              className="mb-4 text-white"
            />
            <Button className="w-full mb-4">Log In</Button>
            {/* Remove the GitHub Button */}
          </form>
          <div className="flex justify-around">
            <Button variant="ghost">
              <a href="/register">Register</a>
            </Button>
            <Button variant="ghost">Forgot Password?</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
