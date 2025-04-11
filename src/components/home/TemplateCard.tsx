
import React from "react";
import { Heart, Eye } from "lucide-react";

export interface TemplateCardProps {
  id: string;
  title: string;
  image: string;
  views: number;
  likes: number;
  isFree: boolean;
  platform: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  image,
  views,
  likes,
  isFree,
  platform,
}) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <div className="nova-card">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
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
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart 
              className={`h-3 w-3 mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-nova-gray'}`} 
            /> 
            {likes + (isFavorite ? 1 : 0)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
