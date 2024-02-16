import { useContext } from "react";
import { ThemeContext } from "../themes/ThemeProvider";

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="mx-auto w-1/2 pt-20 flex justify-between">
      <h1>My App</h1>
      <button
        className="bg-slate-300 rounded-xl px-4 py-2 hover:bg-blue-400"
        onClick={toggleTheme}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;
