
import React from "react";
import { Copy, Share2 } from "lucide-react";

const ReferralCard: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText("https://nova.platform.com/ref/design123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-nova-dark-gray mb-4">邀请好友</h3>
      <div className="mb-4">
        <p className="text-sm text-nova-dark-gray mb-3">
          邀请好友加入Nova平台，每成功邀请一位创作者，您将获得<span className="text-nova-blue font-medium">¥50</span>奖励！
        </p>
        <div className="flex items-center">
          <input
            type="text"
            value="https://nova.platform.com/ref/design123"
            readOnly
            className="flex-1 bg-nova-light-gray rounded-l-lg px-4 py-2 border-0 focus:outline-none"
          />
          <button 
            className="bg-nova-blue text-white rounded-r-lg px-4 py-2 flex items-center"
            onClick={handleCopy}
          >
            {copied ? "已复制" : <><Copy className="h-4 w-4 mr-1" /> 复制</>}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 bg-blue-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-nova-dark-gray mb-1">已邀请好友</h4>
          <p className="text-xl font-bold text-nova-blue">12<span className="text-sm font-normal ml-1">人</span></p>
        </div>
        <div className="flex-1 bg-green-50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-nova-dark-gray mb-1">获得奖励</h4>
          <p className="text-xl font-bold text-green-600">¥600<span className="text-sm font-normal ml-1">元</span></p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="flex items-center text-white bg-gradient-to-r from-nova-blue to-blue-500 rounded-lg px-6 py-3 hover:opacity-90">
          <Share2 className="h-5 w-5 mr-2" /> 立即分享给好友
        </button>
      </div>
    </div>
  );
};

export default ReferralCard;
