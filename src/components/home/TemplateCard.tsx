
import React from "react";
import { Heart, Eye, Star, Zap } from "lucide-react";
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
    <div className="group relative overflow-hidden rounded-xl hover-float transition-all duration-500">
      {/* Card background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-nova-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      {/* Card container with glass effect */}
      <div className="glass-morphism rounded-xl overflow-hidden">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={3/4}>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Platform tag */}
            <div className="absolute top-3 right-3 z-20">
              <span className="text-xs px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-nova-dark-gray shadow-md flex items-center space-x-1 hover:bg-white transition-colors duration-300">
                <Star className="w-3 h-3 text-nova-blue inline mr-1" />
                {platform}
              </span>
            </div>
            
            {/* Free tag with gradient */}
            {isFree && (
              <div className="absolute top-3 left-3 z-20">
                <span className="text-xs px-3 py-1.5 premium-gradient rounded-full text-white shadow-md flex items-center animate-shimmer">
                  <Zap className="w-3 h-3 text-white inline mr-1" />
                  免费
                </span>
              </div>
            )}
          </AspectRatio>
        </div>
        
        <div className="p-4 backdrop-blur-sm bg-white/90">
          <h3 className="text-sm font-medium text-nova-dark-gray line-clamp-1 mb-2 group-hover:text-nova-blue transition-colors">{title}</h3>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-nova-gray">
              <Eye className="h-3.5 w-3.5 mr-1 text-nova-blue" /> 
              <span className="text-nova-dark-gray">{views.toLocaleString()}</span>
            </div>
            <button 
              className="flex items-center text-xs group/heart"
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "取消收藏" : "添加收藏"}
            >
              <Heart 
                className={`h-3.5 w-3.5 mr-1 transition-all duration-300 
                  ${isFavorite 
                    ? 'fill-nova-hot-pink text-nova-hot-pink scale-110' 
                    : 'text-nova-gray group-hover/heart:text-nova-hot-pink group-hover/heart:scale-110'}`} 
              /> 
              <span className={isFavorite ? 'text-nova-hot-pink' : 'text-nova-dark-gray'}>
                {likes.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
