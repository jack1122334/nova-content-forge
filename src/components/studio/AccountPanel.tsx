
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const AccountPanel: React.FC = () => {
  const [usePersona, setUsePersona] = useState(true);
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">账号定位</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-nova-gray mb-2">绑定账号</h4>
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=60&h=60&auto=format&fit=crop&crop=faces" alt="Profile" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="text-sm font-medium text-nova-dark-gray">@设计生活家</p>
              <p className="text-xs text-nova-gray">小红书 · 4.2k 粉丝</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-nova-gray">账号人设与知识</h4>
            <div className="flex items-center space-x-2">
              <Switch id="use-persona" checked={usePersona} onCheckedChange={setUsePersona} />
              <Label htmlFor="use-persona" className="text-xs text-nova-gray">
                {usePersona ? "启用中" : "已关闭"}
              </Label>
            </div>
          </div>
          <p className="text-sm text-nova-dark-gray">
            80后都市女性，来自上海，月收入2.5-3万，热爱家居设计和生活美学。毕业于知名艺术院校，现从事室内设计工作，对色彩搭配和空间布局有独特见解。周末喜欢探店、逛展览，分享高性价比的居家好物和装饰灵感。擅长将简约风与温馨感结合，打造舒适实用的生活空间。热衷分享居家改造、收纳技巧和艺术摆件，致力于用设计提升日常生活品质。
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;
