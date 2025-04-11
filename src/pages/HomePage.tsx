
import React from "react";
import SearchBox from "@/components/home/SearchBox";
import Stats from "@/components/home/Stats";
import TaskCarousel from "@/components/home/TaskCarousel";
import TemplateFilter from "@/components/home/TemplateFilter";
import TemplateGrid from "@/components/home/TemplateGrid";
import { TaskCardProps } from "@/components/marketplace/TaskCard";
import { TemplateCardProps } from "@/components/home/TemplateCard";

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

const mockTemplates: TemplateCardProps[] = Array.from({ length: 14 }, (_, i) => ({
  id: `template-${i + 1}`,
  title: [
    "小红书爆款穿搭模板",
    "美妆测评详细解析",
    "居家好物种草模板",
    "旅行Vlog记录模板",
    "美食探店推荐模板",
    "电子产品开箱测评",
    "读书笔记分享模板",
  ][i % 7],
  image: `https://images.unsplash.com/photo-${148 + i % 4}${5 + i % 3}958449943-2429e8be8625?w=300&h=200&auto=format&fit=crop`,
  views: Math.floor(Math.random() * 5000) + 500,
  likes: Math.floor(Math.random() * 500) + 50,
  isFree: i % 3 === 0,
  platform: ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X"][i % 7],
}));

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <SearchBox />
        <Stats />
      </div>
      
      <TaskCarousel tasks={mockTasks} />
      
      <div>
        <TemplateFilter />
        <TemplateGrid templates={mockTemplates} />
      </div>
    </div>
  );
};

export default HomePage;
