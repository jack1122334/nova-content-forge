import React, { useState } from "react";
import { CameraIcon, FileUp, Plus, X, Code } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const platforms = ["小红书", "抖音", "快手", "视频号", "Instagram", "youtube", "X", "reddit", "Facebook"];
const industries = ["通用", "食品", "服装", "软件", "美妆", "日化", "电子", "汽车", "餐饮"];
const types = ["图文", "视频", "纯文字", "其他"];

const formSchema = z.object({
  title: z.string().min(2, { message: "标题至少需要2个字符" }),
  description: z.string().optional(),
  platforms: z.array(z.string()).min(1, { message: "请至少选择一个平台" }),
  industries: z.array(z.string()).min(1, { message: "请至少选择一个行业" }),
  templateType: z.string({ required_error: "请选择模板类型" }),
  pricing: z.enum(["free", "paid"]),
  price: z.string().optional()
});

type FileWithPreview = {
  file: File;
  name: string;
  type: string;
  preview?: string;
};

const TemplateSubmitPage: React.FC = () => {
  const [coverImage, setCoverImage] = useState<FileWithPreview | null>(null);
  const [templateFiles, setTemplateFiles] = useState<FileWithPreview[]>([]);
  const [htmlTemplateFile, setHtmlTemplateFile] = useState<FileWithPreview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      platforms: [],
      industries: [],
      templateType: "",
      pricing: "free",
      price: ""
    }
  });

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.includes('image/')) {
      toast.error("请上传图片格式文件作为封面");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage({
        file,
        name: file.name,
        type: file.type,
        preview: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files).map(file => ({
      file,
      name: file.name,
      type: file.type
    }));
    
    setTemplateFiles(prev => [...prev, ...newFiles]);
  };
  
  const handleHtmlTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.name.endsWith('.html') && !file.name.endsWith('.txt')) {
      toast.error("请上传HTML或TXT格式的模板文件");
      return;
    }
    
    setHtmlTemplateFile({
      file,
      name: file.name,
      type: file.type
    });
    
    toast.success("HTML模板文件上传成功");
  };

  const removeFile = (index: number) => {
    setTemplateFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeHtmlTemplate = () => {
    setHtmlTemplateFile(null);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!coverImage) {
      toast.error("请上传封面图");
      return;
    }
    
    if (templateFiles.length === 0 && !htmlTemplateFile) {
      toast.error("请上传至少一个模板文件");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const coverImagePath = `template-images/${Date.now()}_${coverImage.name}`;
      const { error: coverUploadError } = await supabase.storage
        .from('template-images')
        .upload(coverImagePath, coverImage.file);
      
      if (coverUploadError) {
        throw new Error(`封面图上传失败: ${coverUploadError.message}`);
      }
      
      const { data: coverImageUrl } = supabase.storage
        .from('template-images')
        .getPublicUrl(coverImagePath);
      
      const templateData = {
        title: data.title,
        description: data.description || "",
        image_url: coverImageUrl.publicUrl,
        platforms: data.platforms,
        industries: data.industries,
        type: data.templateType,
        is_free: data.pricing === "free",
        price: data.pricing === "paid" ? parseFloat(data.price || "0") : 0,
        has_html_template: !!htmlTemplateFile,
        status: "pending"
      };
      
      const { data: template, error: templateError } = await supabase
        .from('templates')
        .insert(templateData)
        .select()
        .single();
      
      if (templateError) {
        throw new Error(`模板数据保存失败: ${templateError.message}`);
      }
      
      if (templateFiles.length > 0) {
        for (const file of templateFiles) {
          const filePath = `template-files/${template.id}/${file.name}`;
          await supabase.storage
            .from('template-files')
            .upload(filePath, file.file);
        }
      }
      
      if (htmlTemplateFile) {
        const htmlPath = `template-html/${template.id}/${htmlTemplateFile.name}`;
        await supabase.storage
          .from('template-html')
          .upload(htmlPath, htmlTemplateFile.file);
      }
      
      toast.success("模板提交成功，等待审核");
      
      setTimeout(() => {
        navigate('/inspiration');
      }, 1500);
      
    } catch (error) {
      console.error("Template submission error:", error);
      toast.error(error instanceof Error ? error.message : "模板提交失败，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-nova-dark-gray mb-6">模板提交</h1>
      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-nova-dark-gray mb-3">分享您的创意模板</h2>
            <p className="text-sm text-nova-gray">
              您可以上传自己设计的内容模板，获得认可后可以设置付费下载，为您带来额外收益
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-nova-gray">模板标题</FormLabel>
                    <FormControl>
                      <Input
                        className="nova-text-input w-full"
                        placeholder="请输入模板标题，例如：小红书爆款好物种草模板"
                        {...field}
                      />
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
                    <FormLabel className="text-sm font-medium text-nova-gray">模板描述（选填）</FormLabel>
                    <FormControl>
                      <Textarea
                        className="nova-text-input w-full min-h-[120px] resize-none"
                        placeholder="请描述您的模板特点和适用场景..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">适用平台</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map((platform) => (
                    <label key={platform} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const platforms = form.getValues("platforms");
                          
                          if (checked && !platforms.includes(platform)) {
                            form.setValue("platforms", [...platforms, platform]);
                          } else if (!checked && platforms.includes(platform)) {
                            form.setValue("platforms", platforms.filter(p => p !== platform));
                          }
                        }}
                      />
                      <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                        {platform}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">适用行业</label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <label key={industry} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const industries = form.getValues("industries");
                          
                          if (checked && !industries.includes(industry)) {
                            form.setValue("industries", [...industries, industry]);
                          } else if (!checked && industries.includes(industry)) {
                            form.setValue("industries", industries.filter(i => i !== industry));
                          }
                        }}
                      />
                      <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                        {industry}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">模板类型</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <label key={type} className="flex items-center">
                      <input 
                        type="radio" 
                        name="templateType" 
                        className="sr-only peer" 
                        onChange={() => form.setValue("templateType", type)}
                      />
                      <div className="nova-tag peer-checked:bg-nova-blue peer-checked:text-white cursor-pointer">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">上传封面图</label>
                <div 
                  className={`border-2 border-dashed ${coverImage ? 'border-nova-blue' : 'border-gray-200'} rounded-lg p-8 text-center hover:border-nova-blue transition-colors cursor-pointer`}
                  onClick={() => document.getElementById('coverImageInput')?.click()}
                >
                  {coverImage ? (
                    <div className="flex flex-col items-center">
                      <img 
                        src={coverImage.preview} 
                        alt="Cover Preview" 
                        className="w-32 h-32 object-cover rounded-lg mb-4"
                      />
                      <p className="text-sm text-nova-gray">{coverImage.name}</p>
                      <button 
                        type="button"
                        className="mt-2 text-red-500 text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCoverImage(null);
                        }}
                      >
                        移除图片
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                        <CameraIcon className="h-8 w-8 text-nova-blue" />
                      </div>
                      <p className="text-sm text-nova-gray mb-2">点击或拖拽上传封面图</p>
                      <p className="text-xs text-nova-gray">支持 JPG, PNG 格式，建议尺寸 800x600 像素</p>
                    </>
                  )}
                  <input
                    id="coverImageInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">上传HTML模板文件（可选）</label>
                <div 
                  className={`border-2 border-dashed ${htmlTemplateFile ? 'border-nova-blue' : 'border-gray-200'} rounded-lg p-6 text-center hover:border-nova-blue transition-colors cursor-pointer mb-4`}
                  onClick={() => document.getElementById('htmlTemplateInput')?.click()}
                >
                  {htmlTemplateFile ? (
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 text-nova-blue mr-3" />
                        <span className="text-sm text-nova-dark-gray">{htmlTemplateFile.name}</span>
                      </div>
                      <button 
                        type="button"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeHtmlTemplate();
                        }}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mx-auto flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                        <Code className="h-8 w-8 text-nova-blue" />
                      </div>
                      <p className="text-sm text-nova-gray mb-2">点击或拖拽上传HTML模板文件</p>
                      <p className="text-xs text-nova-gray">支持 HTML 或包含HTML代码的 TXT 文件，用于Coze工作流生成封面图</p>
                    </>
                  )}
                  <input
                    id="htmlTemplateInput"
                    type="file"
                    className="hidden"
                    accept=".html,.txt"
                    onChange={handleHtmlTemplateUpload}
                  />
                </div>
                <div className="text-xs text-nova-gray italic mb-4">
                  提示：上传HTML模板文件后，Coze工作流将能够根据HTML代码生成封面图
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">上传模板文件</label>
                <div className="space-y-3">
                  {templateFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <FileUp className="h-5 w-5 text-nova-blue mr-3" />
                        <span className="text-sm text-nova-dark-gray">{file.name}</span>
                      </div>
                      <button 
                        type="button"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div 
                    className="flex items-center text-nova-blue text-sm cursor-pointer"
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <Plus className="h-4 w-4 mr-1" /> 添加更多文件
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-nova-gray mb-2">定价</label>
                <div className="flex items-center">
                  <label className="flex items-center mr-6">
                    <input 
                      type="radio" 
                      name="pricing" 
                      className="mr-2" 
                      defaultChecked
                      onChange={() => form.setValue("pricing", "free")} 
                    />
                    <span className="text-sm text-nova-dark-gray">免费</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="pricing" 
                      className="mr-2"
                      onChange={() => form.setValue("pricing", "paid")} 
                    />
                    <span className="text-sm text-nova-dark-gray">付费</span>
                  </label>
                </div>
                <div className="mt-3">
                  <div className="relative w-40">
                    <Input
                      type="text"
                      className="nova-text-input w-full pl-8"
                      placeholder="输入价格"
                      disabled={form.watch("pricing") !== "paid"}
                      onChange={(e) => form.setValue("price", e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-nova-gray">¥</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-center">
                <button 
                  type="submit" 
                  className="nova-button py-3 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '提交中...' : '提交审核'}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TemplateSubmitPage;
