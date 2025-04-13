
import React from "react";
import { Heart, Eye } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";

export interface TemplateCardProps {
  id: string;
  title: string;
  image: string;
  views: number;
  likes: number;
  isFree: boolean;
  platform: string;
  isFavorite?: boolean;
  html_content?: string;
  onToggleFavorite?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  image,
  views,
  likes,
  isFree,
  platform,
  isFavorite = false,
  html_content,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onToggleFavorite) {
      onToggleFavorite();
      toast.success(isFavorite ? "已取消收藏" : "已添加到收藏");
    }
  };
  
  // Function to render HTML content safely
  const renderHtmlContent = (htmlContent: string) => {
    return { __html: htmlContent || '' };
  };
  
  return (
    <div className="nova-card">
      <div className="relative overflow-hidden">
        <AspectRatio ratio={3/4}>
          {html_content ? (
            <div 
              className="w-full h-full overflow-hidden" 
              dangerouslySetInnerHTML={renderHtmlContent(html_content)}
            />
          ) : (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
        </AspectRatio>
        <div className="absolute top-2 right-2">
          <span className="text-xs px-2 py-1 bg-white bg-opacity-90 rounded-full text-nova-dark-gray">
            {platform}
          </span>
        </div>
        {isFree && (
          <div className="absolute top-2 left-2">
            <span className="text-xs px-2 py-1 bg-nova-blue bg-opacity-90 rounded-full text-white">
              免费
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-nova-dark-gray line-clamp-1 mb-2">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-nova-gray">
            <Eye className="h-3 w-3 mr-1" /> {views}
          </div>
          <button 
            className="flex items-center text-xs"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "取消收藏" : "添加收藏"}
          >
            <Heart 
              className={`h-3 w-3 mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-nova-gray'}`} 
            /> 
            {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
