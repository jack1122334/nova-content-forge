
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
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onToggleFavorite) {
      onToggleFavorite();
      toast.success(isFavorite ? "已取消收藏" : "已添加到收藏");
    }
  };
  
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
      <div className="absolute inset-0 bg-gradient-to-tr from-nova-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      <div className="relative overflow-hidden">
        <AspectRatio ratio={3/4}>
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </AspectRatio>
        
        <div className="absolute top-3 right-3 z-20">
          <span className="text-xs px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-nova-dark-gray shadow-sm">
            {platform}
          </span>
        </div>
        
        {isFree && (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-nova-blue to-nova-light-blue rounded-full text-white shadow-sm">
              免费
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-nova-dark-gray line-clamp-1 mb-2 group-hover:text-nova-blue transition-colors">{title}</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-nova-gray">
            <Eye className="h-3.5 w-3.5 mr-1" /> {views.toLocaleString()}
          </div>
          <button 
            className="flex items-center text-xs group/heart"
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? "取消收藏" : "添加收藏"}
          >
            <Heart 
              className={`h-3.5 w-3.5 mr-1 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-nova-gray group-hover/heart:text-red-400 group-hover/heart:scale-110'}`} 
            /> 
            {likes.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
