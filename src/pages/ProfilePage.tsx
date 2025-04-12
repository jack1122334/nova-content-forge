
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountInfo from "@/components/profile/AccountInfo";
import EarningsCard from "@/components/profile/EarningsCard";
import ReferralCard from "@/components/profile/ReferralCard";
import TemplateCard, { TemplateCardProps } from "@/components/home/TemplateCard";
import TaskCard, { TaskCardProps } from "@/components/marketplace/TaskCard";

const mockTemplates: TemplateCardProps[] = Array.from({ length: 8 }, (_, i) => ({
  id: `saved-template-${i + 1}`,
  title: [
    "小红书爆款穿搭模板",
    "美妆测评详细解析",
    "居家好物种草模板",
    "旅行Vlog记录模板",
    "美食探店推荐模板",
    "电子产品开箱测评",
    "读书笔记分享模板",
    "健身打卡分享模板",
  ][i],
  image: `https://images.unsplash.com/photo-${148 + i % 4}${5 + i % 3}958449943-2429e8be8625?w=300&h=200&auto=format&fit=crop`,
  views: Math.floor(Math.random() * 5000) + 500,
  likes: Math.floor(Math.random() * 500) + 50,
  isFree: i % 3 === 0,
  platform: ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X", "reddit"][i % 8],
}));

const mockRecommendedTasks: TaskCardProps[] = [
  {
    id: "rec-1",
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
    id: "rec-2",
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
    id: "rec-3",
    brand: "蒙牛",
    category: "食品",
    brief: "新品牛奶推广",
    budget: "30000元",
    platform: "抖音",
    reward: "每15赞/120观看 2.5元",
    type: "奖金任务",
    progress: 38,
    participants: 42,
  },
];

const ProfilePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">个人中心</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-6">
          <AccountInfo />
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-nova-dark-gray mb-4">推荐任务</h3>
            <div className="space-y-3">
              {mockRecommendedTasks.map(task => (
                <div key={task.id} className="border border-gray-100 rounded-lg hover:border-nova-blue cursor-pointer">
                  <div className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-nova-dark-gray">{task.brand}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-nova-blue">
                        {task.type}
                      </span>
                    </div>
                    <p className="text-xs text-nova-gray mb-2">{task.brief} · {task.platform}</p>
                    <p className="text-xs text-nova-blue font-medium">{task.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ReferralCard />
        </div>
        
        <div className="col-span-2">
          <Tabs defaultValue="earnings" className="bg-white rounded-2xl shadow-sm">
            <TabsList className="w-full bg-gray-50 p-1 rounded-t-2xl border-b border-gray-100">
              <TabsTrigger value="earnings" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-nova-dark-gray">
                收益统计
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex-1 data-[state=active]:bg-white data-[state=active]:text-nova-dark-gray">
                收藏模板
              </TabsTrigger>
            </TabsList>
            <TabsContent value="earnings" className="p-0">
              <EarningsCard />
            </TabsContent>
            <TabsContent value="saved" className="p-6">
              <h3 className="text-lg font-medium text-nova-dark-gray mb-4">我收藏的模板</h3>
              <div className="grid grid-cols-4 gap-4">
                {mockTemplates.map(template => (
                  <TemplateCard key={template.id} {...template} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
