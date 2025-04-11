
import React from "react";
import { Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export type TaskType = "门槛任务" | "赏金任务" | "奖金任务" | "直接认领";
export type Platform = "小红书" | "抖音" | "快手" | "视频号" | "Instagram" | "youtube" | "X" | "reddit" | "Facebook";

export interface TaskCardProps {
  id: string;
  brand: string;
  category: string;
  brief: string;
  budget: string;
  platform: Platform;
  reward: string;
  type: TaskType;
  progress: number;
  participants: number;
  requirement?: string;
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
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const getTypeColor = (type: TaskType) => {
    switch (type) {
      case "门槛任务":
        return "bg-blue-50 text-nova-blue";
      case "赏金任务":
        return "bg-purple-50 text-purple-600";
      case "奖金任务":
        return "bg-green-50 text-green-600";
      case "直接认领":
        return "bg-orange-50 text-orange-600";
    }
  };

  return (
    <div 
      className="nova-card cursor-pointer relative"
      onClick={() => setExpanded(true)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-nova-dark-gray font-medium">{brand} | <span className="text-nova-gray">品类：{category}</span></h3>
          </div>
          <span className={cn("text-xs px-2 py-1 rounded-full", getTypeColor(type))}>
            {type}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="mb-2">
            <span className="text-sm text-nova-gray">传播brief：</span>
            <span className="text-sm text-nova-dark-gray">{brief}</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-nova-gray">品牌预算：</span>
            <span className="text-sm text-nova-dark-gray font-medium">{budget}</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-nova-gray">传播平台：</span>
            <span className="text-sm text-nova-dark-gray">{platform}</span>
          </div>
          <div className="mb-2">
            <span className="text-sm text-nova-gray">奖励规则：</span>
            <span className="text-sm text-nova-dark-gray">{reward}</span>
          </div>
          {requirement && (
            <div className="mb-2">
              <span className="text-sm text-nova-gray">账号要求：</span>
              <span className="text-sm text-nova-dark-gray">{requirement}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="w-2/3">
            <div className="nova-progress">
              <div className="nova-progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="mt-1 text-xs text-nova-gray">已完成 {progress}% · {participants} 人参与</p>
          </div>
          <div className="flex items-center text-sm text-nova-gray">
            <Heart className="h-4 w-4 mr-1" /> 24
            <Eye className="h-4 w-4 ml-3 mr-1" /> 568
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && setExpanded(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-nova-dark-gray">{brand}</h2>
                <p className="text-nova-gray">品类：{category}</p>
              </div>
              <span className={cn("text-sm px-3 py-1 rounded-full", getTypeColor(type))}>
                {type}
              </span>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-nova-gray mb-1">传播brief</h3>
                <p className="text-nova-dark-gray">{brief}</p>
                <p className="mt-2 text-nova-dark-gray">品牌希望通过创作者的真实体验，展示产品的独特之处。内容需要突出产品的核心卖点，同时保持内容的真实性和创意性。</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-nova-gray mb-1">品牌预算</h3>
                <p className="text-nova-dark-gray font-medium">{budget}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-nova-gray mb-1">传播平台</h3>
                <p className="text-nova-dark-gray">{platform}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-nova-gray mb-1">奖励规则</h3>
                <p className="text-nova-dark-gray">{reward}</p>
              </div>
              
              {requirement && (
                <div>
                  <h3 className="text-sm font-medium text-nova-gray mb-1">账号要求</h3>
                  <p className="text-nova-dark-gray">{requirement}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-nova-gray mb-1">截止日期</h3>
                <p className="text-nova-dark-gray">2025-05-15</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <button className="nova-button w-full py-3">参与任务</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
