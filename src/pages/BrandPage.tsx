
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KnowledgeBase from "@/components/brand/KnowledgeBase";
import ContentPool from "@/components/brand/ContentPool";
import BrandForm from "@/components/brand/BrandForm";

const BrandPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">品牌中心</h1>
      
      <Tabs defaultValue="form" className="space-y-6">
        <TabsList className="w-full bg-white border border-gray-100 p-1 rounded-lg">
          <TabsTrigger value="form" className="flex-1 data-[state=active]:bg-nova-blue data-[state=active]:text-white">
            发布任务
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex-1 data-[state=active]:bg-nova-blue data-[state=active]:text-white">
            品牌知识库
          </TabsTrigger>
          <TabsTrigger value="content" className="flex-1 data-[state=active]:bg-nova-blue data-[state=active]:text-white">
            内容池
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="form">
          <BrandForm />
        </TabsContent>
        
        <TabsContent value="knowledge">
          <KnowledgeBase />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentPool />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandPage;
