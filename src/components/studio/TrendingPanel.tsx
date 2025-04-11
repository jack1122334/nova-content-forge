
import React from "react";

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
];

const TrendingPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">热点推荐</h3>
      <div className="space-y-3">
        {trends.map((trend) => (
          <label key={trend.id} className="flex items-start p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
            <input type="checkbox" className="mt-1 mr-3" />
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
    </div>
  );
};

export default TrendingPanel;
