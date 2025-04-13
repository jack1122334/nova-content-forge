
import React, { useState, useMemo } from "react";
import SearchBox from "@/components/home/SearchBox";
import Stats from "@/components/home/Stats";
import TaskCarousel from "@/components/home/TaskCarousel";
import TemplateFilter from "@/components/home/TemplateFilter";
import TemplateGrid from "@/components/home/TemplateGrid";
import TemplateCard from "@/components/home/TemplateCard";
import { TaskCardProps } from "@/components/marketplace/TaskCard";
import { TemplateCardProps } from "@/components/home/TemplateCard";
import { Loader2 } from "lucide-react";

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

// Generate more diverse mock templates with random attributes
const generateMockTemplates = (): TemplateCardProps[] => {
  const platforms = ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X"];
  const titles = [
    "小红书爆款穿搭模板",
    "美妆测评详细解析",
    "居家好物种草模板",
    "旅行Vlog记录模板",
    "美食探店推荐模板",
    "电子产品开箱测评",
    "读书笔记分享模板",
    "健身打卡记录",
    "手工DIY教程",
    "母婴育儿经验分享",
    "数码产品评测模板",
    "户外运动体验记录",
    "美甲新品分享模板",
    "职场技能分享",
  ];
  
  return Array.from({ length: 21 }, (_, i) => ({
    id: `template-${i + 1}`,
    title: titles[i % titles.length],
    image: `https://images.unsplash.com/photo-${148 + i % 5}${5 + i % 3}958449943-2429e8be8625?w=300&h=200&auto=format&fit=crop`,
    views: Math.floor(Math.random() * 5000) + 500,
    likes: Math.floor(Math.random() * 500) + 50,
    isFree: i % 3 === 0,
    platform: platforms[i % platforms.length],
  }));
};

const mockTemplates = generateMockTemplates();

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({
    platforms: [] as string[],
    industries: [] as string[],
    fees: [] as string[],
    types: [] as string[],
  });
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);

  const filteredTemplates = useMemo(() => {
    let templates = [...mockTemplates];
    
    // Filter by platform
    if (filters.platforms.length > 0) {
      templates = templates.filter((template) => {
        return filters.platforms.includes(template.platform);
      });
    }
    
    // Filter by fee
    if (filters.fees.length > 0) {
      templates = templates.filter((template) => {
        const feeMatches = template.isFree 
          ? filters.fees.includes("免费") 
          : filters.fees.includes("付费");
        
        return feeMatches;
      });
    }
    
    // Sort templates based on sortBy value
    if (sortBy === "newest") {
      // Sort by id as a proxy for creation date (higher id = newer)
      templates = templates.sort((a, b) => 
        parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1])
      );
    } else if (sortBy === "popular") {
      // Sort by views
      templates = templates.sort((a, b) => b.views - a.views);
    } else if (sortBy === "recommended") {
      // Sort by likes
      templates = templates.sort((a, b) => b.likes - a.likes);
    }
    
    return templates;
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters: {
    platforms: string[];
    industries: string[];
    fees: string[];
    types: string[];
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section with Google-like Search */}
      <div className="flex flex-col items-center justify-center py-16 space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-nova-dark-gray bg-clip-text">
          <span className="text-nova-blue">Nova</span>: World's first AI influencer marketing platform
        </h1>
        
        <div className="w-full max-w-2xl mx-auto">
          <SearchBox />
        </div>
        
        <div className="w-full max-w-4xl">
          <Stats />
        </div>
      </div>
      
      {/* Task Carousel Section */}
      <div>
        <TaskCarousel tasks={mockTasks} />
      </div>
      
      {/* Templates Section - Styled like Inspiration Page */}
      <div>
        <TemplateFilter onFilterChange={handleFilterChange} />
        
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-nova-dark-gray">热门模板</h2>
            <div className="flex">
              <button 
                onClick={() => setSortBy("newest")}
                className={`text-sm px-4 py-2 rounded-lg mr-2 ${sortBy === "newest" ? 'bg-nova-blue text-white' : 'bg-nova-light-gray text-nova-dark-gray'}`}
              >
                最新
              </button>
              <button 
                onClick={() => setSortBy("popular")}
                className={`text-sm px-4 py-2 rounded-lg mr-2 ${sortBy === "popular" ? 'bg-nova-blue text-white' : 'bg-nova-light-gray text-nova-dark-gray'}`}
              >
                热门
              </button>
              <button 
                onClick={() => setSortBy("recommended")}
                className={`text-sm px-4 py-2 rounded-lg ${sortBy === "recommended" ? 'bg-nova-blue text-white' : 'bg-nova-light-gray text-nova-dark-gray'}`}
              >
                推荐
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 text-nova-blue animate-spin" />
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard 
                  key={template.id} 
                  {...template} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-nova-gray">未找到符合条件的模板</p>
            </div>
          )}
          
          {filteredTemplates.length > 0 && (
            <div className="flex justify-center mt-8">
              <button 
                className="nova-button bg-white text-nova-blue border border-nova-blue hover:bg-blue-50"
                onClick={() => {}}
              >
                加载更多
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
