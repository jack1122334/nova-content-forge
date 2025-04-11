
import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const trends = [
  {
    id: "1",
    title: "立春穿搭灵感",
    hot: 98,
  },
  {
    id: "2",
    title: "春季护肤新品测评",
    hot: 95,
  },
  {
    id: "3",
    title: "新学期办公桌面整理",
    hot: 92,
  },
  {
    id: "4",
    title: "居家香氛体验",
    hot: 89,
  },
  {
    id: "5",
    title: "春季轻食食谱",
    hot: 85,
  },
  {
    id: "6",
    title: "亲子互动创意玩法",
    hot: 83,
  },
  {
    id: "7",
    title: "户外运动装备推荐",
    hot: 81,
  },
  {
    id: "8",
    title: "手机摄影技巧分享",
    hot: 79,
  },
];

interface TrendingPanelProps {
  onSelectTrends?: (selectedTrends: string[]) => void;
}

const TrendingPanel: React.FC<TrendingPanelProps> = ({ onSelectTrends }) => {
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);

  const handleTrendToggle = (trendId: string, title: string) => {
    setSelectedTrends(prev => {
      const newSelected = prev.includes(title)
        ? prev.filter(id => id !== title)
        : [...prev, title];
      
      if (onSelectTrends) {
        onSelectTrends(newSelected);
      }
      
      return newSelected;
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">热点推荐</h3>
      <ScrollArea className="h-[280px] pr-3">
        <div className="space-y-3">
          {trends.map((trend) => (
            <label 
              key={trend.id} 
              className="flex items-start p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer"
            >
              <input 
                type="checkbox" 
                className="mt-1 mr-3" 
                checked={selectedTrends.includes(trend.title)}
                onChange={() => handleTrendToggle(trend.id, trend.title)}
              />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-nova-dark-gray">{trend.title}</h4>
                <div className="mt-1 text-xs flex items-center">
                  <span className="text-red-500">热度: {trend.hot}</span>
                  <span className="inline-block w-[1px] h-3 bg-gray-300 mx-2"></span>
                  <span className="text-nova-gray">立即可用</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TrendingPanel;
