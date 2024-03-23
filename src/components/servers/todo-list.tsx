import { headers, cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { Database } from '../../../database.types';
import TodoItem from '@/components/client/todo-item';

export default async function TodoList() {
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
    const { data: todos } = await supabase
        .from('todos')
        .select()
        .order('created_at', { ascending: true });
    return (
        <ul className="my-6 mx-3">
            {todos?.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </ul>
    );
}
