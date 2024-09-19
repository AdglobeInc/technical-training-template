<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// 認証前でも実行可能なAPI
Route::post('/users', [AuthController::class, 'register'])->name('users.register');
Route::post('/auth', [AuthController::class, 'login'])->name('auth.login');

// 実行には認証情報が必要なAPI
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/auth', [AuthController::class, 'user'])->name('auth.user');
    Route::delete('/auth', [AuthController::class, 'logout'])->name('auth.logout');
});
