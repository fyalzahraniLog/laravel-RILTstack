import { Head, router, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useRef } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/file-upload';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Album } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Albums', href: '/albums' },
    { title: 'Edit', href: '' },
];

export default function Edit({ album }: { album: Album }) {
    const albumNameRef = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing, progress } =
        useForm({
            name: album.name,
            media: [] as File[],
            _method: 'PUT',
        });

    const editAlbum: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/albums/${album.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset('media'),
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                    albumNameRef.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Album: ${album.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={editAlbum} className="space-y-6">
                    <Card>
                        <CardContent className="space-y-6 pt-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Album Name *</Label>
                                <Input
                                    id="name"
                                    ref={albumNameRef}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Replace Album Images (Will overwrite existing)</Label>
                                <FileUpload
                                    files={data.media}
                                    onFilesChange={(files) => setData('media', files)}
                                    disabled={processing}
                                />
                                {progress && (
                                    <progress value={progress.percentage} max="100" className="w-full">
                                        {progress.percentage}%
                                    </progress>
                                )}
                                <InputError message={errors.media as string} />

                                {album.mediaFiles && album.mediaFiles.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 mb-2">Current Images:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {album.mediaFiles.map((mediaFile) => (
                                                <a key={mediaFile.id} href={mediaFile.original_url} target="_blank" rel="noreferrer">
                                                    <img
                                                        src={mediaFile.original_url}
                                                        alt={album.name}
                                                        className="h-32 w-32 object-cover rounded shadow-sm border"
                                                    />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing}>Update Album</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
