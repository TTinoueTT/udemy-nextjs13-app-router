import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '../utils/supabase';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    console.log(supabase.auth);

    if (!session && req.nextUrl.pathname.startsWith('/auth/todo-crud')) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/auth';
        return NextResponse.redirect(redirectUrl);
    }
    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - 画像ファイルのパスを除外
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
            // 無視するリクエスト ↓
            missing: [
                { type: 'header', key: 'next-action' },
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
