
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  PenTool, 
  Lightbulb, 
  FileText, 
  User, 
  Briefcase,
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface MainSidebarProps {
  userType: "personal" | "brand";
  setUserType: (type: "personal" | "brand") => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ userType, setUserType }) => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  
  const generalNavItems = [
    { name: "首页", path: "/", icon: Home },
    { name: "品牌任务广场", path: "/marketplace", icon: ShoppingBag },
    { name: "创作台", path: "/studio", icon: PenTool },
    { name: "灵感广场", path: "/inspiration", icon: Lightbulb },
    { name: "模板提交", path: "/templates/submit", icon: FileText },
  ];
  
  const userTypeNavItem = { 
    name: userType === "personal" ? "个人中心" : "品牌中心", 
    path: userType === "personal" ? "/profile" : "/brand", 
    icon: userType === "personal" ? User : Briefcase 
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <Sidebar variant="floating" className="backdrop-blur-sm bg-white/70 border-r border-gray-200 text-nova-dark-gray">
        <SidebarRail />
        <SidebarHeader className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-blue to-nova-deep-purple">Nova</h1>
            </Link>
            <SidebarTrigger />
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button
              variant={userType === "personal" ? "default" : "ghost"}
              onClick={() => setUserType("personal")}
              size="sm"
              className={userType === "personal" 
                ? "bg-gradient-to-r from-nova-blue to-nova-deep-purple text-white hover:from-nova-blue/90 hover:to-nova-deep-purple/90 transition-all" 
                : "text-nova-dark-gray hover:text-nova-blue"
              }
            >
              我是个人
            </Button>
            <Button
              variant={userType === "brand" ? "default" : "ghost"}
              onClick={() => setUserType("brand")}
              size="sm"
              className={userType === "brand" 
                ? "bg-gradient-to-r from-nova-blue to-nova-deep-purple text-white hover:from-nova-blue/90 hover:to-nova-deep-purple/90 transition-all" 
                : "text-nova-dark-gray hover:text-nova-blue"
              }
            >
              我是品牌方
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-nova-dark-gray hover:text-nova-blue"
            >
              我是代理商
            </Button>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>导航</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {generalNavItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      tooltip={item.name}
                    >
                      <Link to={item.path} className={cn(
                        "group flex items-center",
                        location.pathname === item.path && "text-nova-blue"
                      )}>
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.name}</span>
                        {location.pathname === item.path && (
                          <div className="absolute right-4 w-1 h-6 bg-gradient-to-b from-nova-blue to-nova-deep-purple rounded-full" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarSeparator />
          
          <SidebarGroup>
            <SidebarGroupLabel>用户</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === userTypeNavItem.path}
                    tooltip={userTypeNavItem.name}
                  >
                    <Link to={userTypeNavItem.path} className={cn(
                      "group flex items-center",
                      location.pathname === userTypeNavItem.path && "text-nova-blue"
                    )}>
                      <userTypeNavItem.icon className="mr-3 h-5 w-5" />
                      <span>{userTypeNavItem.name}</span>
                      {location.pathname === userTypeNavItem.path && (
                        <div className="absolute right-4 w-1 h-6 bg-gradient-to-b from-nova-blue to-nova-deep-purple rounded-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-white/50 rounded-lg transition-all">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || ""} />
                      <AvatarFallback className="bg-gradient-to-r from-nova-blue to-nova-deep-purple text-white">
                        {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-nova-dark-gray">
                      {profile?.username || user.email?.split('@')[0]}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>个人中心</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>退出登录</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/auth?tab=register"
                className="w-full px-4 py-2 text-sm text-center font-medium rounded-lg border border-nova-blue/20 bg-gradient-to-r from-nova-blue/10 to-nova-deep-purple/10 text-nova-blue backdrop-blur-sm transition-all hover:from-nova-blue/20 hover:to-nova-deep-purple/20"
              >
                注册
              </Link>
              <Link
                to="/auth"
                className="w-full px-4 py-2 text-sm text-center font-medium rounded-lg bg-gradient-to-r from-nova-blue to-nova-deep-purple text-white transition-all hover:from-nova-blue/90 hover:to-nova-deep-purple/90"
              >
                登录
              </Link>
            </div>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default MainSidebar;
