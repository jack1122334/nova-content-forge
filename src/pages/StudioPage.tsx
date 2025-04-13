
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TaskCardProps } from "@/components/marketplace/TaskCard";
import { useAuth } from "@/context/AuthContext";

// Components
import TaskPanel from "@/components/studio/TaskPanel";
import TrendingPanel from "@/components/studio/TrendingPanel";
import AccountPanel from "@/components/studio/AccountPanel";
import TemplateSelector from "@/components/studio/TemplateSelector";
import CustomRequirements from "@/components/studio/CustomRequirements";
import ContentPreview from "@/components/studio/ContentPreview";
import StyleSelector from "@/components/studio/StyleSelector";
import GenerateButton from "@/components/studio/GenerateButton";
import ApiErrorDisplay from "@/components/studio/ApiErrorDisplay";
import EmptyPreview from "@/components/studio/EmptyPreview";

// Hooks
import { useContentGeneration } from "@/hooks/useContentGeneration";

const StudioPage: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  
  // State for task and trends
  const [task, setTask] = useState<TaskCardProps | null>(null);
  const [taskDetailDescription, setTaskDetailDescription] = useState("");
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  
  // State for content style and requirements
  const [styleOption, setStyleOption] = useState("generate-new");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedTemplateHtml, setSelectedTemplateHtml] = useState<string | undefined>(undefined);
  const [customRequirements, setCustomRequirements] = useState("");
  
  // Content generation hook
  const { 
    generating, 
    contentReady, 
    generatedContent, 
    apiError, 
    handleGenerate 
  } = useContentGeneration();
  
  useEffect(() => {
    // Check if there's a task passed from marketplace
    if (location.state && location.state.selectedTask) {
      setTask(location.state.selectedTask);
      console.log("Task set from location state:", location.state.selectedTask);
    }
  }, [location.state]);
  
  const handleTrendSelect = (trends: string[]) => {
    setSelectedTrends(trends);
    console.log("Selected trends updated:", trends);
  };
  
  const handleTemplateSelect = (templateId: string, htmlContent?: string) => {
    if (styleOption === "use-template") {
      setSelectedTemplate(templateId);
      setSelectedTemplateHtml(htmlContent);
      console.log("Selected template updated:", templateId, "with HTML:", htmlContent);
    }
  };
  
  const handleTaskDetailChange = (detail: string) => {
    setTaskDetailDescription(detail);
    console.log("Task detail description updated:", detail);
  };
  
  const handleGenerateClick = () => {
    handleGenerate({
      task,
      taskDetailDescription,
      selectedTrends,
      styleOption,
      selectedTemplate,
      selectedTemplateHtml,
      customRequirements
    });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">创作台</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <TaskPanel initialTask={task} onTaskDetailChange={handleTaskDetailChange} />
        <TrendingPanel onSelectTrends={handleTrendSelect} />
        <AccountPanel />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <StyleSelector value={styleOption} onChange={setStyleOption} />
          
          {styleOption === "use-template" && (
            <TemplateSelector 
              onSelectTemplate={handleTemplateSelect} 
              selectedTemplate={selectedTemplate}
            />
          )}
          
          <CustomRequirements onChange={setCustomRequirements} />
          
          <div className="flex justify-center">
            <GenerateButton 
              onClick={handleGenerateClick} 
              disabled={generating} 
            />
          </div>
          
          <ApiErrorDisplay error={apiError} />
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
            <EmptyPreview />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
