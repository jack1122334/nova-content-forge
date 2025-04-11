
import React from "react";

const AccountPanel: React.FC = () => {
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
          <h4 className="text-sm font-medium text-nova-gray mb-2">账号人设</h4>
          <p className="text-sm text-nova-dark-gray">
            80后都市女性，热爱家居设计和生活美学，分享高性价比的居家好物和装饰灵感。
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-nova-gray mb-2">内容偏好</h4>
          <div className="flex flex-wrap gap-2">
            <span className="nova-tag">家居好物</span>
            <span className="nova-tag">生活方式</span>
            <span className="nova-tag">设计美学</span>
            <span className="nova-tag">日常穿搭</span>
            <span className="nova-tag">美食分享</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPanel;
