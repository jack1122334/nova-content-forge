
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(query.get("tab") || "login");

  useEffect(() => {
    const tab = query.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [query]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up with email and password
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Upload avatar if provided
        if (avatar) {
          const fileExt = avatar.name.split('.').pop();
          const fileName = `${data.user.id}/${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, avatar);

          if (uploadError) {
            console.error("Error uploading avatar:", uploadError);
            toast.error("头像上传失败，但账号已创建");
          } else {
            // Get avatar URL
            const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
            
            // Update profile with avatar URL and phone
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ 
                avatar_url: urlData.publicUrl,
                phone 
              })
              .eq('id', data.user.id);

            if (updateError) {
              console.error("Error updating profile:", updateError);
            }
          }
        } else {
          // Just update phone if no avatar
          if (phone) {
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ phone })
              .eq('id', data.user.id);

            if (updateError) {
              console.error("Error updating profile:", updateError);
            }
          }
        }

        toast.success("注册成功！");
        navigate("/");
      }
    } catch (error: any) {
      if (error.message.includes('already registered')) {
        toast.error("邮箱已被注册，请直接登录或使用其他邮箱");
      } else {
        toast.error(error.message || "注册失败");
      }
      console.error("Error during sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("登录成功！");
      navigate("/");
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        toast.error("邮箱或密码错误，请重试");
      } else {
        toast.error(error.message || "登录失败");
      }
      console.error("Error during sign in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-center text-nova-dark-gray mb-6">Nova 创作平台</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nova-dark-gray mb-1">
                  邮箱
                </label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="请输入邮箱"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-nova-dark-gray mb-1">
                  密码
                </label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="请输入密码"
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full nova-button"
                disabled={loading}
              >
                {loading ? "登录中..." : "登录"}
              </Button>
              
              <div className="text-center pt-2">
                <Button 
                  variant="link" 
                  onClick={() => navigate("/")}
                  className="text-nova-blue"
                >
                  暂不登录，继续访问
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={avatarPreview || ""} />
                    <AvatarFallback className="bg-nova-light-gray text-nova-dark-gray">
                      {avatarPreview ? "" : <Upload className="w-8 h-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <input
                    type="file"
                    id="avatar"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="absolute bottom-0 right-0 bg-nova-blue text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <Upload className="w-3 h-3" />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-nova-dark-gray mb-1">
                  邮箱
                </label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="请输入邮箱"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-nova-dark-gray mb-1">
                  密码
                </label>
                <Input 
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="请输入密码"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-nova-dark-gray mb-1">
                  昵称
                </label>
                <Input 
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="请输入昵称"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-nova-dark-gray mb-1">
                  手机号
                </label>
                <Input 
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="请输入手机号（选填）"
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full nova-button"
                disabled={loading}
              >
                {loading ? "注册中..." : "注册"}
              </Button>
              
              <div className="text-center pt-2">
                <Button 
                  variant="link" 
                  onClick={() => navigate("/")}
                  className="text-nova-blue"
                >
                  暂不注册，继续访问
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
