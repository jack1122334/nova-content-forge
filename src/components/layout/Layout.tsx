
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "./MainSidebar";

const Layout: React.FC = () => {
  const [userType, setUserType] = useState<"personal" | "brand">("personal");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#FAFAFA]">
        <MainSidebar userType={userType} setUserType={setUserType} />
        <main className="flex-1 min-h-screen">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
