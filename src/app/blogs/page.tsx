import RouterBtnClient from '@/components/client/router-btn-client';

export default function BlogPage() {
    return (
        <div className="m-10 text-center">
            <span className="text-lg">
                Click a title on the left to view detail 🚀
            </span>
            <div className="my-5 flex justify-center">
                <RouterBtnClient />
            </div>
        </div>
    );
}
