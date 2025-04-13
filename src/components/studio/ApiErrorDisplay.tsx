
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ApiErrorDisplayProps {
  error: string | null;
}

const ApiErrorDisplay: React.FC<ApiErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="bg-red-50 border border-red-200 text-red-700 rounded-lg">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>API 错误</AlertTitle>
      <AlertDescription>
        {error}
        {error.includes("Missing required parameters") && (
          <p className="mt-2 text-sm">
            请确保选择了任务详情和热点话题，可能需要重新选择模板或填写其他要求。
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ApiErrorDisplay;
