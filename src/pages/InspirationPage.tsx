
import React, { useState, useEffect } from "react";
import TemplateFilter from "@/components/home/TemplateFilter";
import TemplateCard from "@/components/home/TemplateCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const InspirationPage: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest"); // Changed default to newest
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    fetchTemplates();
    fetchUserFavorites();
  }, []);
  
  useEffect(() => {
    // Apply sort to templates
    let sorted = [...templates];
    
    if (sortBy === "newest") {
      sorted = sorted.sort((a, b) => 
        new Date(b.created_at || Date.now()).getTime() - new Date(a.created_at || Date.now()).getTime()
      );
    } else if (sortBy === "popular") {
      sorted = sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      // For recommended, we could use a different algorithm later
      sorted = sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    
    setFilteredTemplates(sorted);
  }, [templates, sortBy]);
  
  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      // Get templates from localStorage
      const savedTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
      
      // If we have saved templates, use those
      if (savedTemplates.length > 0) {
        // Make sure the templates have all required properties
        const formattedTemplates = savedTemplates.map((template: any) => ({
          id: template.id,
          title: template.title,
          image: template.image,
          views: template.views || 0,
          likes: template.likes || 0,
          isFree: template.isFree !== undefined ? template.isFree : true,
          platform: template.platform || template.platforms?.[0] || "通用",
          created_at: template.created_at || new Date().toISOString()
        }));
        
        setTemplates(formattedTemplates);
        setFilteredTemplates(formattedTemplates);
      } else {
        // Use mock templates as fallback
        const mockTemplates = [
          {
            id: "1",
            title: "小红书爆款好物种草模板",
            image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
            views: 542,
            likes: 128,
            isFree: true,
            platform: "小红书",
            created_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "抖音短视频脚本模板",
            image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
            views: 321,
            likes: 89,
            isFree: false,
            platform: "抖音",
            created_at: new Date(Date.now() - 86400000).toISOString() // yesterday
          },
          {
            id: "3",
            title: "Instagram 照片排版模板",
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
            views: 210,
            likes: 45,
            isFree: true,
            platform: "Instagram",
            created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          }
        ];
        
        setTemplates(mockTemplates);
        setFilteredTemplates(mockTemplates);
      }
      
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("加载模板失败，请刷新页面重试");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUserFavorites = async () => {
    try {
      // Get favorite template IDs from localStorage
      const favoriteIds = JSON.parse(localStorage.getItem('favoriteTemplates') || '[]');
      setUserFavorites(favoriteIds);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };
  
  const handleFilterChange = (filters: {
    platforms: string[];
    industries: string[];
    fees: string[];
    types: string[];
  }) => {
    let filtered = [...templates];
    
    // Apply platform filter
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(template => 
        filters.platforms.some(p => template.platform.includes(p))
      );
    }
    
    // Apply fee filter
    if (filters.fees.length > 0) {
      filtered = filtered.filter(template => 
        (filters.fees.includes('free') && template.isFree) || 
        (filters.fees.includes('paid') && !template.isFree)
      );
    }
    
    // Note: industries and types would need the corresponding data in the templates
    
    setFilteredTemplates(filtered);
  };
  
  const handleToggleFavorite = async (id: string) => {
    try {
      const isFavorited = userFavorites.includes(id);
      let updatedFavorites: string[];
      
      if (isFavorited) {
        // Remove from favorites
        updatedFavorites = userFavorites.filter(templateId => templateId !== id);
        setUserFavorites(updatedFavorites);
        toast.success("已取消收藏");
      } else {
        // Add to favorites
        updatedFavorites = [...userFavorites, id];
        setUserFavorites(updatedFavorites);
        toast.success("已添加到收藏");
      }
      
      // Save updated favorites to localStorage
      localStorage.setItem('favoriteTemplates', JSON.stringify(updatedFavorites));
      
      // Update template like count in the UI
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
  
  const loadMore = async () => {
    // Implement pagination logic here
    toast.info("加载更多模板...");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">灵感广场</h1>
      
      <TemplateFilter onFilterChange={handleFilterChange} />
      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-nova-dark-gray">热门灵感</h2>
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
            {filteredTemplates.map(template => (
              <TemplateCard 
                key={template.id} 
                {...template} 
                isFavorite={userFavorites.includes(template.id)}
                onToggleFavorite={() => handleToggleFavorite(template.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-nova-gray">暂无模板数据</p>
          </div>
        )}
        
        {filteredTemplates.length > 0 && (
          <div className="flex justify-center mt-8">
            <button 
              className="nova-button bg-white text-nova-blue border border-nova-blue hover:bg-blue-50"
              onClick={loadMore}
            >
              加载更多
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspirationPage;
