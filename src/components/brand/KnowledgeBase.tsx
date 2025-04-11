
import React from "react";
import { FileText, Plus, Edit, Trash } from "lucide-react";

const KnowledgeBase: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-nova-dark-gray">品牌知识库</h3>
        <button className="flex items-center text-nova-blue bg-blue-50 rounded-lg px-4 py-2 hover:bg-blue-100">
          <Plus className="h-4 w-4 mr-1" /> 添加文档
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-nova-gray">
          在这里管理您的品牌资产、营销指南和产品信息，帮助创作者更好地了解您的品牌。
        </p>
      </div>
      
      <div className="space-y-3">
        {[
          { title: "品牌视觉指南", date: "2025-02-15", type: "PDF" },
          { title: "产品详细信息", date: "2025-02-28", type: "DOCX" },
          { title: "品牌故事与价值观", date: "2025-03-05", type: "PDF" },
          { title: "社交媒体传播指南", date: "2025-03-12", type: "PDF" },
          { title: "常见问题解答", date: "2025-03-20", type: "DOCX" },
        ].map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${doc.type === 'PDF' ? 'bg-red-50' : 'bg-blue-50'}`}>
                <FileText className={`h-5 w-5 ${doc.type === 'PDF' ? 'text-red-500' : 'text-blue-500'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-nova-dark-gray">{doc.title}</p>
                <div className="flex items-center text-xs text-nova-gray mt-1">
                  <span>{doc.type}</span>
                  <span className="mx-1">·</span>
                  <span>上传于 {doc.date}</span>
                </div>
              </div>
            </div>
            <div className="flex">
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-nova-gray hover:bg-gray-200">
                <Edit className="h-4 w-4" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;
