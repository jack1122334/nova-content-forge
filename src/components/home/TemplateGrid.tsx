
import React from "react";
import TemplateCard, { TemplateCardProps } from "./TemplateCard";

interface TemplateGridProps {
  templates: TemplateCardProps[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
  return (
    <div className="relative">
      <h2 className="text-lg font-semibold text-nova-dark-gray mb-4">热门模板</h2>
      {templates.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-nova-gray">未找到符合条件的模板</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;
