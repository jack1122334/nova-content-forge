
import React from "react";
import { Users, Briefcase, FileText } from "lucide-react";

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {/* Account Stats Card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group hover-float transition-all duration-500">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-nova-blue via-nova-deep-purple to-nova-hot-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full flex items-center justify-center">
          <div className="w-14 h-14 bg-gradient-to-br from-nova-blue to-nova-deep-purple rounded-full flex items-center justify-center mr-4 shadow-lg transition-all duration-300 group-hover:shadow-nova-deep-purple/50">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">入驻账号</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-blue to-nova-deep-purple">
              126,800<span className="text-sm font-normal ml-1">个</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-nova-blue/10 rounded-full blur-xl animate-pulse"></div>
        </div>
      </div>
      
      {/* Brand Stats Card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group hover-float transition-all duration-500 animation-delay-300">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-nova-hot-pink via-nova-vivid-orange to-nova-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full flex items-center justify-center">
          <div className="w-14 h-14 bg-gradient-to-br from-nova-hot-pink to-nova-vivid-orange rounded-full flex items-center justify-center mr-4 shadow-lg transition-all duration-300 group-hover:shadow-nova-hot-pink/50">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">入驻品牌</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-hot-pink to-nova-vivid-orange">
              1,982<span className="text-sm font-normal ml-1">个</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-nova-hot-pink/10 rounded-full blur-xl animate-pulse"></div>
        </div>
      </div>
      
      {/* Template Stats Card */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden group hover-float transition-all duration-500 animation-delay-500">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-nova-vivid-orange via-nova-blue to-nova-deep-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content */}
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 h-full flex items-center justify-center">
          <div className="w-14 h-14 bg-gradient-to-br from-nova-vivid-orange to-nova-accent-1 rounded-full flex items-center justify-center mr-4 shadow-lg transition-all duration-300 group-hover:shadow-nova-vivid-orange/50">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">品质模板</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-vivid-orange to-nova-accent-1">
              635<span className="text-sm font-normal ml-1">个</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-nova-vivid-orange/10 rounded-full blur-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
