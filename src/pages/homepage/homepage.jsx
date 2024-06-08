import { testApi } from "@/api/api";
import NavBar from "@/components/navbar";
import React, { useEffect } from "react";
import Dashboard from "./layout";

function Homepage() {
  useEffect(() => {
    console.log("Hello");

    testApi().then((res) => {
      console.log(res);
    });
  });
  return (
    <>
      <Dashboard />
    </>
  );
}

export default Homepage;
