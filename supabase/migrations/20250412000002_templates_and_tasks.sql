
-- Create templates table
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  is_public BOOLEAN DEFAULT true
);

-- Create brand tasks table
CREATE TABLE public.brand_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,
  category TEXT,
  brief TEXT NOT NULL,
  description TEXT,
  budget TEXT,
  platform TEXT,
  reward TEXT,
  type TEXT,
  progress INTEGER DEFAULT 0,
  participants INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trending topics table
CREATE TABLE public.trending_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  hot INTEGER DEFAULT 0,
  match INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trending_topics ENABLE ROW LEVEL SECURITY;

-- Create policies for templates
CREATE POLICY "Public templates are viewable by everyone" 
  ON public.templates FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Users can view their own templates" 
  ON public.templates FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates" 
  ON public.templates FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" 
  ON public.templates FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" 
  ON public.templates FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for brand tasks
CREATE POLICY "Brand tasks are viewable by everyone" 
  ON public.brand_tasks FOR SELECT 
  USING (true);

-- Create policies for trending topics
CREATE POLICY "Trending topics are viewable by everyone" 
  ON public.trending_topics FOR SELECT 
  USING (true);

-- Create a storage bucket for template images
INSERT INTO storage.buckets (id, name, public)
VALUES ('template-images', 'template-images', true);

-- Set up public access policy for the template images bucket
CREATE POLICY "Template images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'template-images');

-- Allow authenticated users to upload template images
CREATE POLICY "Users can upload template images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'template-images' AND
    auth.uid() IS NOT NULL
  );

-- Allow users to update their own template images
CREATE POLICY "Users can update their own template images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'template-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own template images
CREATE POLICY "Users can delete their own template images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'template-images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
