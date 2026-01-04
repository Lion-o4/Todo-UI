import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://supabase.com',
  'backened server 2'
);
