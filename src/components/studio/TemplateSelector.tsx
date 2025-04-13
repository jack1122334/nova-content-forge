import React, { useState, useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  image: string;
}

interface TemplateSelectorProps {
  onSelectTemplate?: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
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
          image: template.image
        }));
      
      setFavoriteTemplates(favorites.length > 0 ? favorites : [
        {
          id: "1",
          title: "小红书风格模板",
          image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
        },
        {
          id: "2",
          title: "抖音短视频模板",
          image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
        }
      ]);
      
    } catch (error) {
      console.error("Error fetching favorite templates:", error);
      toast.error("无法加载收藏的模板");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (onSelectTemplate) {
      onSelectTemplate(templateId);
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
