
import React from "react";
import TaskCard, { TaskCardProps } from "../marketplace/TaskCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskCarouselProps {
  tasks: TaskCardProps[];
}

const TaskCarousel: React.FC<TaskCarouselProps> = ({ tasks }) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-nova-dark-gray">热门品牌任务</h2>
        <div className="flex items-center">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-nova-gray hover:bg-nova-light-gray">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-nova-gray hover:bg-nova-light-gray ml-1">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {tasks.slice(0, 5).map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default TaskCarousel;
