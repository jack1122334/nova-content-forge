
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    <div className="mb-6 bg-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-nova-dark-gray">模板筛选</h3>
        <Button variant="ghost" size="sm" onClick={toggleFilter} className="px-2">
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-nova-dark-gray" />
          ) : (
            <ChevronDown className="h-5 w-5 text-nova-dark-gray" />
          )}
        </Button>
      </div>
      
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-nova-dark-gray mb-2">平台</h4>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedPlatforms.includes(platform)
                      ? "bg-nova-blue text-white"
                      : "bg-nova-light-gray text-nova-dark-gray hover:bg-gray-200"
                  }`}
                  onClick={() => handlePlatformSelect(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-nova-dark-gray mb-2">行业</h4>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedIndustries.includes(industry)
                      ? "bg-nova-blue text-white"
                      : "bg-nova-light-gray text-nova-dark-gray hover:bg-gray-200"
                  }`}
                  onClick={() => handleIndustrySelect(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-nova-dark-gray mb-2">收费</h4>
            <div className="flex flex-wrap gap-2">
              {fees.map((fee) => (
                <button
                  key={fee}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedFees.includes(fee)
                      ? "bg-nova-blue text-white"
                      : "bg-nova-light-gray text-nova-dark-gray hover:bg-gray-200"
                  }`}
                  onClick={() => handleFeeSelect(fee)}
                >
                  {fee}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-nova-dark-gray mb-2">类型</h4>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedTypes.includes(type)
                      ? "bg-nova-blue text-white"
                      : "bg-nova-light-gray text-nova-dark-gray hover:bg-gray-200"
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
    </div>
  );
};

export default TemplateFilter;
