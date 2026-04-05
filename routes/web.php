<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskCategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AlbumController;
use Inertia\Inertia;    

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', DashboardController::class)->name('dashboard');
 
    Route::resource('tasks', TaskController::class); 
    Route::resource('task-categories', TaskCategoryController::class); 
    Route::resource('albums', AlbumController::class);
});
  

require __DIR__.'/settings.php';
