import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { format } from 'date-fns';
import type { Database } from '../../../../../database.types';

type PageProps = {
    params: {
        todoId: string;
    };
};

export default async function TodoDetailPage({ params }: PageProps) {
    const cookieStore = cookies();
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    const { data: todo, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', params.todoId)
        .single();

    // console.log(supabase);

    if (!todo) return notFound();

    return (
        <div className="mt-16 p-8">
            <p>Task ID: {todo!.id}</p>
            <p>Title: {todo!.title}</p>
            <p>Status: {todo!.completed ? 'done' : 'not yet'}</p>
            <p>
                Created at:{' '}
                {todo! &&
                    format(new Date(todo!.created_at), 'yyyy-MM-dd HH:mm:ss')}
            </p>
        </div>
    );
}
