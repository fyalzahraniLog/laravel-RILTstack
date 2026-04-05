<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia; 
use Spatie\MediaLibrary\InteractsWithMedia; 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
 
class Task extends Model implements HasMedia 
{
    use HasFactory;
    use InteractsWithMedia;
 
    protected $fillable = [
        'name',
        'is_completed',
        'due_date'
    ];
    
    protected $appends = [
        'mediaFile'
    ];
 
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('media')
             ->useDisk('public');
    }
 
    public function getMediaFileAttribute()
    {
        if ($this->relationLoaded('media')) {
            return $this->getFirstMedia('media');
        }
 
        return null;
    }
 
    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
            'due_date' => 'date'
        ];
    }

    public function taskCategories(): BelongsToMany
{
    return $this->belongsToMany(TaskCategory::class);
}
}