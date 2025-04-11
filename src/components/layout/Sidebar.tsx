
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  PenTool, 
  Lightbulb, 
  FileText, 
  User, 
  Briefcase 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userType: "personal" | "brand";
  setUserType: (type: "personal" | "brand") => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userType, setUserType }) => {
  const location = useLocation();
  
  const navItems = [
    { name: "首页", path: "/", icon: Home },
    { name: "品牌任务广场", path: "/marketplace", icon: ShoppingBag },
    { name: "创作台", path: "/studio", icon: PenTool },
    { name: "灵感广场", path: "/inspiration", icon: Lightbulb },
    { name: "模板提交", path: "/templates/submit", icon: FileText },
    { 
      name: userType === "personal" ? "个人中心" : "品牌中心", 
      path: userType === "personal" ? "/profile" : "/brand", 
      icon: userType === "personal" ? User : Briefcase 
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-6 pb-6 z-10 overflow-y-auto">
      <div className="px-6 mb-8">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-nova-blue">Nova</h1>
        </Link>
      </div>
      
      <nav className="px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-nova-light-gray text-nova-blue"
                    : "text-nova-dark-gray hover:bg-nova-light-gray"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
