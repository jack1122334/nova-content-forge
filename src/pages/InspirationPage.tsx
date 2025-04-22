import React, { useState, useEffect } from "react";
import TemplateFilter from "@/components/home/TemplateFilter";
import TemplateCard from "@/components/home/TemplateCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InspirationPage: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [userFavorites, setUserFavorites] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true);

  useEffect(() => {
    fetchTemplates();
    fetchUserFavorites();
    fetchWorkflows();
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

  const fetchWorkflows = async () => {
    try {
      const { data, error } = await supabase
        .from('coze_workflows')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkflows(data || []);
    } catch (error) {
      console.error("Error fetching workflows:", error);
      toast.error("加载工作流失败");
    } finally {
      setIsLoadingWorkflows(false);
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

  const handleFilterChange = (filters: {
    platforms: string[];
    industries: string[];
    fees: string[];
    types: string[];
  }) => {
    let filtered = [...templates];
    
    if (filters.platforms.length > 0) {
      filtered = filtered.filter(template => 
        filters.platforms.some(p => template.platform.includes(p))
      );
    }
    
    if (filters.fees.length > 0) {
      filtered = filtered.filter(template => 
        (filters.fees.includes('free') && template.isFree) || 
        (filters.fees.includes('paid') && !template.isFree)
      );
    }
    
    setFilteredTemplates(filtered);
  };

  const loadMore = async () => {
    toast.info("加载更多模板...");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">灵感广场</h1>
      
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="templates">模板</TabsTrigger>
          <TabsTrigger value="workflows">工作流</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
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
        </TabsContent>

        <TabsContent value="workflows">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-nova-dark-gray">Coze 工作流</h2>
            </div>
            
            {isLoadingWorkflows ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 text-nova-blue animate-spin" />
              </div>
            ) : workflows.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {workflows.map(workflow => (
                  <div key={workflow.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    {workflow.image_url && (
                      <div className="aspect-[3/4] relative">
                        <img
                          src={workflow.image_url}
                          alt={workflow.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 truncate">{workflow.name}</h3>
                      {workflow.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {workflow.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-nova-gray">暂无工作流数据</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InspirationPage;
