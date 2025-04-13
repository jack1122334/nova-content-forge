
import { useState } from "react";
import { toast } from "sonner";
import { TaskCardProps } from "@/components/marketplace/TaskCard";

interface ContentGenerationOptions {
  task: TaskCardProps | null;
  taskDetailDescription: string;
  selectedTrends: string[];
  styleOption: string;
  selectedTemplate: string | null;
  selectedTemplateHtml: string | undefined;
  customRequirements: string;
}

interface GeneratedContent {
  img_url: string;
  text: string;
}

export const useContentGeneration = () => {
  const [generating, setGenerating] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const generateContent = async (options: ContentGenerationOptions) => {
    const {
      task,
      taskDetailDescription,
      selectedTrends,
      styleOption,
      selectedTemplate,
      selectedTemplateHtml,
      customRequirements
    } = options;

    try {
      // Clear any previous errors
      setApiError(null);
      
      // Get the account info element content
      const accountInfoElement = document.querySelector('[data-info="account-info"]');
      const accountInfo = accountInfoElement?.textContent || "";
      
      // Get brand brief info with detailed description
      let brandBrief = "无品牌任务";
      if (task) {
        brandBrief = `${task.brand} - ${task.brief}`;
        if (taskDetailDescription) {
          brandBrief += `: ${taskDetailDescription}`;
        }
        console.log("Sending brand brief to API:", brandBrief);
      }
      
      // Get selected trends
      const hotspots = selectedTrends.length > 0 ? selectedTrends.join("、") : "无热点";
      
      // Prepare template parameters - only send when explicitly using template
      let templateParams = {};
      if (styleOption === "use-template" && selectedTemplate) {
        if (selectedTemplateHtml) {
          templateParams = {
            template: selectedTemplate,
            template_html: selectedTemplateHtml
          };
        } else {
          // Try to fetch the template HTML from localStorage if not already available
          const allTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
          const templateData = allTemplates.find((t: any) => t.id === selectedTemplate);
          if (templateData && templateData.html_content) {
            templateParams = {
              template: selectedTemplate,
              template_html: templateData.html_content
            };
          } else {
            console.warn("Selected template has no HTML content:", selectedTemplate);
            templateParams = { template: selectedTemplate };
          }
        }
      }
      
      // Log complete template info
      console.log("Template parameters:", templateParams);

      // Prepare request payload with all required parameters
      // Make sure to provide default values for required fields
      const payload = {
        workflow_id: "7492378369356333090",
        parameters: {
          brand_brief: brandBrief || "无品牌任务",
          hotspot: hotspots || "无热点",
          account_info: accountInfo || "无账户信息",
          text_style: customRequirements || "通用风格",
          // Adding default image_url in case it's a required parameter
          image_url: "https://placeholder.com/image.jpg",
          // Add any other potentially required fields with defaults
          ...templateParams
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

  const handleGenerate = async (options: ContentGenerationOptions) => {
    setGenerating(true);
    
    // Additional validation before making the API call
    if (!options.task && !options.taskDetailDescription) {
      toast.error("请先选择或填写任务详情");
      setGenerating(false);
      return;
    }
    
    // Validate template selection when using template option
    if (options.styleOption === "use-template" && !options.selectedTemplate) {
      toast.error("请选择一个模板");
      setGenerating(false);
      return;
    }
    
    try {
      const success = await generateContent(options);
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

  return {
    generating,
    contentReady,
    generatedContent,
    apiError,
    handleGenerate
  };
};
