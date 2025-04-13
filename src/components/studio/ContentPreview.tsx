import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ContentPreviewProps {
  selectedTrends: string[];
  selectedTemplate: string | null;
  customRequirements: string;
  generatedContent?: {
    img_url: string;
    text: string;
  } | null;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
  selectedTrends,
  selectedTemplate,
  customRequirements,
  generatedContent
}) => {
  const handleCopyText = () => {
    if (generatedContent?.text) {
      navigator.clipboard.writeText(generatedContent.text);
      toast.success("文本已复制到剪贴板");
    }
  };

  const markdownToHtml = (markdown: string) => {
    if (!markdown) return "";
    
    let html = markdown.replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold my-2">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold my-2">$1</h2>');
    
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    html = html.replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/^• (.*$)/gm, '<li class="ml-4">$1</li>');
    
    html = html.replace(/\n/g, '<br/>');
    
    html = html.replace(/✅/g, '<span class="text-green-500">✅</span>');
    html = html.replace(/❌/g, '<span class="text-red-500">❌</span>');
    html = html.replace(/💕|❤️|💪|🔍|🌟|⚠️|👉|😱|🙌🏻/g, (match) => `<span>${match}</span>`);
    
    return html;
  };

  return (
    <div className="bg-[#1A1F2C] rounded-2xl shadow-lg p-6 h-full">
      <h3 className="text-lg font-medium text-white/80 mb-4">预览效果</h3>
      
      <Tabs defaultValue="preview" className="h-[calc(100%-48px)]">
        <TabsList className="w-full mb-4 bg-[#222932]">
          <TabsTrigger value="preview" className="flex-1 text-white/70 data-[state=active]:text-white data-[state=active]:bg-[#2C3440]">小红书风格预览</TabsTrigger>
          <TabsTrigger value="text" className="flex-1 text-white/70 data-[state=active]:text-white data-[state=active]:bg-[#2C3440]">文本内容</TabsTrigger>
          <TabsTrigger value="images" className="flex-1 text-white/70 data-[state=active]:text-white data-[state=active]:bg-[#2C3440]">图片素材</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="h-[calc(100%-40px)] flex flex-col">
          <div className="flex-1 overflow-hidden mb-4">
            <div className="bg-[#222932] rounded-lg p-4 h-full overflow-auto">
              <div className="max-w-[90%] mx-auto bg-[#2C3440] rounded-xl overflow-hidden shadow-lg flex flex-row">
                {generatedContent?.img_url ? (
                  <div className="w-1/2 border-r border-white/10">
                    <AspectRatio ratio={1} className="bg-[#3A4250]">
                      <img 
                        src={generatedContent.img_url} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error("Image failed to load:", generatedContent.img_url);
                          e.currentTarget.src = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800";
                        }}
                      />
                    </AspectRatio>
                  </div>
                ) : (
                  <div className="w-1/2 border-r border-white/10">
                    <AspectRatio ratio={1} className="bg-[#3A4250]">
                      <img 
                        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800"
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>
                )}
                <div className="w-1/2 p-4 h-[400px] overflow-auto text-white/90">
                  <div dangerouslySetInnerHTML={{ 
                    __html: markdownToHtml(generatedContent?.text || "") 
                  }} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">保存草稿</Button>
            <Button className="flex-1 nova-button">发布内容</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="h-[calc(100%-40px)] flex flex-col">
          <ScrollArea className="flex-1 mb-4 rounded-lg border p-4">
            <div className="whitespace-pre-line">
              {generatedContent?.text || "暂无内容"}
            </div>
          </ScrollArea>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={handleCopyText}>复制文本</Button>
            <Button className="flex-1 nova-button">调整内容</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="h-[calc(100%-40px)] flex flex-col">
          <div className="flex-1 overflow-hidden mb-4">
            <div className="grid grid-cols-2 gap-4 h-full overflow-auto p-4 border rounded-lg">
              {generatedContent?.img_url ? (
                <div className="w-full h-auto rounded-lg border overflow-hidden">
                  <AspectRatio ratio={1} className="bg-gray-100">
                    <img 
                      src={generatedContent.img_url} 
                      alt="Generated image" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error("Image failed to load:", generatedContent.img_url);
                        e.currentTarget.src = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800";
                      }}
                    />
                  </AspectRatio>
                </div>
              ) : (
                <div className="border rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 p-4">
                  暂无生成的图片
                </div>
              )}
              <div className="border rounded-lg flex items-center justify-center bg-gray-50 text-gray-400">
                生成更多图片素材
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">下载全部</Button>
            <Button className="flex-1 nova-button">生成更多</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentPreview;
