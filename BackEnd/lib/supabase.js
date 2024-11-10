// backend/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://frjddntilpbemgetzbbg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyamRkbnRpbHBiZW1nZXR6YmJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3ODg2ODMsImV4cCI6MjA0NjM2NDY4M30.21Ua6jx5DBmmkkjrEjWjVVzDgBJim-yYhtEoLVulhaU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
