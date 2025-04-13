
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBox: React.FC = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        className="w-full pl-12 py-6 text-lg rounded-full border-2 border-gray-200 bg-white/80 backdrop-blur-sm hover:border-nova-blue focus:border-nova-blue transition-all shadow-lg hover:shadow-nova-blue/20 hover:translate-y-[-2px]"
        placeholder="搜索模板、品牌任务或灵感..."
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-nova-blue/10 to-nova-light-blue/10 opacity-50 blur-xl -z-10"></div>
    </div>
  );
};

export default SearchBox;
