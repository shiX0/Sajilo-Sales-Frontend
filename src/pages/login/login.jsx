import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center text-white">
        <img
          src="https://images.pexels.com/photos/7175967/pexels-photo-7175967.jpeg"
          alt="Placeholder Image"
          width={300}
          height={300}
          className="mb-8"
        />
        <p className="italic text-center">
          “This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.”
        </p>
        <p className="mt-4">Sofia Davis</p>
      </div>
      <div className="w-1/2 bg-black flex flex-col justify-center items-center">
        <a className="mb-8" />
        <h1 className="text-2xl mb-4 text-white">Create an account</h1>
        <form className="w-2/3">
          <Input type="email" placeholder="name@example.com" className="mb-4" />
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

export default Login;
