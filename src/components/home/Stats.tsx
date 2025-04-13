
import React from "react";
import { Users, Briefcase, FileText } from "lucide-react";

const Stats: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
          <Users className="w-6 h-6 text-nova-blue" />
        </div>
        <div>
          <p className="text-nova-gray text-sm">入驻账号</p>
          <p className="text-2xl font-bold text-nova-dark-gray">126,800<span className="text-sm font-normal ml-1">个</span></p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
          <Briefcase className="w-6 h-6 text-nova-blue" />
        </div>
        <div>
          <p className="text-nova-gray text-sm">入驻品牌</p>
          <p className="text-2xl font-bold text-nova-dark-gray">1,982<span className="text-sm font-normal ml-1">个</span></p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
          <FileText className="w-6 h-6 text-nova-blue" />
        </div>
        <div>
          <p className="text-nova-gray text-sm">品质模板</p>
          <p className="text-2xl font-bold text-nova-dark-gray">635<span className="text-sm font-normal ml-1">个</span></p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
