
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import MainSidebar from "./MainSidebar";
import { cn } from "@/lib/utils";

// Inner component to access sidebar context
const LayoutContent = ({ userType, setUserType }: { 
  userType: "personal" | "brand" | "agency"; 
  setUserType: (type: "personal" | "brand" | "agency") => void;
}) => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div className="min-h-screen flex w-full bg-[#FAFAFA]">
      <MainSidebar userType={userType} setUserType={setUserType} />
      <main className={cn(
        "flex-1 min-h-screen transition-all duration-300",
        isCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const Layout: React.FC = () => {
  const [userType, setUserType] = useState<"personal" | "brand" | "agency">("personal");

  return (
    <SidebarProvider>
      <LayoutContent userType={userType} setUserType={setUserType} />
    </SidebarProvider>
  );
};

export default Layout;
