
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
    }
  };
  
  return (
    <div className="group relative overflow-visible hover-float transition-all duration-500">
      {/* Outer glow effect on hover */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-nova-blue/0 via-nova-hot-pink/0 to-nova-blue/0 group-hover:from-nova-blue/10 group-hover:via-nova-hot-pink/10 group-hover:to-nova-blue/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 -z-10"></div>
      
      {/* Card container with enhanced glass effect */}
      <div className="backdrop-blur-md bg-white/30 border border-white/30 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
        <div className="relative overflow-hidden">
          <AspectRatio ratio={3/4}>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Enhanced gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Platform tag with glass effect */}
            <div className="absolute top-3 right-3 z-20">
              <span className="text-xs px-3 py-1.5 backdrop-blur-md bg-white/40 rounded-full text-nova-dark-gray shadow-md flex items-center space-x-1 hover:bg-white/60 transition-colors duration-300 border border-white/40">
                <Star className="w-3 h-3 text-nova-blue inline mr-1" />
                {platform}
              </span>
            </div>
            
            {/* Free tag with enhanced gradient */}
            {isFree && (
              <div className="absolute top-3 left-3 z-20">
                <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-nova-deep-purple/90 to-nova-blue/90 rounded-full text-white shadow-md flex items-center animate-shimmer backdrop-blur-sm">
                  <Zap className="w-3 h-3 text-white inline mr-1" />
                  免费
                </span>
              </div>
            )}
          </AspectRatio>
        </div>
        
        <div className="p-4 backdrop-blur-md bg-white/50 border-t border-white/30">
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
      
      {/* Additional floating particles */}
      <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-nova-blue/40 blur-sm animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-300"></div>
      <div className="absolute -bottom-3 -left-1 w-2 h-2 rounded-full bg-nova-hot-pink/40 blur-sm animate-float opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-700"></div>
    </div>
  );
};

export default TemplateCard;
