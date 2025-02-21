import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./Components/Login";
import { AuthProvider } from "./context/AuthContext";
import TaskList from "./Components/TaskList";
import TaskForm from "./Components/TaskForm";
import TaskBoard from "./Components/TaskBoard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
     {
      path: "/",
      element: <TaskBoard></TaskBoard>,
     },
      {
        path:"/",
        element:<TaskList></TaskList>
      },
      {
        path:"/add-task",
        element:<TaskForm></TaskForm>
      },
    ]
  },
  {
    path:"/login",
    element: <Login></Login>,
  },
 
]);
createRoot(document.getElementById("root")).render(
  <AuthProvider>
  {/* <StrictMode> */}
    <RouterProvider router={router} />
  {/* </StrictMode> */}
  </AuthProvider>
);
