// src/components/DarkModeToggle.js
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const storedValue = localStorage.getItem("darkMode");
      return storedValue !== null ? JSON.parse(storedValue) : false;
    } catch (error) {
      console.error("Error loading dark mode state from localStorage:", error);
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    } catch (error) {
      console.error("Error saving dark mode state to localStorage:", error);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id="toggle"
        className="sr-only"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label
        htmlFor="toggle"
        className="flex items-center cursor-pointer relative w-14 h-8 bg-gray-300 rounded-full p-1 transition-colors duration-300 ease-in-out dark:bg-blue-600"
      >
        <span
          className={`absolute left-2 text-yellow-500 transition-opacity duration-300 ease-in-out ${
            isDarkMode ? "opacity-100" : "opacity-0"
          }`}
        >
          <FontAwesomeIcon icon="sun" />
        </span>
        <span
          className={`absolute right-2 text-gray-400 transition-opacity duration-300 ease-in-out ${
            isDarkMode ? "opacity-0" : "opacity-100"
          }`}
        >
          <FontAwesomeIcon icon="moon" />
        </span>
        <span
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isDarkMode ? "translate-x-6" : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
