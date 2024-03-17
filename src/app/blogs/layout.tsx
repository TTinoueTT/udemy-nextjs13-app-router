import BlogListStaticServer from '@/app/components/servers/blog-list-static-server';
import RefreshBtnClient from '@/app/components/client/refresh-btn-client';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex">
            <aside className={`h-[calc(100vh-56px)] w-1/4 bg-gray-200 p-2`}>
                {/*@ts-ignore*/}
                <BlogListStaticServer />
                <div className="flex justify-center">
                    <RefreshBtnClient />
                </div>
            </aside>
            <main className="flex flex-1 justify-center">{children}</main>
        </section>
    );
}
