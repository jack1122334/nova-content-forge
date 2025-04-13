
import React from "react";

export interface TaskCardProps {
  id: string;
  brand: string;
  category: string;
  brief: string;
  budget: string;
  platform: string;
  reward: string;
  type: string;
  progress: number;
  participants: number;
  requirement?: string;
  description?: string;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  brand,
  category,
  brief,
  budget,
  platform,
  reward,
  type,
  progress,
  participants,
  requirement,
  onClick
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "门槛任务":
        return "bg-blue-50/70 text-nova-blue backdrop-blur-sm border border-blue-100/50";
      case "奖金任务":
        return "bg-green-50/70 text-green-500 backdrop-blur-sm border border-green-100/50";
      case "赏金任务":
        return "bg-purple-50/70 text-nova-deep-purple backdrop-blur-sm border border-purple-100/50";
      case "直接认领":
        return "bg-orange-50/70 text-nova-vivid-orange backdrop-blur-sm border border-orange-100/50";
      default:
        return "bg-gray-50/70 text-gray-500 backdrop-blur-sm border border-gray-100/50";
    }
  };

  return (
    <div 
      className="glass-card hover:translate-y-[-5px] transition-all duration-300 cursor-pointer h-full group shadow-sm hover:shadow-lg overflow-hidden"
      onClick={onClick}
    >
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-nova-blue/0 via-nova-hot-pink/0 to-nova-deep-purple/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
      
      <div className="p-4 flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-base font-medium text-nova-dark-gray group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-nova-blue group-hover:to-nova-deep-purple transition-all duration-300">{brand}</h3>
            <p className="text-xs text-nova-gray">{category}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(type)}`}>
            {type}
          </span>
        </div>
        
        <div className="mb-3 flex-1">
          <div className="mb-2">
            <p className="text-sm font-medium text-nova-dark-gray mb-1">任务说明</p>
            <p className="text-xs text-nova-gray truncate">{brief}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="text-xs text-nova-gray">平台</p>
              <p className="text-xs text-nova-dark-gray truncate">{platform || "无"}</p>
            </div>
            <div>
              <p className="text-xs text-nova-gray">总预算</p>
              <p className="text-xs text-nova-dark-gray truncate">{budget || "无"}</p>
            </div>
          </div>
          
          <div className="mb-2">
            <p className="text-xs text-nova-gray">奖励机制</p>
            <p className="text-xs text-nova-blue truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-nova-blue group-hover:to-nova-hot-pink transition-all duration-300">{reward || "无"}</p>
          </div>
          
          {requirement && (
            <div className="mb-2">
              <p className="text-xs text-nova-gray">参与要求</p>
              <p className="text-xs text-nova-dark-gray truncate">{requirement}</p>
            </div>
          )}
        </div>
        
        <div>
          <div className="h-1.5 bg-gray-100/50 rounded-full overflow-hidden backdrop-blur-sm mb-1">
            <div 
              className="h-full bg-gradient-to-r from-nova-blue to-nova-deep-purple rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-nova-gray">
            <span>进度 {progress}%</span>
            <span>{participants} 人参与</span>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-nova-blue/10 blur-sm"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-nova-hot-pink/10 blur-sm"></div>
      </div>
    </div>
  );
};

export default TaskCard;
