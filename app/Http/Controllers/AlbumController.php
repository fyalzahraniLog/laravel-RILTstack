<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAlbumRequest;
use App\Http\Requests\UpdateAlbumRequest;
use App\Models\Album;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumController extends Controller
{
    public function index()
    {
        return Inertia::render('Albums/Index', [
            'albums' => Album::query()
                ->with(['media'])
                ->paginate(20)
                ->withQueryString(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Albums/Create');
    }

    public function store(StoreAlbumRequest $request)
    {
        $album = Album::create($request->validated());

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $album->addMedia($file)->toMediaCollection('media');
            }
        }

        return redirect()->route('albums.index');
    }

    public function edit(Album $album)
    {
        $album->load('media');
        $album->append('mediaFiles');

        return Inertia::render('Albums/Edit', [
            'album' => $album,
        ]);
    }

    public function update(UpdateAlbumRequest $request, Album $album)
    {
        $album->update($request->validated());

        if ($request->hasFile('media')) {
            $album->clearMediaCollection('media');
            foreach ($request->file('media') as $file) {
                $album->addMedia($file)->toMediaCollection('media');
            }
        }

        return redirect()->route('albums.index');
    }

    public function destroy(Album $album)
    {
        $album->delete();

        return redirect()->route('albums.index');
    }
}
