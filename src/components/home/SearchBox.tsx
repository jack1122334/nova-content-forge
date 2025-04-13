
import React from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBox: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Enhanced colorful glow effect */}
      <div className="absolute -inset-8 bg-gradient-to-r from-nova-deep-purple/20 via-nova-blue/10 to-nova-hot-pink/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-nova-blue" />
      </div>
      
      <Input
        type="text"
        className="w-full pl-12 py-6 text-lg rounded-full border border-white/30 bg-white/60 backdrop-blur-md hover:border-nova-blue focus:border-nova-blue transition-all shadow-lg hover:shadow-nova-deep-purple/20 hover:translate-y-[-2px] relative z-0"
        placeholder="搜索模板、品牌任务或灵感..."
      />
      
      <div className="absolute inset-y-0 right-4 flex items-center z-10">
        <div className="bg-gradient-to-r from-nova-deep-purple to-nova-blue p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          <Sparkles className="h-5 w-5 text-white group-hover:animate-spin-slow" />
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-1/2 right-16 w-3 h-3 rounded-full bg-nova-hot-pink/40 blur-sm animate-float animation-delay-300"></div>
      <div className="absolute top-1/3 right-20 w-4 h-4 rounded-full bg-nova-deep-purple/30 blur-md animate-float animation-delay-700"></div>
      <div className="absolute bottom-1/3 right-24 w-5 h-5 rounded-full bg-nova-blue/30 blur-md animate-float animation-delay-1000"></div>
      <div className="absolute top-2/3 left-20 w-3 h-3 rounded-full bg-nova-vivid-orange/30 blur-sm animate-float animation-delay-1500"></div>
    </div>
  );
};

export default SearchBox;
