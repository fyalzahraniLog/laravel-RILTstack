<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Album extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'name',
    ];

    protected $appends = [
        'mediaFiles'
    ];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('media')
             ->useDisk('public');
    }

    public function getMediaFilesAttribute()
    {
        if ($this->relationLoaded('media')) {
            return $this->getMedia('media');
        }

        return [];
    }
}
