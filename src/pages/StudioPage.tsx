
import React from "react";
import { Button } from "@/components/ui/button";
import TaskPanel from "@/components/studio/TaskPanel";
import TrendingPanel from "@/components/studio/TrendingPanel";
import AccountPanel from "@/components/studio/AccountPanel";
import TemplateSelector from "@/components/studio/TemplateSelector";
import CustomRequirements from "@/components/studio/CustomRequirements";
import ContentPreview from "@/components/studio/ContentPreview";

const StudioPage: React.FC = () => {
  const [generating, setGenerating] = React.useState(false);
  const [contentReady, setContentReady] = React.useState(false);
  
  const handleGenerate = () => {
    setGenerating(true);
    // Simulate content generation
    setTimeout(() => {
      setGenerating(false);
      setContentReady(true);
    }, 2000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">创作台</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-6">
        <TaskPanel />
        <TrendingPanel />
        <AccountPanel />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <TemplateSelector />
          <CustomRequirements />
          <div className="flex justify-center">
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="nova-button w-full py-3 text-lg"
            >
              {generating ? "内容生成中..." : "内容生成"}
            </Button>
          </div>
        </div>
        
        <div className="h-full">
          {contentReady ? (
            <ContentPreview />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-nova-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-nova-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-nova-dark-gray mb-2">准备好创作了吗？</h3>
                <p className="text-sm text-nova-gray">
                  选择模板、输入要求，点击"内容生成"按钮开始创作
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
