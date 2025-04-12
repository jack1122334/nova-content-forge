
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import TaskPanel from "@/components/studio/TaskPanel";
import TrendingPanel from "@/components/studio/TrendingPanel";
import AccountPanel from "@/components/studio/AccountPanel";
import TemplateSelector from "@/components/studio/TemplateSelector";
import CustomRequirements from "@/components/studio/CustomRequirements";
import ContentPreview from "@/components/studio/ContentPreview";
import { TaskCardProps } from "@/components/marketplace/TaskCard";
import { useAuth } from "@/context/AuthContext";

const StudioPage: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  const [generating, setGenerating] = React.useState(false);
  const [contentReady, setContentReady] = React.useState(false);
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customRequirements, setCustomRequirements] = useState("");
  const [generatedContent, setGeneratedContent] = useState<{
    img_url: string;
    text: string;
  } | null>(null);
  const [task, setTask] = useState<TaskCardProps | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if there's a task passed from marketplace
    if (location.state && location.state.selectedTask) {
      setTask(location.state.selectedTask);
    }
  }, [location.state]);
  
  const generateContent = async () => {
    try {
      // Clear any previous errors
      setApiError(null);
      
      // Get the account info element content
      const accountInfoElement = document.querySelector('[data-info="account-info"]');
      const accountInfo = accountInfoElement?.textContent || "";
      
      // Prepare request payload
      const payload = {
        workflow_id: "7492378369356333090",
        parameters: {
          brand_brief: task ? `${task.brand} - ${task.brief}` : "无品牌任务",
          hotspot: selectedTrends.length > 0 ? selectedTrends.join("、") : "",
          account_info: accountInfo,
          text_style: customRequirements || "",
          template: selectedTemplate || ""
        }
      };

      console.log("Sending Coze API request with payload:", payload);

      // Call Coze API
      const response = await fetch("https://api.coze.cn/v1/workflow/run", {
        method: "POST",
        headers: {
          "Authorization": "Bearer pat_3tnCAPW9JAYvDu4NHIhvlmPUgDx4eYBWqQjdDKbDQgHihhh1yyDDhHPKUVDynzn8",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API request failed with status ${response.status}:`, errorText);
        throw new Error(`API请求失败 (状态码: ${response.status})`);
      }

      const result = await response.json();
      console.log("Coze API response:", result);
      
      if (result.code === 0) {
        try {
          // Parse the data field which contains the response in JSON string format
          const outputData = JSON.parse(result.data);
          console.log("Parsed output data:", outputData);
          
          if (!outputData.img_url || !outputData.text) {
            console.error("Missing required fields in API response:", outputData);
            throw new Error("API返回的数据格式不正确");
          }
          
          setGeneratedContent({
            img_url: outputData.img_url,
            text: outputData.text
          });
          return true;
        } catch (parseError) {
          console.error("Error parsing API response data:", parseError, result.data);
          throw new Error("解析API返回数据时出错");
        }
      } else {
        console.error("API error with code:", result.code, "message:", result.msg);
        throw new Error(`API错误: ${result.msg || `错误代码 ${result.code}`}`);
      }
    } catch (error) {
      console.error("Error calling Coze API:", error);
      setApiError(error instanceof Error ? error.message : "未知错误");
      throw error;
    }
  };
  
  const handleGenerate = async () => {
    setGenerating(true);
    
    try {
      const success = await generateContent();
      if (success) {
        setContentReady(true);
        toast.success("内容生成成功");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(`生成内容时出错: ${apiError || "请重试"}`);
    } finally {
      setGenerating(false);
    }
  };
  
  const handleTrendSelect = (trends: string[]) => {
    setSelectedTrends(trends);
  };
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">创作台</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <TaskPanel initialTask={task} />
        <TrendingPanel onSelectTrends={handleTrendSelect} />
        <AccountPanel />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TemplateSelector onSelectTemplate={handleTemplateSelect} />
          <CustomRequirements onChange={setCustomRequirements} />
          <div className="flex justify-center">
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="nova-button w-full py-3 text-lg"
            >
              {generating ? "内容生成中..." : "内容生成"}
            </Button>
          </div>
          
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              <p className="font-medium">API错误:</p>
              <p>{apiError}</p>
            </div>
          )}
        </div>
        
        <div className="h-full">
          {contentReady ? (
            <ContentPreview 
              selectedTrends={selectedTrends}
              selectedTemplate={selectedTemplate}
              customRequirements={customRequirements}
              generatedContent={generatedContent}
            />
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
