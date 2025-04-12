
import React from "react";
import { Edit, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AccountInfo: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const { profile } = useAuth();
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-medium text-nova-dark-gray">账号信息</h3>
        <button 
          className="text-sm text-nova-blue flex items-center"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Check className="h-4 w-4 mr-1" /> 保存
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1" /> 编辑
            </>
          )}
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center">
          <img 
            src={profile?.avatar_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&auto=format&fit=crop&crop=faces"} 
            alt="Profile" 
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div>
            <h4 className="text-base font-medium text-nova-dark-gray">{profile?.username || "设计生活家"}</h4>
            <p className="text-sm text-nova-gray">创作者 · 注册时间：2024-12-15</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-nova-gray mb-2">绑定账号</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-500 text-xs font-medium">小红书</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-nova-dark-gray">@设计生活家</p>
                  <p className="text-xs text-nova-gray">4.2k 粉丝 · 236 作品</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">已认证</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-500 text-xs font-medium">抖音</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-nova-dark-gray">@设计生活日常</p>
                  <p className="text-xs text-nova-gray">1.5k 粉丝 · 82 作品</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">已认证</span>
            </div>
            
            <button className="w-full border border-dashed border-gray-200 rounded-lg p-3 text-sm text-nova-gray flex items-center justify-center hover:border-nova-blue hover:text-nova-blue">
              + 绑定更多平台账号
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-nova-gray mb-2">账号人设与知识</h4>
          {isEditing ? (
            <textarea
              className="nova-text-input w-full h-24 resize-none"
              defaultValue="80后都市女性，来自上海，月收入2.5-3万，热爱家居设计和生活美学。毕业于知名艺术院校，现从事室内设计工作，对色彩搭配和空间布局有独特见解。周末喜欢探店、逛展览，分享高性价比的居家好物和装饰灵感。擅长将简约风与温馨感结合，打造舒适实用的生活空间。热衷分享居家改造、收纳技巧和艺术摆件，致力于用设计提升日常生活品质。"
            ></textarea>
          ) : (
            <p className="text-sm text-nova-dark-gray">
              80后都市女性，来自上海，月收入2.5-3万，热爱家居设计和生活美学。毕业于知名艺术院校，现从事室内设计工作，对色彩搭配和空间布局有独特见解。周末喜欢探店、逛展览，分享高性价比的居家好物和装饰灵感。擅长将简约风与温馨感结合，打造舒适实用的生活空间。热衷分享居家改造、收纳技巧和艺术摆件，致力于用设计提升日常生活品质。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
