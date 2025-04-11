
import React from "react";
import { Plus, Trash2, Eye } from "lucide-react";

const ContentPool: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-nova-dark-gray mb-6">内容池管理</h3>
      
      <div className="mb-6">
        <p className="text-sm text-nova-gray mb-3">
          您可以为品牌任务准备内容素材，让创作者直接使用或参考。
        </p>
        <button className="flex items-center text-nova-blue bg-blue-50 rounded-lg px-4 py-2 hover:bg-blue-100">
          <Plus className="h-4 w-4 mr-1" /> 添加内容
        </button>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-start">
              <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                <img
                  src={`https://images.unsplash.com/photo-148${item + 6}958449943-2429e8be8625?w=120&h=120&auto=format&fit=crop`}
                  alt="Content"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-nova-dark-gray mb-1">
                  {["新款香氛护手霜使用体验", "高保湿滋润，告别干纹", "随身携带的小众护手神器"][item - 1]}
                </h4>
                <p className="text-xs text-nova-gray line-clamp-2">
                  {["这款香氛护手霜质地轻盈，滋润度绝佳，涂抹后迅速吸收不油腻...", 
                    "特别添加的摩洛哥坚果油和荷荷巴油，能够深层滋养肌肤，保持双手柔软...", 
                    "独特的小众香调，带来愉悦的使用体验，而且包装设计也很精致..."][item - 1]}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs nova-tag">适用平台：小红书</span>
                  <span className="text-xs text-nova-gray ml-3">添加日期：2025-03-{item + 10}</span>
                </div>
              </div>
              <div className="ml-3 flex">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-nova-gray hover:bg-gray-100">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPool;
