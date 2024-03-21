import { RouterProvider } from "react-router-dom";
import classNames from "classnames";
import router from "@/router";
import useThemeContext from "@/shared/hooks/useThemeContext";

function App() {
  const { state: theme } = useThemeContext();

  return (
    <div
      className={classNames([
        `${theme}-theme`,
        "mx-auto",
        "max-w-[500px]",
        "min-h-[100vh]",
      ])}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
