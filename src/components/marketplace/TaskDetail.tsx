
import React from "react";
import { TaskCardProps } from "./TaskCard";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TaskDetailProps {
  task: TaskCardProps;
  onClose: () => void;
}

// Descriptions for task types
const taskTypeDescriptions = {
  "门槛任务": "只要达到特定的点赞、评论或观看量等指标，即可获得固定金额奖励。",
  "奖金任务": "根据内容的点赞量、观看量等指标按比例获得奖励，效果越好，奖励越高。",
  "赏金任务": "参与者提交内容后，表现最好的前X%将瓜分奖池，竞争性较强。"
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose }) => {
  const navigate = useNavigate();
  
  const handleParticipate = () => {
    navigate('/studio', { state: { selectedTask: task } });
    onClose();
  };
  
  return (
    <div className="relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
      >
        <X className="h-6 w-6" />
      </button>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-nova-dark-gray">{task.brand}</h2>
            <p className="text-nova-gray">{task.category}</p>
          </div>
          <span className="px-3 py-1 bg-blue-50 text-nova-blue rounded-full text-sm">
            {task.type}
          </span>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-nova-gray mb-1">任务说明</h3>
            <p className="text-nova-dark-gray">{task.brief}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-nova-gray mb-1">平台</h3>
              <p className="text-nova-dark-gray">{task.platform || "无"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-nova-gray mb-1">总预算</h3>
              <p className="text-nova-dark-gray">{task.budget || "无"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-nova-gray mb-1">奖励机制</h3>
              <p className="text-nova-dark-gray">{task.reward || "无"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-nova-gray mb-1">参与要求</h3>
              <p className="text-nova-dark-gray">{task.requirement || "无特殊要求"}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-nova-gray mb-1">任务类型说明</h3>
            <p className="text-nova-dark-gray">{taskTypeDescriptions[task.type as keyof typeof taskTypeDescriptions] || "无说明"}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-nova-gray mb-1">任务进度</h3>
            <div className="flex items-center">
              <div className="nova-progress flex-1 mr-4">
                <div className="nova-progress-bar" style={{ width: `${task.progress}%` }}></div>
              </div>
              <span className="text-sm text-nova-dark-gray">{task.progress}%</span>
            </div>
            <div className="mt-1 text-xs text-nova-gray flex justify-between">
              <span>当前参与人数: {task.participants}</span>
              <span>计划完成时间: 2025年6月30日</span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full nova-button py-3"
          onClick={handleParticipate}
        >
          参与任务
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;
