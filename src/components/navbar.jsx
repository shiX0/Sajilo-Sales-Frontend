import React from "react";
import DarkModeToggle from "./darkmodetoggle";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      <div className="flex mb-8 mx-auto border-gray-200 dark:border-gray-700 py-4 px-8 justify-between items-center">
        <div>
          <Button variant="link">
            <NavLink to="/" exact className="hover:text-gray-200 text-gray-400">
              Overview
            </NavLink>
          </Button>
          <Button variant="link">
            <NavLink
              to="/Customers"
              exact
              className="hover:text-gray-200 text-gray-400"
            >
              Customers
            </NavLink>
          </Button>
          <Button variant="link">
            <NavLink
              to="/Products"
              exact
              className="hover:text-gray-200 text-gray-400"
            >
              Products
            </NavLink>
          </Button>
          <Button variant="link">
            <NavLink
              to="/Orders"
              exact
              className="hover:text-gray-200 text-gray-400"
            >
              Orders
            </NavLink>
          </Button>
          <Button variant="link">
            <NavLink
              to="/Settings"
              exact
              className="hover:text-gray-200 text-gray-400"
            >
              Settings
            </NavLink>
          </Button>
        </div>

        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
