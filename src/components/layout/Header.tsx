
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  userType: "personal" | "brand";
  setUserType: (type: "personal" | "brand") => void;
}

const Header: React.FC<HeaderProps> = ({ userType, setUserType }) => {
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 flex items-center px-6 justify-between">
      <div className="flex items-center">
        <Button
          variant={userType === "personal" ? "default" : "ghost"}
          onClick={() => setUserType("personal")}
          className={userType === "personal" ? "bg-nova-blue text-white" : "text-nova-dark-gray hover:text-nova-blue"}
        >
          我是个人
        </Button>
        <Button
          variant={userType === "brand" ? "default" : "ghost"}
          onClick={() => setUserType("brand")}
          className={userType === "brand" ? "bg-nova-blue text-white" : "text-nova-dark-gray hover:text-nova-blue"}
        >
          我是品牌方
        </Button>
        <Button
          variant="ghost"
          className="text-nova-dark-gray hover:text-nova-blue ml-2"
        >
          我是代理商
        </Button>
      </div>
      
      <div className="flex items-center space-x-3">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="bg-nova-blue text-white">
                    {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-nova-dark-gray">
                  {profile?.username || user.email?.split('@')[0]}
                </span>
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
        ) : (
          <>
            <Link
              to="/auth?tab=register"
              className="text-sm font-medium text-nova-dark-gray hover:text-nova-blue transition-colors"
            >
              注册
            </Link>
            <Link
              to="/auth"
              className="text-sm font-medium text-nova-dark-gray hover:text-nova-blue transition-colors"
            >
              登录
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
