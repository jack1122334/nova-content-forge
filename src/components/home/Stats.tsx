
import React from "react";
import { Users, Briefcase, FileText } from "lucide-react";

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      {/* Account Stats Card */}
      <div className="relative overflow-visible group hover-float transition-all duration-500">
        {/* Background blur for depth */}
        <div className="absolute -inset-4 bg-nova-blue/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content with glassmorphism */}
        <div className="relative backdrop-blur-lg bg-white/40 rounded-2xl p-6 h-full flex items-center justify-center border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="w-14 h-14 bg-gradient-to-br from-nova-blue/90 to-nova-deep-purple/90 rounded-full flex items-center justify-center mr-4 shadow-lg transition-all duration-300 group-hover:shadow-nova-deep-purple/30">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">入驻账号</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-blue to-nova-deep-purple">
              126,800<span className="text-sm font-normal ml-1">个</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-nova-blue/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
      
      {/* Brand Stats Card */}
      <div className="relative overflow-visible group hover-float transition-all duration-500 animation-delay-300">
        {/* Background blur for depth */}
        <div className="absolute -inset-4 bg-nova-hot-pink/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content with glassmorphism */}
        <div className="relative backdrop-blur-lg bg-white/40 rounded-2xl p-6 h-full flex items-center justify-center border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="w-14 h-14 bg-gradient-to-br from-nova-hot-pink/90 to-nova-vivid-orange/90 rounded-full flex items-center justify-center mr-4 shadow-lg transition-all duration-300 group-hover:shadow-nova-hot-pink/30">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">入驻品牌</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-hot-pink to-nova-vivid-orange">
              1,982<span className="text-sm font-normal ml-1">个</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-nova-hot-pink/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
      
      {/* Template Stats Card */}
      <div className="relative overflow-visible group hover-float transition-all duration-500 animation-delay-500">
        {/* Background blur for depth */}
        <div className="absolute -inset-4 bg-nova-vivid-orange/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Card content with glassmorphism */}
        <div className="relative backdrop-blur-lg bg-white/40 rounded-2xl p-6 h-full flex items-center justify-center border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500">
          <div className="w-14 h-14 bg-gradient-to-br from-nova-vivid-orange/90 to-nova-accent-1/90 rounded-full flex items-center justify-center mr-4 shadow-lg transition-all duration-300 group-hover:shadow-nova-vivid-orange/30">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">品质模板</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-vivid-orange to-nova-accent-1">
              635<span className="text-sm font-normal ml-1">个</span>
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-nova-vivid-orange/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
