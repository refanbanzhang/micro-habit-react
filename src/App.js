import { RouterProvider } from "react-router-dom";
import router from "@/router";
import useThemeContext from "@/shared/hooks/useThemeContext";

function App() {
  const { state } = useThemeContext();

  const className = `${state}-theme mx-auto max-w-[500px] min-h-[100vh]`;

  return (
    <div className={className}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
