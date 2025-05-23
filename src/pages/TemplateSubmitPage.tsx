import React, { useState, useRef, useEffect } from "react";
import { CameraIcon, FileUp, Plus, X, Code, AlertTriangle, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { supabase, checkStorageBucket, ensureStorageBucket, saveTemplate } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
  price: z.string().optional(),
  autoRenderCover: z.boolean().default(false)
});

type FileWithPreview = {
  file: File;
  name: string;
  type: string;
  preview?: string;
  content?: string;
};

const BUCKET_NAME = 'template-images';

const TemplateSubmitPage: React.FC = () => {
  const [coverImage, setCoverImage] = useState<FileWithPreview | null>(null);
  const [templateFiles, setTemplateFiles] = useState<FileWithPreview[]>([]);
  const [htmlTemplateFile, setHtmlTemplateFile] = useState<FileWithPreview | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoRenderCover, setAutoRenderCover] = useState(false);
  const htmlPreviewRef = useRef<HTMLDivElement>(null);
  const [htmlRendering, setHtmlRendering] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [storageBucketExists, setStorageBucketExists] = useState<boolean | null>(null);
  const [storageChecking, setStorageChecking] = useState(true);
  const [isCreatingBucket, setIsCreatingBucket] = useState(false);
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
      price: "",
      autoRenderCover: false
    }
  });

  useEffect(() => {
    verifyStorageBucket();
  }, []);

  const verifyStorageBucket = async () => {
    try {
      setStorageChecking(true);
      setUploadError(null);
      console.log(`检查存储桶 '${BUCKET_NAME}' 是否存在...`);
      
      const bucketExists = await checkStorageBucket(BUCKET_NAME);
      
      if (!bucketExists) {
        console.error(`${BUCKET_NAME} 存储桶不存在或无法访问`);
        setUploadError(`模板图片存储桶可能不存在或无法访问，请点击刷新按钮重试`);
        setStorageBucketExists(false);
      } else {
        console.log(`成功验证 '${BUCKET_NAME}' 存储桶存在并可访问`);
        setStorageBucketExists(true);
        setUploadError(null);
      }
    } catch (err: any) {
      console.error("存储桶检查异常:", err);
      setUploadError(`存储服务初始化失败: ${err.message || '未知错误'}`);
      setStorageBucketExists(false);
    } finally {
      setStorageChecking(false);
    }
  };

  const createStorageBucket = async () => {
    try {
      setIsCreatingBucket(true);
      setUploadError(null);
      console.log(`尝试创建存储桶 '${BUCKET_NAME}'...`);
      
      const success = await ensureStorageBucket(BUCKET_NAME);
      
      if (!success) {
        setUploadError(`无法创建存储桶，请联系管理员或使用自动渲染选项`);
        toast.error("存储桶创建失败");
      } else {
        setStorageBucketExists(true);
        setUploadError(null);
        toast.success("存储桶创建或访问成功");
      }
    } catch (err: any) {
      console.error("创建存储桶异常:", err);
      setUploadError(`创建存储桶失败: ${err.message || '未知错误'}`);
    } finally {
      setIsCreatingBucket(false);
    }
  };

  useEffect(() => {
    if (autoRenderCover && htmlTemplateFile?.content && htmlPreviewRef.current) {
      setHtmlRendering(true);
      
      htmlPreviewRef.current.innerHTML = htmlTemplateFile.content;
      
      setTimeout(() => {
        try {
          if (htmlPreviewRef.current) {
            setHtmlRendering(false);
          }
        } catch (error) {
          console.error("HTML预览渲染错误:", error);
          setHtmlRendering(false);
        }
      }, 500);
    }
  }, [htmlTemplateFile, autoRenderCover]);

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (storageChecking || isCreatingBucket) {
      toast.error("存储服务检查中，请稍后再试");
      return;
    }
    
    if (!storageBucketExists) {
      toast.error("存储服务不可用，请点击刷新按钮或选择自动渲染选项");
      return;
    }
    
    setUploadError(null);
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
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setHtmlTemplateFile({
        file,
        name: file.name,
        type: file.type,
        content: content
      });
      
      console.log("HTML template file content loaded:", content.substring(0, 100) + "...");
      toast.success("HTML模板文件上传成功");
    };
    
    reader.readAsText(file);
  };

  const removeFile = (index: number) => {
    setTemplateFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const removeHtmlTemplate = () => {
    setHtmlTemplateFile(null);
  };

  const toggleAutoRenderCover = (checked: boolean) => {
    setAutoRenderCover(checked);
    form.setValue("autoRenderCover", checked);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!coverImage && !autoRenderCover) {
      toast.error("请上传封面图或选择自动渲染");
      return;
    }
    
    if (autoRenderCover && !htmlTemplateFile) {
      toast.error("选择自动渲染封面图时，请上传HTML模板文件");
      return;
    }
    
    if (templateFiles.length === 0 && !htmlTemplateFile) {
      toast.error("请上传至少一个模板文件");
      return;
    }
    
    setIsSubmitting(true);
    setUploadError(null);
    
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      
      console.log("Current user status:", userId ? "已登录" : "匿名用户");

      let coverImageUrl = "";
      
      if (coverImage && storageBucketExists) {
        const timestamp = Date.now();
        const sanitizedFilename = coverImage.name.replace(/\s+/g, '_');
        const userFolder = userId || 'anonymous';
        const filePath = `${userFolder}/${timestamp}_${sanitizedFilename}`;
        
        console.log("Attempting to upload cover image to:", filePath);
        
        try {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, coverImage.file, {
              cacheControl: '3600',
              upsert: false
            });
            
          if (uploadError) {
            console.error("Error uploading cover image:", uploadError);
            setUploadError(`封面图上传失败: ${uploadError.message || '未知错误'}`);
            toast.error(`封面图上传失败: ${uploadError.message || '未知错误'}`);
            setIsSubmitting(false);
            return;
          }
          
          console.log("Cover image uploaded successfully:", uploadData);
          
          const { data: urlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);
            
          coverImageUrl = urlData.publicUrl;
          console.log("Cover image public URL:", coverImageUrl);
        } catch (err: any) {
          console.error("Exception during cover image upload:", err);
          setUploadError(`上传过程中发生错误: ${err.message || '未知错误'}`);
          toast.error(`上传过程中发生错误: ${err.message || '未知错误'}`);
          setIsSubmitting(false);
          return;
        }
      } else if (autoRenderCover && htmlPreviewRef.current) {
        coverImageUrl = "https://images.unsplash.com/photo-1721322800607-8c38375eef04";
      }
      
      const { data: template, error } = await saveTemplate({
        title: data.title,
        description: data.description || "",
        image_url: coverImageUrl,
        content: htmlTemplateFile?.content || "",
        user_id: userId || null,
        is_public: true
      });
      
      if (error) {
        console.error("Error saving template:", error);
        toast.error(`模板保存失败: ${error.message || '请重试'}`);
        setIsSubmitting(false);
        return;
      }
      
      console.log("Template created successfully:", template);
      toast.success("模板提交成功");
      navigate('/inspiration');
      
    } catch (error: any) {
      console.error("Template submission error:", error);
      toast.error(error.message || "模板提交失败，请重试");
      setIsSubmitting(false);
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
          
          {storageChecking ? (
            <Alert className="mb-6">
              <Skeleton className="h-5 w-5" />
              <AlertTitle>正在检查存储服务状态...</AlertTitle>
              <AlertDescription>
                <Skeleton className="h-4 w-full my-2" />
                <Skeleton className="h-4 w-3/4" />
              </AlertDescription>
            </Alert>
          ) : uploadError ? (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>上传错误</AlertTitle>
              <AlertDescription className="space-y-2">
                <p>{uploadError}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={verifyStorageBucket}
                    disabled={storageChecking || isCreatingBucket}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${storageChecking ? 'animate-spin' : ''}`} />
                    刷新检查
                  </Button>
                  
                  {!storageBucketExists && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={createStorageBucket}
                      disabled={storageChecking || isCreatingBucket}
                    >
                      {isCreatingBucket ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          创建中...
                        </>
                      ) : (
                        <>尝试创建存储桶</>
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-xs mt-2">
                  {storageBucketExists === false 
                    ? "存储服务不可用。建议选择自动渲染选项，或稍后再试" 
                    : "请确保存储服务正常，或稍后再试"}
                </p>
              </AlertDescription>
            </Alert>
          ) : null}
          
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
                        className="nova-text-input w-full min-h-[120px] resize-y"
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
                <label className="block text-sm font-medium text-nova-gray mb-2">HTML模板文件</label>
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
                      <p className="text-xs text-nova-gray">支持 HTML 或包含HTML代码的 TXT 文件，用于生成封面图</p>
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
                
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox 
                    id="autoRenderCover" 
                    checked={autoRenderCover}
                    onCheckedChange={toggleAutoRenderCover}
                  />
                  <label 
                    htmlFor="autoRenderCover" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    帮我渲染封面图
                  </label>
                </div>
                <div className="text-xs text-nova-gray italic mb-4">
                  选择此���项后，将根据HTML代码渲染封面图
                  {!storageBucketExists ? " （推荐，因为存储服务暂不可用）" : ""}
                </div>
                
                {autoRenderCover && htmlTemplateFile?.content && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-nova-gray mb-2">HTML预览</label>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {htmlRendering ? (
                        <div className="p-4">
                          <Skeleton className="h-24 w-full mb-2" />
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-6 w-1/2" />
                        </div>
                      ) : (
                        <div 
                          ref={htmlPreviewRef} 
                          className="p-4 w-full h-64 overflow-auto bg-white"
                          style={{ resize: 'vertical' }}
                        ></div>
                      )}
                    </div>
                    <p className="text-xs text-nova-gray mt-2">这是上传HTML的渲染预览，将用作封面图</p>
                  </div>
                )}
              </div>
              
              <div className={autoRenderCover ? 'opacity-50 pointer-events-none' : ''}>
                <label className="block text-sm font-medium text-nova-gray mb-2">
                  上传封面图 {!autoRenderCover && "(可选)"} 
                  {storageChecking && " (检查存储服务中...)"}
                </label>
                <div 
                  className={`border-2 border-dashed ${coverImage ? 'border-nova-blue' : 'border-gray-200'} rounded-lg p-8 text-center hover:border-nova-blue transition-colors cursor-pointer ${!storageBucketExists && !autoRenderCover ? 'opacity-70' : ''} ${storageChecking ? 'animate-pulse' : ''}`}
                  onClick={() => {
                    if (storageChecking) {
                      toast.error("存储服务检查中，请稍后再试");
                      return;
                    }
                    if (!storageBucketExists && !autoRenderCover) {
                      toast.error("存储服务暂不可用，请使用自动渲染选项");
                      return;
                    }
                    document.getElementById('coverImageInput')?.click();
                  }}
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
                      {!storageBucketExists && !autoRenderCover && !storageChecking && (
                        <p className="mt-2 text-xs text-red-500 font-medium">
                          存储服务暂不可用，请考虑使用自动渲染选项
                        </p>
                      )}
                      {storageChecking && (
                        <p className="mt-2 text-xs text-blue-500 font-medium">
                          正在检查存储服务状态...
                        </p>
                      )}
                    </>
                  )}
                  <input
                    id="coverImageInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    disabled={!storageBucketExists && !autoRenderCover || storageChecking}
                  />
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
                  disabled={isSubmitting || storageChecking}
                >
                  {isSubmitting ? '提交中...' : (storageChecking ? '检查存储中...' : '提交审核')}
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
