import React, { useState, useEffect } from "react";
import { TaskCardProps } from "@/components/marketplace/TaskCard";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface TaskPanelProps {
  initialTask?: TaskCardProps | null;
  onTaskDetailChange?: (taskDetail: string) => void;
  onTaskChange?: (task: TaskCardProps) => void;
}

const TaskPanel: React.FC<TaskPanelProps> = ({ initialTask, onTaskDetailChange, onTaskChange }) => {
  const [task, setTask] = useState<TaskCardProps | null>(null);
  const [availableTasks, setAvailableTasks] = useState<TaskCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // First check if we have a recently selected task in localStorage
        const recentTaskJson = localStorage.getItem('recentlySelectedTask');
        let recentTask: TaskCardProps | null = null;
        
        if (recentTaskJson) {
          try {
            recentTask = JSON.parse(recentTaskJson);
            console.log("Found recently selected task in localStorage:", recentTask);
          } catch (e) {
            console.error("Error parsing recent task from localStorage:", e);
          }
        }
        
        // Fetch all tasks from Supabase
        const { data, error } = await supabase
          .from('brand_tasks')
          .select('*');
        
        if (error) {
          console.error("Error fetching tasks:", error);
          return;
        }
        
        if (data && data.length > 0) {
          const formattedTasks = data.map(task => ({
            id: task.id,
            brand: task.brand,
            category: task.category || "",
            brief: task.brief,
            budget: task.budget || "",
            platform: task.platform || "",
            reward: task.reward || "",
            type: task.type || "奖金任务",
            progress: task.progress || 0,
            participants: task.participants || 0,
            description: task.description || ""
          }));
          
          setAvailableTasks(formattedTasks);
          
          // If we have an initialTask from props, use it
          if (initialTask) {
            setTask(initialTask);
            setSelectedTaskId(initialTask.id);
            if (onTaskDetailChange && initialTask.description) {
              onTaskDetailChange(initialTask.description);
            }
            // Also notify parent component
            if (onTaskChange) {
              onTaskChange(initialTask);
            }
          }
          // Otherwise if we have a recent task from localStorage, use it
          else if (recentTask) {
            setTask(recentTask);
            setSelectedTaskId(recentTask.id);
            if (onTaskDetailChange && recentTask.description) {
              onTaskDetailChange(recentTask.description);
            }
            // Also notify parent component
            if (onTaskChange) {
              onTaskChange(recentTask);
            }
          }
        } else {
          // If no tasks in database, seed from MarketplacePage mock data
          console.log("No tasks found in database, will seed from mock data on next MarketplacePage visit");
        }
      } catch (error) {
        console.error("Error in fetchTasks:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, [initialTask, onTaskDetailChange, onTaskChange]);
  
  useEffect(() => {
    if (initialTask && initialTask !== task) {
      setTask(initialTask);
      setSelectedTaskId(initialTask.id);
      console.log("Task set in TaskPanel from initialTask:", initialTask);
      
      // Save this task as the recently selected task
      localStorage.setItem('recentlySelectedTask', JSON.stringify(initialTask));
      
      if (!initialTask.description && initialTask.id) {
        fetchTaskDescription(initialTask.id);
      } else if (onTaskDetailChange && initialTask.description) {
        onTaskDetailChange(initialTask.description);
      }
      
      // Notify parent component about the task change
      if (onTaskChange) {
        onTaskChange(initialTask);
      }
    }
  }, [initialTask, onTaskDetailChange, onTaskChange]);
  
  const fetchTaskDescription = async (taskId: string) => {
    try {
      const { data, error } = await supabase
        .from('brand_tasks')
        .select('description')
        .eq('id', taskId)
        .single();
      
      if (error) {
        console.error("Error fetching task description:", error);
        return;
      }
      
      if (data && data.description) {
        const updatedTask = task ? {...task, description: data.description} : null;
        
        if (updatedTask) {
          setTask(updatedTask);
          
          // Also update the recently selected task in localStorage with the description
          localStorage.setItem('recentlySelectedTask', JSON.stringify(updatedTask));
          
          if (onTaskDetailChange) {
            onTaskDetailChange(data.description);
          }
          
          // Notify parent component about the task change
          if (onTaskChange) {
            onTaskChange(updatedTask);
          }
        }
      }
    } catch (error) {
      console.error("Error in fetchTaskDescription:", error);
    }
  };
  
  const handleTaskChange = (taskId: string) => {
    setSelectedTaskId(taskId);
    const selectedTask = availableTasks.find(t => t.id === taskId);
    if (selectedTask) {
      setTask(selectedTask);
      
      // Save this task as the recently selected task
      localStorage.setItem('recentlySelectedTask', JSON.stringify(selectedTask));
      
      if (!selectedTask.description) {
        fetchTaskDescription(taskId);
      } else if (onTaskDetailChange) {
        onTaskDetailChange(selectedTask.description);
      }
      
      // Notify parent component about the task change
      if (onTaskChange) {
        onTaskChange(selectedTask);
      }
    }
  };
  
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
    description: "上海家化新品护手霜上市，需要创作者基于实际使用感受进行测评种草。强调产品的滋润效果、吸收速度、不油腻的特点，以及独特的香氛体验。推荐展示使用前后的肌肤状态对比。"
  };
  
  const currentTask = task || defaultTask;
  
  useEffect(() => {
    if (onTaskDetailChange && currentTask.description) {
      onTaskDetailChange(currentTask.description);
    }
    
    // If we have a task and onTaskChange is provided, notify parent component
    if (task && onTaskChange) {
      onTaskChange(currentTask);
    }
  }, [currentTask, onTaskDetailChange, onTaskChange]);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">品牌任务</h3>
      
      <div className="mb-4">
        <Select 
          value={selectedTaskId || ""}
          onValueChange={handleTaskChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择品牌任务" />
          </SelectTrigger>
          <SelectContent>
            {loading ? (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>加载中...</span>
              </div>
            ) : (
              availableTasks.map(task => (
                <SelectItem key={task.id} value={task.id}>
                  {task.brand} - {task.brief}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>
      
      <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
        <div className="mb-3">
          <h4 className="text-base font-medium text-nova-dark-gray">{currentTask.brand} - {currentTask.brief}</h4>
          <p className="text-xs text-nova-gray">品类: {currentTask.category}</p>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-nova-dark-gray" data-task-detail="true">
            {currentTask.description || "无详细说明"}
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
