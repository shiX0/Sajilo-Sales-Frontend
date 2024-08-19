import { useEffect } from "react";

const ThemeChecker = () => {
  useEffect(() => {
    const storedValue = localStorage.getItem("darkMode");
    const isDarkMode = storedValue !== null ? JSON.parse(storedValue) : false;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null; // This component doesn't render anything
};

export default ThemeChecker;
