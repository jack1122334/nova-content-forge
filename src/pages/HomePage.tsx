import React, { useState, useEffect } from "react";
import SearchBox from "@/components/home/SearchBox";
import Stats from "@/components/home/Stats";
import TaskCarousel from "@/components/home/TaskCarousel";
import TemplateFilter from "@/components/home/TemplateFilter";
import TemplateCard from "@/components/home/TemplateCard";
import DecorativeElements from "@/components/home/DecorativeElements";
import { TaskCardProps } from "@/components/marketplace/TaskCard";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

const HomePage: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    platforms: [] as string[],
    industries: [] as string[],
    fees: [] as string[],
    types: [] as string[],
  });

  useEffect(() => {
    fetchTemplates();
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    let sorted = [...templates];
    
    if (sortBy === "newest") {
      sorted = sorted.sort((a, b) => 
        new Date(b.created_at || Date.now()).getTime() - new Date(a.created_at || Date.now()).getTime()
      );
    } else if (sortBy === "popular") {
      sorted = sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      sorted = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    
    setFilteredTemplates(sorted);
  }, [templates, sortBy]);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const { data: supabaseTemplates, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (supabaseTemplates && supabaseTemplates.length > 0) {
        const formattedTemplates = supabaseTemplates.map(template => ({
          id: template.id,
          title: template.title || '无标题模板',
          image: template.image_url,
          html_content: template.content || "",
          views: Math.floor(Math.random() * 5000) + 3000,
          likes: Math.floor(Math.random() * 1000) + 500,
          isFree: true,
          platform: "通用",
          created_at: template.created_at
        }));
        
        console.log("Loaded templates from database:", 
                    formattedTemplates.map(t => ({
                      id: t.id, 
                      title: t.title, 
                      hasHtml: !!t.html_content
                    })));
        
        setTemplates(formattedTemplates);
        setFilteredTemplates(formattedTemplates);
      } else {
        const savedTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
        
        if (savedTemplates.length > 0) {
          const formattedTemplates = savedTemplates.map((template: any) => {
            const enhancedViews = Math.floor(Math.random() * 5000) + 3000;
            const enhancedLikes = Math.floor(Math.random() * 1000) + 500;
            
            return {
              id: template.id,
              title: template.title,
              image: template.image,
              html_content: template.html_content || "",
              views: enhancedViews,
              likes: enhancedLikes,
              isFree: template.isFree !== undefined ? template.isFree : true,
              platform: template.platform || template.platforms?.[0] || "通用",
              created_at: template.created_at || new Date().toISOString()
            };
          });
          
          setTemplates(formattedTemplates);
          setFilteredTemplates(formattedTemplates);
        } else {
          setTemplates([]);
          setFilteredTemplates([]);
        }
      }
      
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("加载模板失败，请刷新页面重试");
      
      setTemplates([]);
      setFilteredTemplates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const favoriteIds = JSON.parse(localStorage.getItem('favoriteTemplates') || '[]');
      setUserFavorites(favoriteIds);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const isFavorited = userFavorites.includes(id);
      let updatedFavorites: string[];
      
      if (isFavorited) {
        updatedFavorites = userFavorites.filter(templateId => templateId !== id);
        setUserFavorites(updatedFavorites);
        toast.success("已取消收藏");
      } else {
        updatedFavorites = [...userFavorites, id];
        setUserFavorites(updatedFavorites);
        toast.success("已添加到收藏");
      }
      
      localStorage.setItem('favoriteTemplates', JSON.stringify(updatedFavorites));
      
      setTemplates(prev => 
        prev.map(template => 
          template.id === id 
            ? { ...template, likes: template.likes + (isFavorited ? -1 : 1) } 
            : template
        )
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("收藏操作失败，请重试");
    }
  };

  const handleFilterChange = (newFilters: {
    platforms: string[];
    industries: string[];
    fees: string[];
    types: string[];
  }) => {
    setFilters(newFilters);
    
    let filtered = [...templates];
    
    if (newFilters.platforms.length > 0) {
      filtered = filtered.filter(template => 
        newFilters.platforms.some(p => template.platform.includes(p))
      );
    }
    
    if (newFilters.fees.length > 0) {
      filtered = filtered.filter(template => 
        (newFilters.fees.includes('free') && template.isFree) || 
        (newFilters.fees.includes('paid') && !template.isFree)
      );
    }
    
    setFilteredTemplates(filtered);
  };

  const loadMore = async () => {
    toast.info("加载更多模板...");
  };

  return (
    <div className="space-y-8 relative overflow-hidden">
      <div className="relative flex flex-col items-center justify-center py-16 space-y-8 overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold text-center leading-tight max-w-4xl animate-fade-in">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-deep-purple via-nova-blue to-nova-hot-pink font-extrabold">
            Nova
          </span>
          <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-nova-dark-gray/90 to-nova-blue/90 text-3xl md:text-5xl">
            AI-Powered Content. 
            Human-Driven Influence. 
            Universal Opportunity.
          </span>
        </h1>
        
        <p className="text-lg text-nova-gray max-w-2xl text-center animate-fade-in animation-delay-300">
          创造独特的社媒内容，连接品牌与创作者，提升市场影响力
        </p>
        
        <div className="w-full max-w-2xl mx-auto transform transition-all duration-500 hover:scale-[1.02] animate-fade-in animation-delay-500">
          <SearchBox />
        </div>
        
        <div className="w-full max-w-4xl animate-fade-in animation-delay-700">
          <Stats />
        </div>
      </div>
      
      <div className="relative">
        <TemplateFilter onFilterChange={handleFilterChange} />
        
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-8 overflow-hidden shadow-xl mt-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nova-deep-purple to-nova-blue mr-2">热门灵感</h2>
              <Sparkles className="h-5 w-5 text-nova-hot-pink animate-pulse" />
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setSortBy("newest")}
                className={`text-sm px-5 py-2.5 rounded-full transform transition-all duration-300 ${
                  sortBy === "newest" 
                    ? 'bg-gradient-to-r from-nova-deep-purple to-nova-blue text-white shadow-lg' 
                    : 'backdrop-blur-md bg-white/40 text-nova-dark-gray hover:scale-105 border border-white/30'
                }`}
              >
                最新
              </button>
              <button 
                onClick={() => setSortBy("popular")}
                className={`text-sm px-5 py-2.5 rounded-full transform transition-all duration-300 ${
                  sortBy === "popular" 
                    ? 'bg-gradient-to-r from-nova-hot-pink to-nova-vivid-orange text-white shadow-lg' 
                    : 'backdrop-blur-md bg-white/40 text-nova-dark-gray hover:scale-105 border border-white/30'
                }`}
              >
                热门
              </button>
              <button 
                onClick={() => setSortBy("recommended")}
                className={`text-sm px-5 py-2.5 rounded-full transform transition-all duration-300 ${
                  sortBy === "recommended" 
                    ? 'bg-gradient-to-r from-nova-vivid-orange to-nova-blue text-white shadow-lg' 
                    : 'backdrop-blur-md bg-white/40 text-nova-dark-gray hover:scale-105 border border-white/30'
                }`}
              >
                推荐
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-nova-blue to-nova-deep-purple blur-md animate-pulse"></div>
                <Loader2 className="h-12 w-12 text-nova-blue animate-spin relative" />
              </div>
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredTemplates.map((template, index) => (
                <div key={template.id} className={`animate-fade-in animation-delay-${index % 5}00`}>
                  <TemplateCard 
                    {...template} 
                    isFavorite={userFavorites.includes(template.id)}
                    onToggleFavorite={() => handleToggleFavorite(template.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-nova-gray">暂无模板数据</p>
            </div>
          )}
          
          {filteredTemplates.length > 0 && (
            <div className="flex justify-center mt-10">
              <button 
                className="relative overflow-hidden px-8 py-3 rounded-full backdrop-blur-md bg-white/40 text-nova-blue border border-nova-blue/30 hover:bg-white/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                onClick={loadMore}
              >
                <span className="relative z-10">加载更多</span>
                <span className="absolute inset-0 bg-gradient-to-r from-nova-blue via-nova-deep-purple to-nova-blue bg-[length:200%_100%] opacity-0 group-hover:opacity-10 group-hover:animate-glimmer"></span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] -translate-x-1/2 rounded-full bg-gradient-to-r from-nova-blue/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] translate-x-1/2 rounded-full bg-gradient-to-l from-nova-hot-pink/10 to-transparent blur-3xl"></div>
    </div>
  );
};

export default HomePage;
