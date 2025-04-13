
import React, { useState, useEffect } from "react";
import TaskCard, { TaskCardProps } from "../marketplace/TaskCard";
import { ChevronLeft, ChevronRight, SparklesIcon } from "lucide-react";
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
      {/* Enhanced background effect */}
      <div className="absolute -inset-10 bg-gradient-to-r from-nova-blue/10 via-nova-hot-pink/5 to-nova-deep-purple/10 rounded-3xl blur-3xl -z-10 opacity-70"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-5 w-5 text-nova-hot-pink animate-pulse" />
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-nova-deep-purple to-nova-blue">热门品牌任务</h2>
        </div>
        <div className="flex items-center">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-nova-blue hover:text-white backdrop-blur-md bg-white/40 border border-white/50 transition-all duration-300 transform hover:scale-110 hover:bg-nova-blue/80 hover:shadow-lg mr-2">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-nova-blue hover:text-white backdrop-blur-md bg-white/40 border border-white/50 transition-all duration-300 transform hover:scale-110 hover:bg-nova-blue/80 hover:shadow-lg">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {tasks.slice(0, 5).map((task, index) => (
          <div 
            key={task.id} 
            className={`animate-fade-in animation-delay-${index * 2}00 hover:z-10`} 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TaskCard {...task} onClick={() => handleTaskClick(task.id)} />
          </div>
        ))}
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute bottom-4 left-10 w-3 h-3 rounded-full bg-nova-blue/30 blur-sm animate-float"></div>
      <div className="absolute top-10 right-20 w-2 h-2 rounded-full bg-nova-hot-pink/30 blur-sm animate-float animation-delay-500"></div>
      <div className="absolute bottom-10 right-40 w-4 h-4 rounded-full bg-nova-deep-purple/20 blur-md animate-float animation-delay-1000"></div>
    </div>
  );
};

export default TaskCarousel;
