// supabase を利用するためにインスタンス化するメソッドを定義
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '../database.types';

export const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// export default createBrowserClient<Database>();
