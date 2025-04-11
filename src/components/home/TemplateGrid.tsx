
import React from "react";
import TemplateCard, { TemplateCardProps } from "./TemplateCard";

interface TemplateGridProps {
  templates: TemplateCardProps[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
  return (
    <div className="relative">
      <h2 className="text-lg font-semibold text-nova-dark-gray mb-4">热门模板</h2>
      <div className="grid grid-cols-7 gap-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
