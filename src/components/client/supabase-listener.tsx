'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../utils/supabase';
import useStore from '../../../store';

/**
 *
 * @param {string} accessToken?
 * @returns
 */
export default function SupabaseListener({
    accessToken,
}: {
    accessToken?: string;
}) {
    const router = useRouter();
    const { updateLoginUser } = useStore(); // ログインユーザの updateLoginUser を取得

    useEffect(() => {
        const getUserInfo = async () => {
            // ブラウザに残っているセッション情報を取得
            const { data } = await supabase.auth.getSession();

            // セッションが取得できたら、ストアの状態を更新
            if (data.session) {
                updateLoginUser({
                    id: data.session?.user.id,
                    email: data.session?.user.email!,
                });
            }
        };

        getUserInfo();

        /*
         * ユーザのセッション情報の変化を監視してくれる処理
         * ログイン、ログアウトが行われるたびに、実行される
         */
        supabase.auth.onAuthStateChange((_, session) => {
            // ストアの状態を更新
            updateLoginUser({
                id: session?.user.id,
                email: session?.user.email!,
            });

            // セッションのトークン(クライアント)がアクセストークン(サーバ)と一致しなければ、
            // サーバコンポーネントを際実行する
            if (session?.access_token !== accessToken) {
                router.refresh();
            }
        });
    }, [accessToken, router, updateLoginUser]);
    return null;
}
