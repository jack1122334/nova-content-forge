
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

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

  // Convert markdown to HTML (basic implementation)
  const markdownToHtml = (markdown: string) => {
    if (!markdown) return "";
    
    // Convert headers
    let html = markdown.replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold my-2">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-lg font-bold my-2">$1</h2>');
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert bullet points
    html = html.replace(/^\* (.*$)/gm, '<li class="ml-4">$1</li>');
    html = html.replace(/^• (.*$)/gm, '<li class="ml-4">$1</li>');
    
    // Convert line breaks
    html = html.replace(/\n/g, '<br/>');
    
    // Convert emoji indicators
    html = html.replace(/✅/g, '<span class="text-green-500">✅</span>');
    html = html.replace(/❌/g, '<span class="text-red-500">❌</span>');
    html = html.replace(/💕|❤️|💪|🔍|🌟|⚠️|👉|😱|🙌🏻/g, (match) => `<span>${match}</span>`);
    
    return html;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">预览效果</h3>
      
      <Tabs defaultValue="preview" className="h-[calc(100%-48px)]">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="preview" className="flex-1">小红书风格预览</TabsTrigger>
          <TabsTrigger value="text" className="flex-1">文本内容</TabsTrigger>
          <TabsTrigger value="images" className="flex-1">图片素材</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="h-[calc(100%-40px)] flex flex-col">
          <div className="flex-1 overflow-hidden mb-4">
            <div className="bg-gray-50 rounded-lg p-4 h-full overflow-auto">
              <div className="max-w-[375px] mx-auto bg-white rounded-xl overflow-hidden shadow">
                <img 
                  src={generatedContent?.img_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800"} 
                  alt="Preview" 
                  className="w-full h-auto"
                  onError={(e) => {
                    console.error("Image failed to load:", generatedContent?.img_url);
                    e.currentTarget.src = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800";
                  }}
                />
                <div className="p-4">
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
                <img 
                  src={generatedContent.img_url} 
                  alt="Generated image" 
                  className="w-full h-auto rounded-lg border"
                  onError={(e) => {
                    console.error("Image failed to load:", generatedContent.img_url);
                    e.currentTarget.src = "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800";
                  }}
                />
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
