import { testApi } from "@/api/api";
import React, { useEffect } from "react";

function Homepage() {
  useEffect(() => {
    console.log("Hello");

    testApi().then((res) => {
      console.log(res);
    });
  });
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default Homepage;
