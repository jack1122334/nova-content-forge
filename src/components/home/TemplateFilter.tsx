
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface TemplateFilterProps {
  onFilterChange: (filters: {
    platforms: string[];
    industries: string[];
    fees: string[];
    types: string[];
  }) => void;
}

const platforms = ["全部", "小红书", "抖音", "快手", "视频号", "Instagram", "YouTube", "X", "TikTok"];
const industries = ["全部", "美妆", "服饰", "美食", "生活", "数码", "家居", "旅行", "育儿", "宠物", "运动"];
const fees = ["全部", "免费", "付费"];
const types = ["全部", "图文", "短视频", "长视频"];

const TemplateFilter: React.FC<TemplateFilterProps> = ({ onFilterChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["全部"]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(["全部"]);
  const [selectedFees, setSelectedFees] = useState<string[]>(["全部"]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["全部"]);

  const toggleFilter = () => {
    setExpanded(!expanded);
  };

  const handlePlatformSelect = (platform: string) => {
    let newSelected: string[];
    
    if (platform === "全部") {
      newSelected = ["全部"];
    } else {
      const currentSelected = [...selectedPlatforms].filter(item => item !== "全部");
      
      if (currentSelected.includes(platform)) {
        newSelected = currentSelected.filter(item => item !== platform);
        if (newSelected.length === 0) newSelected = ["全部"];
      } else {
        newSelected = [...currentSelected, platform];
      }
    }
    
    setSelectedPlatforms(newSelected);
    updateFilters(newSelected, selectedIndustries, selectedFees, selectedTypes);
  };

  const handleIndustrySelect = (industry: string) => {
    let newSelected: string[];
    
    if (industry === "全部") {
      newSelected = ["全部"];
    } else {
      const currentSelected = [...selectedIndustries].filter(item => item !== "全部");
      
      if (currentSelected.includes(industry)) {
        newSelected = currentSelected.filter(item => item !== industry);
        if (newSelected.length === 0) newSelected = ["全部"];
      } else {
        newSelected = [...currentSelected, industry];
      }
    }
    
    setSelectedIndustries(newSelected);
    updateFilters(selectedPlatforms, newSelected, selectedFees, selectedTypes);
  };

  const handleFeeSelect = (fee: string) => {
    let newSelected: string[];
    
    if (fee === "全部") {
      newSelected = ["全部"];
    } else {
      const currentSelected = [...selectedFees].filter(item => item !== "全部");
      
      if (currentSelected.includes(fee)) {
        newSelected = currentSelected.filter(item => item !== fee);
        if (newSelected.length === 0) newSelected = ["全部"];
      } else {
        newSelected = [...currentSelected, fee];
      }
    }
    
    setSelectedFees(newSelected);
    updateFilters(selectedPlatforms, selectedIndustries, newSelected, selectedTypes);
  };

  const handleTypeSelect = (type: string) => {
    let newSelected: string[];
    
    if (type === "全部") {
      newSelected = ["全部"];
    } else {
      const currentSelected = [...selectedTypes].filter(item => item !== "全部");
      
      if (currentSelected.includes(type)) {
        newSelected = currentSelected.filter(item => item !== type);
        if (newSelected.length === 0) newSelected = ["全部"];
      } else {
        newSelected = [...currentSelected, type];
      }
    }
    
    setSelectedTypes(newSelected);
    updateFilters(selectedPlatforms, selectedIndustries, selectedFees, newSelected);
  };

  const updateFilters = (
    platforms: string[],
    industries: string[],
    fees: string[],
    types: string[]
  ) => {
    // Filter out "全部" when sending filters to parent
    const platformFilters = platforms.includes("全部") ? [] : platforms;
    const industryFilters = industries.includes("全部") ? [] : industries;
    const feeFilters = fees.includes("全部") ? [] : fees;
    const typeFilters = types.includes("全部") ? [] : types;
    
    onFilterChange({
      platforms: platformFilters,
      industries: industryFilters,
      fees: feeFilters,
      types: typeFilters,
    });
  };

  return (
    <div className="mb-6 glass-morphism rounded-2xl p-5 relative overflow-hidden group">
      {/* Background gradient effect */}
      <div className="absolute -inset-8 bg-gradient-to-r from-nova-blue/5 via-nova-hot-pink/5 to-nova-deep-purple/5 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-nova-blue mr-2 animate-pulse" />
          <h3 className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">模板筛选</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleFilter} 
          className="px-2 bg-white/40 backdrop-blur-sm hover:bg-white/60 border border-white/50 rounded-full"
        >
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-nova-blue" />
          ) : (
            <ChevronDown className="h-5 w-5 text-nova-blue" />
          )}
        </Button>
      </div>
      
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in relative z-10">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">平台</h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-300 border ${
                    selectedPlatforms.includes(platform)
                      ? "bg-gradient-to-r from-nova-blue to-nova-deep-purple text-white border-white/0 shadow-md"
                      : "bg-white/40 backdrop-blur-sm text-nova-dark-gray hover:bg-white/60 border-white/50"
                  }`}
                  onClick={() => handlePlatformSelect(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">行业</h4>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-300 border ${
                    selectedIndustries.includes(industry)
                      ? "bg-gradient-to-r from-nova-hot-pink to-nova-vivid-orange text-white border-white/0 shadow-md"
                      : "bg-white/40 backdrop-blur-sm text-nova-dark-gray hover:bg-white/60 border-white/50"
                  }`}
                  onClick={() => handleIndustrySelect(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">收费</h4>
            <div className="flex flex-wrap gap-2">
              {fees.map((fee) => (
                <button
                  key={fee}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-300 border ${
                    selectedFees.includes(fee)
                      ? "bg-gradient-to-r from-nova-blue to-nova-hot-pink text-white border-white/0 shadow-md"
                      : "bg-white/40 backdrop-blur-sm text-nova-dark-gray hover:bg-white/60 border-white/50"
                  }`}
                  onClick={() => handleFeeSelect(fee)}
                >
                  {fee}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray to-nova-blue">类型</h4>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-300 border ${
                    selectedTypes.includes(type)
                      ? "bg-gradient-to-r from-nova-deep-purple to-nova-blue text-white border-white/0 shadow-md"
                      : "bg-white/40 backdrop-blur-sm text-nova-dark-gray hover:bg-white/60 border-white/50"
                  }`}
                  onClick={() => handleTypeSelect(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-2 h-2 rounded-full bg-nova-blue/30 blur-sm"></div>
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-nova-hot-pink/20 blur-sm"></div>
    </div>
  );
};

export default TemplateFilter;
