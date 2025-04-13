
import React from "react";
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="nova-button w-full py-3 text-lg"
    >
      {disabled ? "内容生成中..." : "内容生成"}
    </Button>
  );
};

export default GenerateButton;
