import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vpztmbmvsakcsrcscicx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwenRtYm12c2FrY3NyY3NjaWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDI3MjYsImV4cCI6MjA4MjY3ODcyNn0.SnTGzh8S1BzMY3obk4wDXpZP78M18LC6sotGQsKlBF8'
);
