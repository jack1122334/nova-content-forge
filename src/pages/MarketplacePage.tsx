
import React, { useState } from "react";
import TaskCard, { TaskCardProps, TaskType } from "@/components/marketplace/TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Generate mock data
const generateMockTasks = (type: TaskType, count: number): TaskCardProps[] => {
  const brands = [
    { name: "海洋至尊", category: "护肤/快消" },
    { name: "零跑汽车", category: "汽车" },
    { name: "上海家化", category: "护肤/快消" },
    { name: "德亚牛奶", category: "食品" },
    { name: "优衣库", category: "服装" },
    { name: "美的电器", category: "电子" },
    { name: "宝洁", category: "日化" },
    { name: "小米", category: "电子" },
    { name: "蒙牛", category: "食品" },
    { name: "网易游戏", category: "软件" },
    { name: "京东", category: "电商" },
    { name: "立白", category: "日化" },
  ];
  
  const briefs = [
    "新品种草",
    "产品日常传播",
    "活动推广",
    "品牌故事分享",
    "使用教程",
    "用户体验分享",
    "限时优惠推广",
    "品牌日常露出",
  ];
  
  const platforms = ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X", "reddit", "Facebook"];
  
  const rewards = {
    "门槛任务": [
      "点赞量超过50 & 小眼睛＞200 获得10元",
      "收藏量超过20 获得8元",
      "评论量超过15 获得5元",
      "转发量超过10 获得12元",
      "直播观看人数超过100 获得15元",
    ],
    "赏金任务": [
      "点赞量前10% 瓜分奖池",
      "互动量前15% 瓜分奖池",
      "内容质量前20% 瓜分奖池",
      "创意度前10% 瓜分奖池",
      "转化率前5% 瓜分奖池",
    ],
    "奖金任务": [
      "每10赞/100观看 2元",
      "每20赞/150观看 3元",
      "每5收藏/50观看 1元",
      "每3评论/30观看 2元",
      "每50浏览 1元",
    ],
    "直接认领": [
      "每10赞/100观看 2元",
      "每20赞/150观看 3元",
      "每5收藏/50观看 1元",
      "每3评论/30观看 2元",
      "每50浏览 1元",
    ],
  };
  
  const requirements = [
    "300粉丝以上",
    "500粉丝以上",
    "1000粉丝以上",
    "互动率3%以上",
    "完成3个以上相关任务",
    "账号内容质量良好",
    "近一个月活跃度高",
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const brief = briefs[Math.floor(Math.random() * briefs.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const reward = rewards[type][Math.floor(Math.random() * rewards[type].length)];
    const budget = `${Math.floor(Math.random() * 10 + 1) * 5000}元`;
    const progress = Math.floor(Math.random() * 80) + 10;
    const participants = Math.floor(Math.random() * 70) + 10;
    
    return {
      id: `${type}-${i}`,
      brand: brand.name,
      category: brand.category,
      brief: `${brief}`,
      budget,
      platform,
      reward,
      type,
      progress,
      participants,
      requirement: type === "直接认领" ? requirements[Math.floor(Math.random() * requirements.length)] : undefined,
    };
  });
};

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("creative");
  
  const creativeTasks = [
    ...generateMockTasks("门槛任务", 4),
    ...generateMockTasks("赏金任务", 4),
    ...generateMockTasks("奖金任务", 4),
  ];
  
  const directTasks = generateMockTasks("直接认领", 8);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">品牌任务广场</h1>
      
      <Tabs defaultValue="creative" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="w-full bg-white border border-gray-100 p-1 rounded-lg">
          <TabsTrigger value="creative" className="flex-1 data-[state=active]:bg-nova-blue data-[state=active]:text-white">
            创作型需求
          </TabsTrigger>
          <TabsTrigger value="direct" className="flex-1 data-[state=active]:bg-nova-blue data-[state=active]:text-white">
            直接认领型需求
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="creative" className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-nova-dark-gray mb-4">门槛任务</h2>
            <p className="text-sm text-nova-gray mb-4">数据表现超过品牌方要求，即获得固定收益</p>
            <div className="grid grid-cols-4 gap-4">
              {creativeTasks.filter(task => task.type === "门槛任务").map(task => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-nova-dark-gray mb-4">赏金任务</h2>
            <p className="text-sm text-nova-gray mb-4">数据表现好瓜分奖池</p>
            <div className="grid grid-cols-4 gap-4">
              {creativeTasks.filter(task => task.type === "赏金任务").map(task => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-nova-dark-gray mb-4">奖金任务</h2>
            <p className="text-sm text-nova-gray mb-4">根据数据确定收益，瓜分完总奖池为止</p>
            <div className="grid grid-cols-4 gap-4">
              {creativeTasks.filter(task => task.type === "奖金任务").map(task => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="direct">
          <div>
            <h2 className="text-lg font-semibold text-nova-dark-gray mb-4">直接认领型需求</h2>
            <p className="text-sm text-nova-gray mb-4">品牌方会产出内容池，符合条件的账号可直接一键发布内容</p>
            <div className="grid grid-cols-4 gap-4">
              {directTasks.map(task => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplacePage;
