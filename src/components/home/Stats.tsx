
import React from "react";
import { Users, Briefcase, FileText } from "lucide-react";

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100/50 flex items-center justify-center group hover:translate-y-[-3px] transition-all duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mr-4 shadow-inner transition-all duration-300 group-hover:shadow-blue-200">
            <Users className="w-7 h-7 text-nova-blue" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">入驻账号</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">126,800<span className="text-sm font-normal ml-1">个</span></p>
          </div>
        </div>
      </div>
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100/50 flex items-center justify-center group hover:translate-y-[-3px] transition-all duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mr-4 shadow-inner transition-all duration-300 group-hover:shadow-blue-200">
            <Briefcase className="w-7 h-7 text-nova-blue" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">入驻品牌</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">1,982<span className="text-sm font-normal ml-1">个</span></p>
          </div>
        </div>
      </div>
      
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100/50 flex items-center justify-center group hover:translate-y-[-3px] transition-all duration-300">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative flex items-center justify-center">
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mr-4 shadow-inner transition-all duration-300 group-hover:shadow-blue-200">
            <FileText className="w-7 h-7 text-nova-blue" />
          </div>
          <div>
            <p className="text-nova-gray text-sm">品质模板</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">635<span className="text-sm font-normal ml-1">个</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
