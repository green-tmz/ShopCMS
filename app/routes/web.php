<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LoginController as AdminLoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::namespace('Admin')->name('admin.')->prefix('admin')
    ->group(function () {
        Route::get('/login', [AdminLoginController::class, 'login']);
        Route::post('/login', [AdminLoginController::class, 'postLogin']);
});

Route::middleware(['user-access:admin'])->namespace('Admin')
    ->name('admin.')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index']);
        Route::get('/products', [AdminController::class, 'index']);
        Route::get('/products/add', [AdminController::class, 'index']);
        Route::get('/products/{id}', [AdminController::class, 'index']);
});

Route::middleware(['auth', 'user-access:user'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'index']);
});

Route::get('{any}', [HomeController::class, 'index'])->where('any', '.*')
->name('welcome');

Auth::routes();

// Route::get('/home', [HomeController::class, 'index'])->name('home');
