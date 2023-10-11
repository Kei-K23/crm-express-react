import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Entry from "./pages/Entry";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/acc/:id",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Entry />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
