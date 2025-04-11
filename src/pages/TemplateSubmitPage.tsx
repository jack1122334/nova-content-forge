
import React from "react";
import { CameraIcon, Upload, FileUp, Plus, X } from "lucide-react";

const platforms = ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X", "reddit", "Facebook"];
const industries = ["通用", "食品", "服装", "软件", "美妆", "日化", "电子", "汽车", "餐饮"];
const types = ["图文", "视频", "纯文字", "其他"];

const TemplateSubmitPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">模板提交</h1>
      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-nova-dark-gray mb-3">分享您的创意模板</h2>
            <p className="text-sm text-nova-gray">
              您可以上传自己设计的内容模板，获得认可后可以设置付费下载，为您带来额外收益
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">模板标题</label>
              <input
                type="text"
                className="nova-text-input w-full"
                placeholder="请输入模板标题，例如：小红书爆款好物种草模板"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">模板描述</label>
              <textarea
                className="nova-text-input w-full min-h-[120px] resize-none"
                placeholder="请详细描述您的模板特点和适用场景..."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">适用平台</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <label key={platform} className="flex items-center">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                      {platform}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">适用行业</label>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <label key={industry} className="flex items-center">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                      {industry}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">模板类型</label>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <label key={type} className="flex items-center">
                    <input type="radio" name="templateType" className="sr-only peer" />
                    <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                      {type}
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">上传封面图</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-nova-blue transition-colors">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                  <CameraIcon className="h-8 w-8 text-nova-blue" />
                </div>
                <p className="text-sm text-nova-gray mb-2">点击或拖拽上传封面图</p>
                <p className="text-xs text-nova-gray">支持 JPG, PNG 格式，建议尺寸 800x600 像素</p>
                <input type="file" className="hidden" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">上传模板文件</label>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FileUp className="h-5 w-5 text-nova-blue mr-3" />
                    <span className="text-sm text-nova-dark-gray">template_demo.psd</span>
                  </div>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <button className="flex items-center text-nova-blue text-sm">
                  <Plus className="h-4 w-4 mr-1" /> 添加更多文件
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-nova-gray mb-2">定价</label>
              <div className="flex items-center">
                <label className="flex items-center mr-6">
                  <input type="radio" name="pricing" className="mr-2" defaultChecked />
                  <span className="text-sm text-nova-dark-gray">免费</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="pricing" className="mr-2" />
                  <span className="text-sm text-nova-dark-gray">付费</span>
                </label>
              </div>
              <div className="mt-3">
                <div className="relative w-40">
                  <input
                    type="text"
                    className="nova-text-input w-full pl-8"
                    placeholder="输入价格"
                    disabled
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-nova-gray">¥</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-center">
              <button className="nova-button py-3 px-8">提交审核</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSubmitPage;
