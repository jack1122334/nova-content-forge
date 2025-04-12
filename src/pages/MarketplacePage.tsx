
import React, { useState } from "react";
import TaskCard, { TaskCardProps } from "@/components/marketplace/TaskCard";
import TaskDetail from "@/components/marketplace/TaskDetail";

const MarketplacePage: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<TaskCardProps | null>(null);

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

  const handleTaskClick = (task: TaskCardProps) => {
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">品牌任务广场</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockTasks.map((task) => (
          <TaskCard key={task.id} {...task} onClick={() => handleTaskClick(task)} />
        ))}
      </div>
      
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
