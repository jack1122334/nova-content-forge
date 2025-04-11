
import React from "react";
import { TrendingUp, DollarSign, Zap } from "lucide-react";

const EarningsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">收益统计</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-nova-gray">总收益</span>
            <DollarSign className="h-4 w-4 text-nova-blue" />
          </div>
          <p className="text-xl font-bold text-nova-dark-gray">¥3,425.60</p>
          <p className="text-xs text-green-600 mt-1">+¥245.30 本月</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-nova-gray">内容数量</span>
            <Zap className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-xl font-bold text-nova-dark-gray">78</p>
          <p className="text-xs text-green-600 mt-1">+12 本月</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-nova-gray">平均收益</span>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-xl font-bold text-nova-dark-gray">¥43.92</p>
          <p className="text-xs text-green-600 mt-1">+¥3.25 本月</p>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-medium text-nova-gray">最近收益</h4>
          <button className="text-xs text-nova-blue">查看全部</button>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className="w-16 h-16 rounded-lg overflow-hidden mr-3">
                <img 
                  src={`https://images.unsplash.com/photo-148${item + 6}958449943-2429e8be8625?w=120&h=120&auto=format&fit=crop`} 
                  alt="Content" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-nova-dark-gray truncate">这款护手霜简直是干燥季节的救星！</p>
                <div className="flex items-center text-xs text-nova-gray mt-1">
                  <span>小红书</span>
                  <span className="mx-1">·</span>
                  <span>2025-03-{item + 10}</span>
                </div>
                <div className="flex items-center text-xs text-nova-gray mt-1">
                  <span>点赞: 126</span>
                  <span className="mx-1">·</span>
                  <span>收藏: 58</span>
                  <span className="mx-1">·</span>
                  <span>评论: 32</span>
                </div>
              </div>
              <div className="ml-3 text-right">
                <p className="text-sm font-medium text-nova-blue">+¥{45 + item * 10}.00</p>
                <p className="text-xs text-green-600 mt-1">已结算</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
