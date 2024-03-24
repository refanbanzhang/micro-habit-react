import { RouterProvider } from "react-router-dom";
import router from "@/router";

function App() {
  return (
    <div className="mx-auto max-w-[500px] min-h-[100vh]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
