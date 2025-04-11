
import React from "react";

const platforms = ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X", "reddit", "Facebook"];
const rewardTypes = ["门槛任务", "赏金任务", "奖金任务", "直接认领"];

const BrandForm: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-nova-dark-gray mb-6">发布品牌任务</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">品牌信息</label>
          <input
            type="text"
            className="nova-text-input w-full"
            placeholder="请输入品牌名称和品类，例如：星巴克 | 餐饮"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">传播brief</label>
          <textarea
            className="nova-text-input w-full min-h-[120px] resize-none"
            placeholder="请详细描述您的营销需求和产品卖点..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">品牌预算</label>
          <div className="relative">
            <input
              type="text"
              className="nova-text-input w-full pl-8"
              placeholder="请输入品牌预算，例如：10000"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-nova-gray">¥</span>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">任务类型</label>
          <div className="grid grid-cols-4 gap-3">
            {rewardTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input type="radio" name="taskType" className="sr-only peer" />
                <div className="nova-tag w-full text-center peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">奖励规则</label>
          <textarea
            className="nova-text-input w-full min-h-[80px] resize-none"
            placeholder="请设置奖励规则，例如：点赞量超过100获得10元奖励..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">传播平台</label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center">
                <input type="checkbox" className="sr-only peer" />
                <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                  {platform}
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-nova-gray mb-2">账号要求（可选）</label>
          <input
            type="text"
            className="nova-text-input w-full"
            placeholder="例如：500粉丝以上，近期互动率超过3%..."
          />
        </div>
        
        <div className="pt-4 flex justify-end">
          <button className="nova-button py-3 px-6">提交审核</button>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
