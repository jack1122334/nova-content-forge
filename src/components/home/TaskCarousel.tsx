
import React, { useState, useEffect } from "react";
import TaskCard, { TaskCardProps } from "../marketplace/TaskCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface TaskCarouselProps {
  tasks?: TaskCardProps[];
}

const TaskCarousel: React.FC<TaskCarouselProps> = ({ tasks: propTasks }) => {
  const [tasks, setTasks] = useState<TaskCardProps[]>(propTasks || []);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (propTasks && propTasks.length > 0) {
      setTasks(propTasks);
      setIsLoading(false);
    } else {
      fetchTasks();
    }
  }, [propTasks]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('brand_tasks')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error("Error fetching tasks for carousel:", error);
        // Use mock data if fetching fails
        setTasks(mockTasks);
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
          type: task.type || "门槛任务",
          progress: task.progress || 0,
          participants: task.participants || 0,
          description: task.description || "",
        }));
        
        setTasks(formattedTasks);
      } else {
        // Use mock data if no tasks in database
        setTasks(mockTasks);
      }
    } catch (error) {
      console.error("Error in fetchTasks carousel:", error);
      setTasks(mockTasks);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskClick = (taskId: string) => {
    navigate(`/marketplace`, { state: { selectedTaskId: taskId } });
  };

  // Mock data for fallback
  const mockTasks: TaskCardProps[] = [
    {
      id: "1",
      brand: "海洋至尊",
      category: "护肤/快消",
      brief: "洗面奶种草",
      budget: "5000元",
      platform: "小红书",
      reward: "点赞量超过10 & 小眼睛＞100 获得5元",
      type: "门槛任务",
      progress: 45,
      participants: 28,
    },
    {
      id: "2",
      brand: "零跑汽车",
      category: "汽车",
      brief: "智驾新品种草",
      budget: "100000元",
      platform: "Instagram",
      reward: "点赞量前10% 瓜分奖池",
      type: "赏金任务",
      progress: 35,
      participants: 42,
    },
    {
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
    },
    {
      id: "4",
      brand: "德亚牛奶",
      category: "食品",
      brief: "产品日常传播",
      budget: "15000元",
      platform: "X",
      reward: "每10赞/100观看 3元",
      type: "直接认领",
      progress: 25,
      participants: 19,
      requirement: "300粉丝以上",
    },
    {
      id: "5",
      brand: "优衣库",
      category: "服装",
      brief: "春季新品上市",
      budget: "80000元",
      platform: "小红书",
      reward: "点赞量前20% 瓜分奖池",
      type: "赏金任务",
      progress: 55,
      participants: 67,
    },
  ];

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
          <TaskCard key={task.id} {...task} onClick={() => handleTaskClick(task.id)} />
        ))}
      </div>
    </div>
  );
};

export default TaskCarousel;
