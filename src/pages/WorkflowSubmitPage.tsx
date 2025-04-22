
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const workflowFormSchema = z.object({
  workflow_id: z.string().min(1, "工作流 ID 不能为空"),
  name: z.string().min(1, "名称不能为空"),
  description: z.string().optional(),
  input_fields: z.string().min(1, "请填写输入字段"),
  output_fields: z.string().min(1, "请填写输出字段"),
  is_public: z.boolean().default(true)
});

type WorkflowFormValues = z.infer<typeof workflowFormSchema>;

const WorkflowSubmitPage = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<WorkflowFormValues>({
    resolver: zodResolver(workflowFormSchema),
    defaultValues: {
      description: "",
      is_public: true,
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('workflow-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('workflow-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast.success("图片上传成功");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("图片上传失败");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: WorkflowFormValues) => {
    try {
      let input_fields;
      let output_fields;
      
      try {
        input_fields = JSON.parse(data.input_fields);
        output_fields = JSON.parse(data.output_fields);
      } catch (e) {
        toast.error("输入/输出字段格式不正确，请使用有效的 JSON 格式");
        return;
      }

      const { error } = await supabase.from('coze_workflows').insert({
        workflow_id: data.workflow_id,
        name: data.name,
        description: data.description,
        input_fields,
        output_fields,
        image_url: imageUrl,
        created_by: (await supabase.auth.getUser()).data.user?.id,
        is_public: data.is_public
      });

      if (error) throw error;

      toast.success("工作流创建成功");
      navigate("/inspiration");
    } catch (error) {
      console.error("Error submitting workflow:", error);
      toast.error("工作流创建失败");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">上传 Coze 工作流</h1>
        <p className="mt-2 text-gray-600">
          分享你的 Coze 工作流，让更多人发现并使用它。
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="workflow_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>工作流 ID</FormLabel>
                  <FormControl>
                    <Input placeholder="输入你的 Coze 工作流 ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    在 Coze 平台获取的唯一工作流标识符
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>工作流名称</FormLabel>
                  <FormControl>
                    <Input placeholder="为你的工作流起个名字" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="描述一下这个工作流的功能和特点"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="input_fields"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>输入字段 (JSON 格式)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='例如: {"text": "string", "options": "array"}'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    使用 JSON 格式描述输入字段的类型
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="output_fields"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>输出字段 (JSON 格式)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='例如: {"result": "string", "confidence": "number"}'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    使用 JSON 格式描述输出字段的类型
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>封面图片（可选，建议 3:4 比例）</FormLabel>
              <div className="flex items-center gap-4">
                {imageUrl && (
                  <div className="relative w-32 h-40 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Workflow preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  onClick={() => imageInputRef.current?.click()}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      上传中...
                    </>
                  ) : (
                    <>
                      <ImagePlus className="mr-2 h-4 w-4" />
                      {imageUrl ? "更换图片" : "上传图片"}
                    </>
                  )}
                </Button>
                <input
                  type="file"
                  ref={imageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full">
                提交工作流
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WorkflowSubmitPage;
