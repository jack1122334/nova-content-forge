
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
        className="w-full pl-12 py-6 text-lg rounded-full border-2 border-gray-200 hover:border-nova-blue focus:border-nova-blue transition-colors shadow-md"
        placeholder="搜索模板、品牌任务或灵感..."
      />
    </div>
  );
};

export default SearchBox;
