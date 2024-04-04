import { RouterProvider } from "react-router-dom";
import router from "@/router";
import FallbackLoading from '@/components/FallbackLoading';

function App() {
  return (
    <div className="mx-auto max-w-[500px] min-h-[100vh]">
      <RouterProvider router={router} fallbackElement={<FallbackLoading />} />
    </div>
  );
}

export default App;
