
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

const templates = [
  {
    id: "1",
    title: "小红书热门穿搭模板",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=120&h=90&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "美妆产品测评样式",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=90&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "简约家居好物分享",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=120&h=90&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "创意生活方式记录",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=120&h=90&auto=format&fit=crop",
  },
];

interface TemplateSelectorProps {
  onSelectTemplate?: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-nova-dark-gray">我收藏的模板</h3>
        <button className="text-sm text-nova-blue flex items-center">
          查看全部 <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className={`border ${selectedTemplate === template.id ? 'border-nova-blue' : 'border-gray-100'} rounded-lg overflow-hidden cursor-pointer hover:border-nova-blue`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="aspect-[4/3] relative">
              <img 
                src={template.image} 
                alt={template.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2">
              <p className="text-xs text-nova-dark-gray line-clamp-1">{template.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
