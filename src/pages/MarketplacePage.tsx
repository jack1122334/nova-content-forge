import React, { useState, useEffect } from "react";
import TaskCard, { TaskCardProps } from "@/components/marketplace/TaskCard";
import TaskDetail from "@/components/marketplace/TaskDetail";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const MarketplacePage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TaskCardProps | null>(null);
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('brand_tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching tasks:", error);
        toast.error("加载任务失败");
        fallbackToLocalStorage();
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
          requirement: task.requirement
        }));
        
        setTasks(formattedTasks);
        console.log("Loaded tasks from database:", formattedTasks);
      } else {
        seedTasksToDatabase();
      }
    } catch (error) {
      console.error("Error in fetchTasks:", error);
      toast.error("加载任务失败");
      fallbackToLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };
  
  const fallbackToLocalStorage = () => {
    try {
      setTasks(mockTasks);
      console.log("Using mock tasks data as fallback");
    } catch (error) {
      console.error("Error loading mock tasks:", error);
      setTasks([]);
    }
  };
  
  const seedTasksToDatabase = async () => {
    try {
      console.log("Seeding tasks to database...");
      const { error } = await supabase
        .from('brand_tasks')
        .insert(mockTasks.map(task => ({
          id: task.id,
          brand: task.brand,
          category: task.category,
          brief: task.brief,
          description: taskDescriptions[task.id] || "",
          budget: task.budget,
          platform: task.platform,
          reward: task.reward,
          type: task.type,
          progress: task.progress,
          participants: task.participants,
          requirement: task.requirement
        })));
      
      if (error) {
        console.error("Error seeding tasks to database:", error);
        toast.error("初始化任务数据失败");
        fallbackToLocalStorage();
        return;
      }
      
      console.log("Successfully seeded tasks to database");
      toast.success("成功初始化任务数据");
      fetchTasks();
    } catch (error) {
      console.error("Error in seedTasksToDatabase:", error);
      fallbackToLocalStorage();
    }
  };

  const handleTaskClick = (task: TaskCardProps) => {
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };
  
  const taskDescriptions: Record<string, string> = {
    "1": "通过真实体验分享，展示海洋至尊洗面奶的清洁效果和使用感受。重点突出产品的温和配方、去油控油效果以及使用后肌肤的舒适度。建议在早晚洁面时使用，并拍摄使用前后的对比效果。",
    "2": "零跑汽车智能驾驶辅助系统新品上市，需要创作者对智能驾驶功能进行实际体验并分享。内容应包含智能辅助驾驶、自动泊车、车道保持等功能的实测，突出系统的便捷性和安全性。",
    "3": "上海家化新品护手霜上市，需要创作者基于实际使用感受进行测评种草。强调产品的滋润效果、吸收速度、不油腻的特点，以及独特的香氛体验。推荐展示使用前后的肌肤状态对比。",
    "4": "德亚牛奶希望通过创作者的日常饮食场景展示产品的多样化使用方式。可以是早餐搭配、烘焙应用或简单的饮用体验。重点突出产品的口感、营养价值以及如何融入日常生活。",
    "5": "优衣库春季新品系列上市，寻找创作者展示多种穿搭风格。内容应包含至少3套不同场合的搭配方案，突出服装的舒适度、设计感和实用性。推荐结合个人风格提供穿搭建议。",
    "6": "小米手环新品开箱体验，需要创作者详细展示产品功能和使用体验。内容应包含设备配对、功能展示、健康监测、运动记录等方面的实测，突出产品的科技感和实用性。",
    "7": "星巴克夏季限定饮品推广，需要创作者品尝并分享饮品特色。内容应包含产品的口感描述、视觉呈现以及与常规产品的对比。推荐在星巴克门店实地拍摄，营造夏季清凉氛围。",
    "8": "耐克夏季运动服饰搭配推荐，需要创作者在不同运动场景下展示产品。内容应包含至少2种运动场景的穿搭和功能测试，突出服装的透气性、舒适度和设计特点。",
    "9": "欧莱雅防晒产品测评，需要创作者对产品的防晒效果、质地、使用感受进行全面评测。内容应包含产品成分分析、使用方法演示以及适合肤质推荐。建议进行实际防晒效果测试。",
    "10": "三只松鼠新品休闲零食试吃体验，需要创作者展示产品的口感、包装和特色。内容应包含开箱、品尝反应和详细评价，突出产品的风味特点和与其他零食的区别。",
    "11": "Zara秋冬系列上新，需要创作者展示多种穿搭组合。内容应包含至少3套不同风格的搭配方案，突出服装的质感、设计细节和实穿性。推荐结合季节特点提供时尚建议。",
    "12": "迪卡侬户外徒步装备分享，需要创作者在实际户外环境中测试并展示产品性能。内容应包含装备的功能特点、使用体验和适用场景推荐，突出产品的实用性和性价比。"
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
      description: taskDescriptions["1"]
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
    {
      id: "6",
      brand: "小米",
      category: "电子产品",
      brief: "小米手环新品开箱",
      budget: "50000元",
      platform: "抖音",
      reward: "点赞量前15% 瓜分奖池",
      type: "赏金任务",
      progress: 40,
      participants: 53,
    },
    {
      id: "7",
      brand: "星巴克",
      category: "餐饮",
      brief: "夏季限定饮品推荐",
      budget: "30000元",
      platform: "小红书",
      reward: "每15赞/150观看 2元",
      type: "奖金任务",
      progress: 60,
      participants: 35,
    },
    {
      id: "8",
      brand: "耐克",
      category: "运动",
      brief: "夏季运动服饰搭配",
      budget: "40000元",
      platform: "Instagram",
      reward: "300以上粉丝可接单",
      type: "门槛任务",
      progress: 50,
      participants: 45,
      requirement: "300粉丝以上",
    },
    {
      id: "9",
      brand: "欧莱雅",
      category: "美妆",
      brief: "防晒产品测评",
      budget: "25000元",
      platform: "小红书",
      reward: "点赞量超过20 & 小眼睛＞200 获得10元",
      type: "门槛任务",
      progress: 70,
      participants: 62,
    },
    {
      id: "10",
      brand: "三只松鼠",
      category: "食品",
      brief: "新品休闲零食试吃",
      budget: "20000元",
      platform: "抖音",
      reward: "每20赞/200观看 4元",
      type: "奖金任务",
      progress: 55,
      participants: 48,
    },
    {
      id: "11",
      brand: "Zara",
      category: "服装",
      brief: "秋冬系列上新",
      budget: "60000元",
      platform: "小红书",
      reward: "点赞量前25% 瓜分奖池",
      type: "赏金任务",
      progress: 30,
      participants: 27,
    },
    {
      id: "12",
      brand: "迪卡侬",
      category: "运动",
      brief: "户外徒步装备分享",
      budget: "35000元",
      platform: "X",
      reward: "每25赞/250观看 5元",
      type: "奖金任务",
      progress: 45,
      participants: 39,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">品牌任务广场</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 text-nova-blue animate-spin" />
        </div>
      ) : tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} {...task} onClick={() => handleTaskClick(task)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-nova-gray">暂无可用任务</p>
        </div>
      )}
      
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={handleCloseDetail}>
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <TaskDetail task={selectedTask} onClose={handleCloseDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
