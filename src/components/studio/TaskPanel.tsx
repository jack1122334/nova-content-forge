
import React, { useState, useEffect } from "react";
import { TaskCardProps } from "@/components/marketplace/TaskCard";

interface TaskPanelProps {
  initialTask?: TaskCardProps | null;
  onTaskDetailChange?: (taskDetail: string) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ initialTask, onTaskDetailChange }) => {
  const [task, setTask] = useState<TaskCardProps | null>(null);
  
  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
      console.log("Task set in TaskPanel:", initialTask);
    }
  }, [initialTask]);
  
  // If no task is provided, use default
  const defaultTask = {
    id: "3",
    brand: "上海家化",
    category: "护肤/快消",
    brief: "新品护手霜种草",
    budget: "15000元",
    platform: "抖音",
    reward: "每10赞/100观看 3元",
    type: "奖金任务",
    progress: 65,
    participants: 58,
  };
  
  const currentTask = task || defaultTask;
  
  // 任务详细说明
  const taskDetailDescription = "通过真实体验分享，展示产品的滋润效果和使用感受。重点突出产品快速吸收、不粘腻的特点，以及独特的香氛体验。";
  
  // 当组件挂载或任务改变时，提供详细说明给父组件
  useEffect(() => {
    if (onTaskDetailChange) {
      onTaskDetailChange(taskDetailDescription);
    }
  }, [task, onTaskDetailChange]);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">品牌任务</h3>
      <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
        <div className="mb-3">
          <h4 className="text-base font-medium text-nova-dark-gray">{currentTask.brand} - {currentTask.brief}</h4>
          <p className="text-xs text-nova-gray">品类: {currentTask.category}</p>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-nova-dark-gray" data-task-detail="true">
            {taskDetailDescription}
          </p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-nova-gray">平台: {currentTask.platform}</span>
          <span className="text-nova-blue">查看详情</span>
        </div>
      </div>
    </div>
  );
};

export default TaskPanel;
