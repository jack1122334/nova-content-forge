
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  userType: "personal" | "brand";
  setUserType: (type: "personal" | "brand") => void;
}

const Header: React.FC<HeaderProps> = ({ userType, setUserType }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 flex items-center px-6 justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => setUserType(userType === "personal" ? "brand" : "personal")}
          className="text-nova-dark-gray hover:text-nova-blue"
        >
          {userType === "personal" ? "我是品牌方" : "我是个人"}
        </Button>
        <Button
          variant="ghost"
          className="text-nova-dark-gray hover:text-nova-blue ml-2"
        >
          我是代理商
        </Button>
      </div>
      
      <div className="flex items-center space-x-3">
        <Link
          to="/register"
          className="text-sm font-medium text-nova-dark-gray hover:text-nova-blue transition-colors"
        >
          注册
        </Link>
        <Link
          to="/login"
          className="text-sm font-medium text-nova-dark-gray hover:text-nova-blue transition-colors"
        >
          登录
        </Link>
      </div>
    </header>
  );
};

export default Header;
