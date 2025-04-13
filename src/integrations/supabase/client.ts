
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ldljobamskuimpufpkpk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkbGpvYmFtc2t1aW1wdWZwa3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzOTQ1MDQsImV4cCI6MjA1OTk3MDUwNH0.eVnNpTeZah3dD4-YymVXyVagKRgUbSEkSJkwxGaCR20";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Custom type definition to work around type issues until types.ts is updated
type CustomDatabase = Database & {
  public: {
    Tables: {
      brand_tasks: {
        Row: {
          id: string;
          brand: string;
          category: string | null;
          brief: string;
          description: string | null;
          budget: string | null;
          platform: string | null;
          reward: string | null;
          type: string | null;
          progress: number | null;
          participants: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      templates: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          content: string | null;
          created_at: string | null;
          updated_at: string | null;
          user_id: string | null;
          is_public: boolean | null;
        };
      };
      trending_topics: {
        Row: {
          id: string;
          title: string;
          hot: number | null;
          match: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
    };
  };
};

export const supabase = createClient<CustomDatabase>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
