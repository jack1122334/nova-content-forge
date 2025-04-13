
import React from "react";
import TemplateCard, { TemplateCardProps } from "./TemplateCard";
import { SparklesIcon } from "lucide-react";

interface TemplateGridProps {
  templates: TemplateCardProps[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
  return (
    <div className="relative">
      <div className="flex items-center mb-6">
        <SparklesIcon className="h-5 w-5 text-nova-hot-pink animate-pulse mr-2" />
        <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-nova-deep-purple to-nova-blue">热门模板</h2>
      </div>
      
      {templates.length === 0 ? (
        <div className="py-10 text-center glass-morphism rounded-xl">
          <p className="text-nova-gray">未找到符合条件的模板</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {templates.map((template, index) => (
            <div 
              key={template.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TemplateCard {...template} />
            </div>
          ))}
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute -top-10 right-20 w-20 h-20 rounded-full bg-nova-blue/5 blur-xl"></div>
      <div className="absolute bottom-20 left-40 w-30 h-30 rounded-full bg-nova-hot-pink/5 blur-xl"></div>
    </div>
  );
};

export default TemplateGrid;
