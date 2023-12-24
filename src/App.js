import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Index from './pages/index'
import Login from './pages/login'
import Register from './pages/register'

const router = createHashRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
