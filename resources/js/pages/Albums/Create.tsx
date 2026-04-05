import { Head, useForm } from '@inertiajs/react';
import type { FormEventHandler } from 'react';
import { useRef } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/file-upload';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Albums', href: '/albums' },
    { title: 'Create', href: '/albums/create' },
];

export default function Create() {
    const { data, setData, errors, post, reset, processing, progress } =
        useForm({
            name: '',
            media: [] as File[],
        });
    const albumNameRef = useRef<HTMLInputElement>(null);

    const createAlbum: FormEventHandler = (e) => {
        e.preventDefault();

        post('/albums', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset(),
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
            <Head title="Create Album" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={createAlbum} className="space-y-6">
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
                                <Label>Album Images</Label>
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
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button disabled={processing}>Create Album</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
