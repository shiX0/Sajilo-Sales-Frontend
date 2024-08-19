import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@radix-ui/react-toggle";
import { useEffect } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("darkMode");
    const initialIsDarkMode =
      storedValue !== null ? JSON.parse(storedValue) : false;
    setIsDarkMode(initialIsDarkMode);

    if (initialIsDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newIsDarkMode));

    if (newIsDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Toggle
      className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full cursor-pointer"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <Moon className="text-gray-700 dark:text-gray-200" size={24} />
      ) : (
        <Sun className="text-gray-700 dark:text-gray-200" size={24} />
      )}
    </Toggle>
  );
};

export default DarkModeToggle;
