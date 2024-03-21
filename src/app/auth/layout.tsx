import { headers, cookies } from 'next/headers';
import SupabaseListener from '@/components/client/supabase-listener';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Database } from '../../../database.types';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    //return cookie with the name 'name' here
                    return cookieStore.get(name)?.value;
                },
                // set(name, value, options) {
                //     //set the cookie
                //     if (serverComponent) return;
                //     return cookies().set(name, value, options);
                // },
                // remove(name, options) {
                //     //remove the cookie
                //     return cookies().set(name, '', options);
                // },
            },
        }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <>
            <SupabaseListener accessToken={session?.access_token} />
            {children}
        </>
    );
}
