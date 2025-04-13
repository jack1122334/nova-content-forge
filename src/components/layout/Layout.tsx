
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "./MainSidebar";
import DecorativeElements from "../home/DecorativeElements";

const Layout: React.FC = () => {
  const [userType, setUserType] = useState<"personal" | "brand" | "agency">("personal");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative overflow-hidden">
        {/* Background decorative elements that cover the entire screen */}
        <div className="fixed inset-0 w-full h-full -z-10">
          <DecorativeElements />
        </div>
        
        <MainSidebar userType={userType} setUserType={setUserType} />
        <main className="flex-1 min-h-screen transition-all duration-300">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
