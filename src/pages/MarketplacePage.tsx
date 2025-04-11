import React from "react";
import TaskCard, { TaskCardProps } from "@/components/marketplace/TaskCard";

const MarketplacePage: React.FC = () => {
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
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">品牌任务广场</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
