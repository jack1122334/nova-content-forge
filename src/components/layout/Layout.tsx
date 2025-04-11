
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout: React.FC = () => {
  const [userType, setUserType] = useState<"personal" | "brand">("personal");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Sidebar userType={userType} setUserType={setUserType} />
      <Header userType={userType} setUserType={setUserType} />
      <main className="pt-16 pl-64 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
