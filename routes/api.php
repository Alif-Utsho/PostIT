<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ConnectionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReactController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/signout', [AuthController::class, 'signout']);


// Post routes
Route::get('/posts', [PostController::class, 'posts']);
Route::post('/createpost', [PostController::class, 'createPost']);
Route::put('/deletepost', [PostController::class, 'deletePost']);
Route::put('/editpost', [PostController::class, 'editPost']);

// Connection routes
Route::get('/users', [ConnectionController::class, 'users']);
Route::post('/addfriend', [ConnectionController::class, 'addFriend']);
Route::get('/connection', [ConnectionController::class, 'connection']);
Route::put('/confirmrequest', [ConnectionController::class, 'confirmRequest']);
Route::put('/cancelrequest', [ConnectionController::class, 'cancelRequest']);
Route::put('/unfriend', [ConnectionController::class, 'unfriend']);

// User and Profile routes
Route::get('/profile/{id}', [UserController::class, 'singleUser']);
Route::put('/editprofile', [UserController::class, 'editprofile']);


// React routes
Route::get('/reacts/{post_id}', [ReactController::class, 'reacts']);
Route::post('/like', [ReactController::class, 'like']);
Route::put('/unlike', [ReactController::class, 'unlike']);