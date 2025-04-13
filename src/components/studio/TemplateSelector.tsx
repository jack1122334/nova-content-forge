
import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  image: string;
  html_content?: string;
}

interface TemplateSelectorProps {
  onSelectTemplate?: (templateId: string, htmlContent?: string) => void;
  selectedTemplate?: string | null;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate, selectedTemplate }) => {
  const [favoriteTemplates, setFavoriteTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteTemplates();
  }, []);

  const fetchFavoriteTemplates = async () => {
    setIsLoading(true);
    try {
      // Get templates from localStorage
      const allTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
      
      // Get favorite template IDs
      const favoriteIds = JSON.parse(localStorage.getItem('favoriteTemplates') || '[]');
      
      // Filter templates that are in favorites
      const favorites = allTemplates
        .filter((template: any) => favoriteIds.includes(template.id))
        .map((template: any) => ({
          id: template.id,
          title: template.title,
          image: template.image,
          html_content: template.html_content
        }));
      
      setFavoriteTemplates(favorites.length > 0 ? favorites : [
        {
          id: "1",
          title: "小红书风格模板",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
          html_content: "<div style='color: red; background-color: white;'>小红书风格模板默认HTML</div>"
        },
        {
          id: "2",
          title: "抖音短视频模板",
          image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
          html_content: "<div style='color: black; background-color: gray;'>抖音短视频模板默认HTML</div>"
        }
      ]);
      
      console.log("Loaded favorite templates with HTML content:", favorites);
      
    } catch (error) {
      console.error("Error fetching favorite templates:", error);
      toast.error("无法加载收藏的模板");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (templateId: string, htmlContent?: string) => {
    if (onSelectTemplate) {
      console.log("Selected template:", templateId, "HTML content:", htmlContent);
      onSelectTemplate(templateId, htmlContent);
    }
  };
  
  const viewAllTemplates = () => {
    // Navigate to inspiration page or show modal with all templates
    window.location.href = '/inspiration';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-nova-dark-gray">我收藏的模板</h3>
        <button 
          className="text-sm text-nova-blue flex items-center"
          onClick={viewAllTemplates}
        >
          查看全部 <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 text-nova-blue animate-spin" />
        </div>
      ) : favoriteTemplates.length > 0 ? (
        <div className="grid grid-cols-4 gap-3">
          {favoriteTemplates.map((template) => (
            <div 
              key={template.id} 
              className={`border ${selectedTemplate === template.id ? 'border-nova-blue' : 'border-gray-100'} rounded-lg overflow-hidden cursor-pointer hover:border-nova-blue transition-all ${selectedTemplate === template.id ? 'ring-2 ring-nova-blue/20' : ''}`}
              onClick={() => handleTemplateSelect(template.id, template.html_content)}
            >
              <div className="aspect-[4/3] relative">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-nova-blue/10 flex items-center justify-center">
                    <span className="bg-nova-blue text-white text-xs px-2 py-1 rounded-full">已选择</span>
                  </div>
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-nova-dark-gray line-clamp-1">{template.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-nova-gray">您还没有收藏任何模板</p>
          <button 
            className="mt-2 text-sm text-nova-blue"
            onClick={viewAllTemplates}
          >
            去灵感广场发现模板
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
