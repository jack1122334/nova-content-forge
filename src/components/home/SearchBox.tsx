
import React from "react";
import { Search } from "lucide-react";

const SearchBox: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="nova-text-input w-full pl-10 py-3"
        placeholder="搜索模板、品牌任务或灵感..."
      />
    </div>
  );
};

export default SearchBox;
