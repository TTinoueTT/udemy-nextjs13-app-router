'use client';
import useStore from '../../../store';

const TestCountClient = () => {
    const count = useStore((state) => state.count);
    return <div>{count}</div>;
};

export default TestCountClient;
