<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\MetalRateController;

/*
|--------------------------------------------------------------------------
| Pramo Jewels REST API Routes (v1)
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // Public Authentication Endpoints
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Public Catalog & Metal Rates
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/metal-rates', [MetalRateController::class, 'latest']);

    // Protected Customer Routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/checkout', [OrderController::class, 'checkout']);
        Route::get('/orders', [OrderController::class, 'userOrders']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
    });

    // Admin Operations Routes
    Route::middleware(['auth:sanctum', 'role:ADMIN'])->prefix('admin')->group(function () {
        Route::get('/orders', [OrderController::class, 'adminIndex']);
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);
        Route::post('/metal-rates/override', [MetalRateController::class, 'override']);
    });

    // System Health Check
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'Pramo Jewels API is healthy and operational',
            'timestamp' => now()->toIso8601String(),
        ]);
    });
});
