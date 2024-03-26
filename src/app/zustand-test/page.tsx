'use client';
import useStore from '../../../store';
import TestCountClient from '@/components/client/test-counter-client';

export default function ZustandTestPage() {
    const { count } = useStore();
    const increase = useStore((state) => state.increase);
    const decrease = useStore((state) => state.decrease);
    return (
        <section style={{ textAlign: 'center', margin: '1em' }}>
            <h1>Count</h1>
            <div>{count}</div>
            <TestCountClient />
            <div>
                <button onClick={() => increase()}>+</button>
                <button onClick={() => decrease()}>-</button>
            </div>
        </section>
    );
}
