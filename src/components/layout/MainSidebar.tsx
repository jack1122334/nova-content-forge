import React, { useState, useEffect } from "react";
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
  ChevronRight,
  Users,
  Menu,
  ChevronLeft
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
  userType: "personal" | "brand" | "agency";
  setUserType: (type: "personal" | "brand" | "agency") => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({ userType, setUserType }) => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const generalNavItems = [
    { name: "首页", path: "/", icon: Home },
    { name: "品牌任务广场", path: "/marketplace", icon: ShoppingBag },
    { name: "创作台", path: "/studio", icon: PenTool },
    { name: "灵感广场", path: "/inspiration", icon: Lightbulb },
    { name: "模板提交", path: "/templates/submit", icon: FileText },
  ];
  
  const userTypeNavItem = { 
    name: userType === "personal" ? "个人中心" : userType === "brand" ? "品牌中心" : "代理商中心", 
    path: userType === "personal" ? "/profile" : userType === "brand" ? "/brand" : "/agency", 
    icon: userType === "personal" ? User : userType === "brand" ? Briefcase : Users 
  };

  const handleLogout = async () => {
    await signOut();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Sidebar 
        variant="floating" 
        className={cn(
          "backdrop-blur-md bg-white/5 border-r border-white/10 text-nova-dark-gray transition-all duration-300",
          isCollapsed && "md:w-16"
        )}
      >
        <SidebarRail className="hidden" />
        <SidebarHeader className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className={cn("flex items-center", isCollapsed && "md:hidden")}>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-blue to-nova-deep-purple">Nova</h1>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="hover:bg-white/10 text-nova-dark-gray"
            >
              {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={cn(isCollapsed && "md:hidden")}>导航</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {generalNavItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      tooltip={isCollapsed ? item.name : undefined}
                    >
                      <Link to={item.path} className={cn(
                        "group flex items-center",
                        location.pathname === item.path ? "text-nova-blue" : "text-nova-dark-gray hover:text-nova-dark-gray/80"
                      )}>
                        <item.icon className="mr-3 h-5 w-5" />
                        <span className={cn(isCollapsed && "md:hidden")}>{item.name}</span>
                        {location.pathname === item.path && !isCollapsed && (
                          <div className={cn(
                            "absolute right-4 w-1 h-6 bg-gradient-to-b from-nova-blue to-nova-deep-purple rounded-full",
                            isCollapsed && "md:hidden"
                          )} />
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
            <SidebarGroupLabel className={cn(isCollapsed && "md:hidden")}>用户</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === userTypeNavItem.path}
                    tooltip={isCollapsed ? userTypeNavItem.name : undefined}
                  >
                    <Link to={userTypeNavItem.path} className={cn(
                      "group flex items-center",
                      location.pathname === userTypeNavItem.path ? "text-nova-blue" : "text-nova-dark-gray hover:text-nova-dark-gray/80"
                    )}>
                      <userTypeNavItem.icon className="mr-3 h-5 w-5" />
                      <span className={cn(isCollapsed && "md:hidden")}>{userTypeNavItem.name}</span>
                      {location.pathname === userTypeNavItem.path && !isCollapsed && (
                        <div className={cn(
                          "absolute right-4 w-1 h-6 bg-gradient-to-b from-nova-blue to-nova-deep-purple rounded-full",
                          isCollapsed && "md:hidden"
                        )} />
                      )}
                    </Link>
                  </SidebarMenuButton>
                  {!isCollapsed && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton 
                          isActive={userType === "personal"}
                          onClick={() => setUserType("personal")}
                        >
                          <User className="h-3.5 w-3.5 mr-1.5" />
                          <span>我是个人</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton 
                          isActive={userType === "brand"}
                          onClick={() => setUserType("brand")}
                        >
                          <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                          <span>我是品牌方</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton 
                          isActive={userType === "agency"}
                          className="text-gray-400"
                          onClick={() => setUserType("agency")}
                        >
                          <Users className="h-3.5 w-3.5 mr-1.5" />
                          <span>我是代理商</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-4">
          {user ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-all">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url || ""} />
                        <AvatarFallback className="bg-gradient-to-r from-nova-blue to-nova-deep-purple text-white">
                          {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className={cn("text-sm font-medium text-nova-dark-gray", isCollapsed && "md:hidden")}>
                        {profile?.username || user.email?.split('@')[0]}
                      </span>
                      <ChevronRight className={cn("h-4 w-4 text-gray-400", isCollapsed && "md:hidden")} />
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
            </div>
          ) : (
            <div className={cn("flex flex-col gap-2", isCollapsed && "md:hidden")}>
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
