import { createClient } from '@supabase/supabase-js';
import useAuthUser from "src/composables/UserAuthUser";

const supabaseUrl = "https://okedjwqepxamvqekrqwp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZWRqd3FlcHhhbXZxZWtycXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE4MDM5MjQsImV4cCI6MTk2NzM3OTkyNH0.UQTiEZMnyazuNIGoipNyOxE_hgVnrnxkGQZgCFCwIBU";
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null; // se user.value <> null, atualize.
});

//console.log('Init Supabase: ', supabase);

export default function useSupabase() {
  return { supabase };
}
