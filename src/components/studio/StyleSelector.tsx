
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { WandSparkles, Layout } from "lucide-react";

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">内容风格选择</h3>
      <RadioGroup 
        defaultValue="generate-new" 
        value={value}
        onValueChange={onChange}
        className="space-y-3"
      >
        <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 hover:border-nova-blue/50 transition-colors">
          <RadioGroupItem value="generate-new" id="generate-new" />
          <label htmlFor="generate-new" className="flex items-center space-x-2 cursor-pointer w-full">
            <div className="w-10 h-10 rounded-full bg-nova-blue/10 flex items-center justify-center">
              <WandSparkles className="h-5 w-5 text-nova-blue" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-nova-dark-gray">为我生成全新风格</div>
              <div className="text-xs text-nova-gray">AI 将根据您的偏好智能生成内容风格</div>
            </div>
          </label>
        </div>
        <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 hover:border-nova-blue/50 transition-colors">
          <RadioGroupItem value="use-template" id="use-template" />
          <label htmlFor="use-template" className="flex items-center space-x-2 cursor-pointer w-full">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
              <Layout className="h-5 w-5 text-teal-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-nova-dark-gray">使用现有模板</div>
              <div className="text-xs text-nova-gray">从您收藏的模板中选择一个作为风格基础</div>
            </div>
          </label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default StyleSelector;
