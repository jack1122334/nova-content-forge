
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  // Mock data for the preview
  const mockHtml = generatedContent?.img_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800";
  const mockText = generatedContent?.text || `# 刚入手的XXXX护手霜，这个秋冬不干燥！✨

最近天气转凉，双手已经开始泛红发干，打字都有点紧绷感😱 听朋友推荐入手了这款新出的护手霜，用了一周惊喜连连💕

🔍产品细节：
• 质地：轻薄不粘腻，涂抹后1分钟就能吸收
• 香味：淡淡的茉莉花香，不会过于浓烈，很适合日常
• 保湿力：一天涂2-3次，手部干燥问题明显改善
• 便携性：小小一支放包里完全不占地方

💪优点：
✅吸收快速，不影响用手机和电脑
✅保湿效果持久，用后皮肤柔软有弹性
✅香味优雅，不会过于甜腻
✅价格亲民，性价比很高

⚠️缺点：
❌包装略简单，送人需要额外包装
❌保湿效果虽好，但特别干燥的季节还需勤涂

🌟真心推荐给：
• 经常用电脑手部干燥的上班族
• 怕粘腻感但又需要保湿的挑剔星人
• 喜欢随身携带护手产品的朋友

姐妹们有什么好用的护手霜也推荐给我呀～ 这个秋冬一起告别干裂手🙌🏻`;

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
                  src={mockHtml} 
                  alt="Preview" 
                  className="w-full h-auto"
                />
                <div className="p-4">
                  <div dangerouslySetInnerHTML={{ __html: mockText.replace(/\n/g, '<br/>') }} />
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
              {mockText}
            </div>
          </ScrollArea>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">复制文本</Button>
            <Button className="flex-1 nova-button">调整内容</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="h-[calc(100%-40px)] flex flex-col">
          <div className="flex-1 overflow-hidden mb-4">
            <div className="grid grid-cols-2 gap-4 h-full overflow-auto p-4 border rounded-lg">
              <img 
                src={mockHtml} 
                alt="Image 1" 
                className="w-full h-auto rounded-lg border"
              />
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
