
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
        return "bg-blue-50 text-blue-500";
      case "奖金任务":
        return "bg-green-50 text-green-500";
      case "赏金任务":
        return "bg-purple-50 text-purple-500";
      case "直接认领":
        return "bg-orange-50 text-orange-500";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  return (
    <div 
      className="nova-card cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-base font-medium text-nova-dark-gray">{brand}</h3>
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
            <p className="text-xs text-nova-blue truncate">{reward || "无"}</p>
          </div>
          
          {requirement && (
            <div className="mb-2">
              <p className="text-xs text-nova-gray">参与要求</p>
              <p className="text-xs text-nova-dark-gray truncate">{requirement}</p>
            </div>
          )}
        </div>
        
        <div>
          <div className="nova-progress mb-1">
            <div className="nova-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-nova-gray">
            <span>进度 {progress}%</span>
            <span>{participants} 人参与</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
