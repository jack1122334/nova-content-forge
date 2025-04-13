
import React from "react";

interface ApiErrorDisplayProps {
  error: string | null;
}

const ApiErrorDisplay: React.FC<ApiErrorDisplayProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
      <p className="font-medium">API错误:</p>
      <p>{error}</p>
    </div>
  );
};

export default ApiErrorDisplay;
