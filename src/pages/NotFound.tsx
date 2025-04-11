
import React from "react";
import { useLocation } from "react-router-dom";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-nova-blue mb-4">404</h1>
        <p className="text-xl text-nova-dark-gray mb-4">页面未找到</p>
        <p className="text-nova-gray mb-6">
          您尝试访问的页面 <span className="font-medium">{location.pathname}</span> 不存在或已被移除。
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center text-white bg-nova-blue rounded-lg px-4 py-2 hover:bg-opacity-90"
        >
          <HomeIcon className="h-4 w-4 mr-2" /> 返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
