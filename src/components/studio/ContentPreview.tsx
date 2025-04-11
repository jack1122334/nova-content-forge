
import React, { useState, useEffect } from "react";
import { Edit, Share, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ContentPreviewProps {
  selectedTrends?: string[];
  selectedTemplate?: string | null;
  customRequirements?: string;
}

interface ContentItem {
  cover: string;
  title: string;
  content: string;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({ 
  selectedTrends = [], 
  selectedTemplate, 
  customRequirements = "" 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [previewItems, setPreviewItems] = useState<ContentItem[]>([]);
  
  // Sample image URLs for covers
  const sampleCovers = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=500&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&auto=format&fit=crop"
  ];
  
  const generateContentWithDeepseek = async () => {
    setLoading(true);
    
    try {
      const apiKey = "sk-881fdb520f61430b8257c19b0a2f1fd3";
      const apiUrl = "https://api.deepseek.com/v1/chat/completions";
      
      // Get brand information from TaskPanel
      const brandInfo = document.querySelector('.TaskPanel h4')?.textContent || "上海家化 - 新品护手霜种草";
      const brandDescription = document.querySelector('.TaskPanel p.text-sm.text-nova-dark-gray')?.textContent || 
        "通过真实体验分享，展示产品的滋润效果和使用感受。重点突出产品快速吸收、不粘腻的特点，以及独特的香氛体验。";
      
      // Get account persona from AccountPanel
      const accountPersona = document.querySelector('.AccountPanel p.text-sm.text-nova-dark-gray')?.textContent || 
        "80后都市女性，热爱家居设计和生活美学，分享高性价比的居家好物和装饰灵感。";
      
      // Prepare the prompt
      const prompt = `
请为小红书平台创作3篇图文内容，使用HTML格式输出，每篇内容包括标题、正文和合适的封面图。

品牌任务信息：
${brandInfo}
${brandDescription}

创作者账号人设：
${accountPersona}

${selectedTrends.length > 0 ? `需要融入的热点话题：\n${selectedTrends.join('\n')}` : ''}

${customRequirements ? `其他要求：\n${customRequirements}` : ''}

请遵循小红书的内容风格，包括：
1. 标题吸引人，使用话题标签和emoji
2. 正文内容有态度、有干货、有个性
3. 段落清晰，可以使用emoji、分点符号等增强可读性
4. 内容真诚自然，避免过度营销感

请直接输出3篇内容的HTML代码，每篇包含标题和正文，不要包含任何其他解释。内容需要完全不同，提供多样化的写作风格和角度。
      `;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      
      // Parse the generated content and create preview items
      const contentParts = generatedContent.split(/(?=<h1>|<h2>|<h3>|# )/g)
        .filter((part: string) => part.trim().length > 0)
        .slice(0, 3); // Take up to 3 pieces of content
      
      const items: ContentItem[] = contentParts.map((content: string, index: number) => {
        // Extract title from content (assuming it starts with a heading)
        let title = '';
        const titleMatch = content.match(/<h[1-3]>(.*?)<\/h[1-3]>|# (.*?)(\n|$)/);
        if (titleMatch) {
          title = titleMatch[1] || titleMatch[2] || `小红书内容 ${index + 1}`;
          
          // Remove HTML tags if present
          title = title.replace(/<.*?>/g, '');
        } else {
          title = `小红书内容 ${index + 1}`;
        }
        
        // Clean up content - remove HTML tags for plain text display
        let cleanContent = content.replace(/<.*?>/g, '');
        
        // If the content is too short, it might be incomplete
        if (cleanContent.length < 100) {
          cleanContent = "这款护手霜简直是干燥季节的救星！质地轻薄不油腻，吸收迅速，香氛清新自然。最让我惊喜的是滋润度可以持续8小时以上，特别适合冬季使用。平时敲键盘工作的我，手部容易干燥，这款护手霜真的解决了我的烦恼。小小一支放在包里也很方便，随时可以补充滋润度。强烈推荐给手部干燥的朋友们！";
        }
        
        return {
          cover: sampleCovers[index % sampleCovers.length],
          title,
          content: cleanContent
        };
      });
      
      // If we couldn't parse enough content items, add some defaults
      while (items.length < 3) {
        items.push({
          cover: sampleCovers[items.length % sampleCovers.length],
          title: `护手霜使用体验分享 #测评 #好物推荐 ${items.length + 1}`,
          content: "最近天气转凉，手部肌肤开始发干，偶然间收到了这款护手霜，用了一周后不得不来分享！\n\n🌟质地：轻薄不油腻\n🌟吸收：迅速，不留油光\n🌟香氛：清新自然，不刺鼻\n🌟效果：滋润度可持续8小时以上\n\n平时敲键盘工作的我，手部容易干燥，这款护手霜真的解决了我的烦恼。而且小小一支放在包里也很方便。\n\n你们有什么护手霜推荐，欢迎在评论区分享～"
        });
      }
      
      setPreviewItems(items);
    } catch (error) {
      console.error("Error generating content with Deepseek:", error);
      toast.error("内容生成失败，使用默认内容替代");
      
      // Fallback to default items if API fails
      setPreviewItems([
        {
          cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&auto=format&fit=crop",
          title: "这款护手霜简直是干燥季节的救星！#测评 #好物推荐",
          content: "最近天气转凉，手部肌肤开始发干，偶然间收到了这款护手霜，用了一周后不得不来分享！\n\n🌟质地：轻薄不油腻\n🌟吸收：迅速，不留油光\n🌟香氛：清新自然，不刺鼻\n🌟效果：滋润度可持续8小时以上\n\n平时敲键盘工作的我，手部容易干燥，这款护手霜真的解决了我的烦恼。而且小小一支放在包里也很方便。\n\n你们有什么护手霜推荐，欢迎在评论区分享～",
        },
        {
          cover: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=500&h=500&auto=format&fit=crop",
          title: "秋冬必备！这款护手霜让双手水嫩如初 #好物分享",
          content: "干燥的秋冬季，双手是最容易被忽视的部位，常常又干又痒。今天给大家推荐一款性价比超高的护手霜！\n\n✨ 先说质地：清爽不油腻，涂抹后很快吸收\n✨ 保湿效果：惊艳！补水锁水双管齐下\n✨ 气味：淡淡的花香，很舒服\n✨ 便携性：小巧的包装，随时随地都能用\n\n用了两周，手部皮肤明显改善，连指缝的小倒刺都消失了！超推荐给需要经常洗手或者用酒精消毒的朋友～",
        },
        {
          cover: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=500&auto=format&fit=crop",
          title: "入手这款护手霜后，我把家里其他的都扔了！#好物推荐",
          content: "作为一个护手霜爱好者，家里常备十几款各种品牌的护手霜。但自从上个月试用了这一款，其他的全都吃灰了！\n\n💖 吸收速度：涂抹后30秒完全吸收，可以立刻拿手机\n💖 滋润度：保湿效果能持续一整天\n💖 香味：清新自然，不会与香水冲突\n💖 质地：像乳液一样轻盈，完全不油腻\n\n特别适合办公室使用，不会弄脏键盘和文件。而且价格也很亲民，绝对是平价中的战斗机！",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateContentWithDeepseek();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-medium text-nova-dark-gray">内容预览</h3>
        <p className="text-sm text-nova-gray mt-1">基于您的选择，AI已为您生成以下内容</p>
      </div>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-nova-blue mx-auto mb-4" />
            <p className="text-nova-gray">正在生成内容，请稍候...</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden flex">
          <div className="w-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-md mx-auto">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img 
                    src={previewItems[selectedIndex]?.cover} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-nova-dark-gray mb-3">
                  {previewItems[selectedIndex]?.title}
                </h3>
                <div className="text-sm text-nova-dark-gray whitespace-pre-line">
                  {previewItems[selectedIndex]?.content}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex gap-3 mb-4">
                {previewItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${selectedIndex === index ? 'border-nova-blue' : 'border-transparent'}`}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img 
                      src={item.cover} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-3">
                <button className="flex items-center px-4 py-2 border border-nova-blue text-nova-blue rounded-lg hover:bg-blue-50">
                  <Edit className="w-4 h-4 mr-2" /> 二次编辑
                </button>
                <button className="nova-button flex items-center">
                  <Share className="w-4 h-4 mr-2" /> 一键发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;
