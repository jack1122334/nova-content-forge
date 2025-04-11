
import React from "react";

const platforms = ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X", "reddit", "Facebook"];
const industries = ["通用", "食品", "服装", "软件", "美妆", "日化", "电子", "汽车", "餐饮"];
const fees = ["付费", "免费"];
const types = ["图文", "视频", "纯文字", "其他"];

const TemplateFilter: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-nova-dark-gray mb-2">平台</h3>
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
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-nova-dark-gray mb-2">行业</h3>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <label key={industry} className="flex items-center">
              <input type="checkbox" className="sr-only peer" />
              <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                {industry}
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-nova-dark-gray mb-2">费用</h3>
        <div className="flex flex-wrap gap-2">
          {fees.map((fee) => (
            <label key={fee} className="flex items-center">
              <input type="checkbox" className="sr-only peer" />
              <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                {fee}
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-nova-dark-gray mb-2">类型</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <label key={type} className="flex items-center">
              <input type="checkbox" className="sr-only peer" />
              <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                {type}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateFilter;
