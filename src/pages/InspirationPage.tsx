
import React, { useState } from "react";
import TemplateFilter from "@/components/home/TemplateFilter";
import TemplateCard, { TemplateCardProps } from "@/components/home/TemplateCard";

// Generate mock inspiration data
const mockInspirations: TemplateCardProps[] = Array.from({ length: 21 }, (_, i) => ({
  id: `inspiration-${i + 1}`,
  title: [
    "春季穿搭灵感分享",
    "日系简约家居布置",
    "职场干货分享",
    "宝妈日常好物推荐",
    "小众景点打卡",
    "健身餐制作教程",
    "极简生活方式",
    "复古文艺风格穿搭",
    "城市探店记录",
    "阅读角落布置",
    "办公桌面整理",
    "轻奢生活方式",
    "夏日防晒指南",
    "手账排版示例",
    "留学生活记录",
    "赛博朋克风格",
    "二次元周边分享",
    "轻食料理做法",
    "城市街拍风格",
    "香氛使用指南",
    "户外露营装备",
  ][i % 21],
  image: `https://images.unsplash.com/photo-${148 + i % 5}${4 + i % 4}958449943-2429e8be8625?w=300&h=200&auto=format&fit=crop`,
  views: Math.floor(Math.random() * 10000) + 1000,
  likes: Math.floor(Math.random() * 1000) + 100,
  isFree: i % 3 === 0,
  platform: ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X"][i % 7],
}));

const InspirationPage: React.FC = () => {
  const [filteredInspirations, setFilteredInspirations] = useState(mockInspirations);
  
  const handleFilterChange = (filters: {
    platforms: string[];
    industries: string[];
    fees: string[];
    types: string[];
  }) => {
    // Filter logic would go here in a real app
    console.log("Filters applied:", filters);
    // For now, we'll just use the mock data
    setFilteredInspirations(mockInspirations);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">灵感广场</h1>
      
      <TemplateFilter onFilterChange={handleFilterChange} />
      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-nova-dark-gray">热门灵感</h2>
          <div className="flex">
            <button className="text-sm px-4 py-2 rounded-lg mr-2 bg-nova-light-gray text-nova-dark-gray">最新</button>
            <button className="text-sm px-4 py-2 rounded-lg mr-2 bg-nova-blue text-white">热门</button>
            <button className="text-sm px-4 py-2 rounded-lg bg-nova-light-gray text-nova-dark-gray">推荐</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {filteredInspirations.map(inspiration => (
            <TemplateCard key={inspiration.id} {...inspiration} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <button className="nova-button bg-white text-nova-blue border border-nova-blue hover:bg-blue-50">
            加载更多
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspirationPage;
