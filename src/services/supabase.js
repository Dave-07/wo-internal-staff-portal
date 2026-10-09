import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://htwpknkatukzinocimhs.supabase.co";
const supabaseKey = "sb_publishable_X4TdAPttOj082trnUoKhmA_-MImsJO0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
