import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
