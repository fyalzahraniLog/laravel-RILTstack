import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { TablePagination } from '@/components/table-pagination';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PaginatedResponse, Album } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Albums', href: '/albums' },
];

export default function Index({
    albums,
}: {
    albums: PaginatedResponse<Album>;
}) {
    const deleteAlbum = (album: Album) => {
        if (confirm('Are you sure you want to delete this album?')) {
            router.delete(`/albums/${album.id}`);
            toast.success('Album deleted successfully');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Albums" />
            <div className={'mt-8'}>
                <div className={'flex flex-row gap-x-4 mb-4'}>
                    <Link
                        className={buttonVariants({ variant: 'default' })}
                        href="/albums/create"
                    >
                        Create Album
                    </Link>
                </div>

                {albums.data.length === 0 && albums.current_page === 1 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 mt-8">
                        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">No albums</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new album.</p>
                        <div className="mt-6">
                            <Link
                                className={buttonVariants({ variant: 'default', size: 'lg' })}
                                href="/albums/create"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                                Create Album
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <Table className={'mt-4'}>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead className="w-[150px] text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {albums.data.map((album: Album) => (
                                    <TableRow key={album.id}>
                                        <TableCell>
                                            {!album.mediaFiles || album.mediaFiles.length === 0 ? (
                                                <span className="text-gray-400 text-sm">No images</span>
                                            ) : (
                                                <div className="flex gap-x-1 relative w-max">
                                                    <a href={album.mediaFiles[0].original_url} target="_blank" rel="noreferrer">
                                                        <img
                                                            src={album.mediaFiles[0].original_url}
                                                            alt={album.name}
                                                            className={'h-12 w-12 object-cover rounded shadow-sm'}
                                                        />
                                                    </a>
                                                    {album.mediaFiles.length > 1 && (
                                                        <span className="absolute -bottom-2 -right-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200 shadow-sm border border-blue-200 dark:border-blue-800">
                                                            +{album.mediaFiles.length - 1}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium text-lg">{album.name}</TableCell>
                                        <TableCell className="flex flex-row gap-x-2 justify-end">
                                            <Link
                                                className={buttonVariants({ variant: 'outline', size: 'sm' })}
                                                href={`/albums/${album.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                            <Button
                                                variant={'destructive'}
                                                size="sm"
                                                onClick={() => deleteAlbum(album)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination resource={albums} />
                    </>
                )}
            </div>
        </AppLayout>
    );
}
