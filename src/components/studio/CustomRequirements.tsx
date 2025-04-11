
import React, { useState } from "react";

interface CustomRequirementsProps {
  onChange?: (value: string) => void;
}

const CustomRequirements: React.FC<CustomRequirementsProps> = ({ onChange }) => {
  const [requirements, setRequirements] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setRequirements(value);
    if (onChange) {
      onChange(value);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">其他要求</h3>
      <textarea
        className="nova-text-input w-full min-h-[100px] resize-none"
        placeholder="颜色、风格、杜绝的要素等，都可以输入"
        value={requirements}
        onChange={handleChange}
      ></textarea>
      <div className="mt-2 text-xs text-nova-gray">
        <p>提示: 您可以输入特定色彩搭配、文风、禁用词汇、内容细节要求等</p>
      </div>
    </div>
  );
};

export default CustomRequirements;
