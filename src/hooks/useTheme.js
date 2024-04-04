import { useState } from "react";

const THEME = "theme";

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem(THEME) || "light");

  const updateTheme = (value) => {
    setTheme(value);
    localStorage.setItem(THEME, value);
  };

  return {
    theme,
    updateTheme,
  };
};

export default useTheme;
