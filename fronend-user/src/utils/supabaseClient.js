import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mqlyxvahrgewsosffxft.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbHl4dmFocmdld3Nvc2ZmeGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDYyNTcsImV4cCI6MjA5MzYyMjI1N30.liA-ARjBxbRPb-ov2w8hn4eSaOfgtLMxSkrzNuFdxWU";

export const supabase = createClient(supabaseUrl, supabaseKey);
