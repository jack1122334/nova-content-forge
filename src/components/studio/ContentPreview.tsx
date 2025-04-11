
import React from "react";
import { Edit, Share } from "lucide-react";

const ContentPreview: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  const previewItems = [
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
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-medium text-nova-dark-gray">内容预览</h3>
        <p className="text-sm text-nova-gray mt-1">基于您的选择，AI已为您生成以下内容</p>
      </div>
      
      <div className="flex-1 overflow-hidden flex">
        <div className="w-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-md mx-auto">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img 
                  src={previewItems[selectedIndex].cover} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-nova-dark-gray mb-3">
                {previewItems[selectedIndex].title}
              </h3>
              <div className="text-sm text-nova-dark-gray whitespace-pre-line">
                {previewItems[selectedIndex].content}
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
    </div>
  );
};

export default ContentPreview;
