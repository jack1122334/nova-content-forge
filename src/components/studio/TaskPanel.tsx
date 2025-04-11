
import React from "react";

const TaskPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">品牌任务</h3>
      <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
        <div className="mb-3">
          <h4 className="text-base font-medium text-nova-dark-gray">上海家化 - 新品护手霜种草</h4>
          <p className="text-sm text-nova-gray">品类: 护肤/快消</p>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-nova-dark-gray">
            通过真实体验分享，展示产品的滋润效果和使用感受。重点突出产品快速吸收、不粘腻的特点，以及独特的香氛体验。
          </p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-nova-gray">平台: 抖音</span>
          <span className="text-nova-blue">查看详情</span>
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
