import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const supabaseUrl = "https://fvtesyqawdrjokfwjpyv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2dGVzeXFhd2Ryam9rZndqcHl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0NjE3NzgsImV4cCI6MjA5NTAzNzc3OH0.TvR92xnufqTTKF839IbVIeJF9sAuhMp0ziGmMPoeLPI";


export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    realtime: {
      transport: ws,
    },
  }
);
