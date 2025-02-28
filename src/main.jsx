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
import PrivateRoute from "./routes/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
     {
      path: "/",
      element:  <PrivateRoute><TaskBoard></TaskBoard></PrivateRoute>,
     },
      {
        path:"/",
        element: <PrivateRoute><TaskList></TaskList></PrivateRoute>
      },
      {
        path:"/add-task",
        element: <PrivateRoute><TaskForm></TaskForm></PrivateRoute>
      },
      {
        path:"/taskList",
        element: <PrivateRoute><TaskList></TaskList></PrivateRoute>
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
