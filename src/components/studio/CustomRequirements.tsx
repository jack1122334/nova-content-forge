
import React from "react";

const CustomRequirements: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">其他要求</h3>
      <textarea
        className="nova-text-input w-full min-h-[100px] resize-none"
        placeholder="颜色、风格、杜绝的要素等，都可以输入"
      ></textarea>
    </div>
  );
};

export default CustomRequirements;
