
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
  const [sortBy, setSortBy] = useState("popular"); // popular, newest, recommended
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
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
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
      // Get templates that have been approved
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match the TemplateCard props
      const transformedData = data.map(template => ({
        id: template.id,
        title: template.title,
        image: template.image_url,
        views: template.views || 0,
        likes: template.likes || 0,
        isFree: template.is_free,
        platform: template.platforms ? template.platforms[0] : "通用",
      }));
      
      setTemplates(transformedData);
      setFilteredTemplates(transformedData);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("加载模板失败，请刷新页面重试");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchUserFavorites = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (user && user.user) {
        const { data, error } = await supabase
          .from('template_favorites')
          .select('template_id')
          .eq('user_id', user.user.id);
        
        if (error) throw error;
        
        setUserFavorites(data.map(item => item.template_id));
      }
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
      const { data: user } = await supabase.auth.getUser();
      
      if (!user || !user.user) {
        toast.error("请先登录后再收藏模板");
        return;
      }
      
      const isFavorited = userFavorites.includes(id);
      
      if (isFavorited) {
        // Remove from favorites
        await supabase
          .from('template_favorites')
          .delete()
          .eq('user_id', user.user.id)
          .eq('template_id', id);
        
        setUserFavorites(prev => prev.filter(templateId => templateId !== id));
      } else {
        // Add to favorites
        await supabase
          .from('template_favorites')
          .insert({
            user_id: user.user.id,
            template_id: id
          });
        
        setUserFavorites(prev => [...prev, id]);
      }
      
      // Update template like count in the UI
      setTemplates(prev => 
        prev.map(template => 
          template.id === id 
            ? { ...template, likes: template.likes + (isFavorited ? -1 : 1) } 
            : template
        )
      );
      
      // Update the template like count in the database
      await supabase.rpc('update_template_likes', { template_id: id });
      
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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
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
