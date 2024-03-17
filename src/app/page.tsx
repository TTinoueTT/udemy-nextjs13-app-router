// import Image from 'next/image';
import { Suspense } from 'react';
import SpinnerServer from '@/components/servers/spinner-server';
import NotesListServer from '@/components/servers/notes-list-server';
import TimerCounterClient from '../components/client/timer-counter-client';
import RefreshBtnClient from '@/components/client/refresh-btn-client';

export default function Home() {
    return (
        <main>
            <div className="m-10 text-center">
                <p>Hello World🚀</p>
                <Suspense fallback={<SpinnerServer color="border-green-500" />}>
                    <NotesListServer />
                </Suspense>
                <TimerCounterClient />
                <RefreshBtnClient />
            </div>
        </main>
    );
}
