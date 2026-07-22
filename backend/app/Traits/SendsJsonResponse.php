<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait SendsJsonResponse
{
    /**
     * Send a successful JSON response.
     */
    protected function sendResponse(mixed $data, ?string $message = null, int $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'errors' => null,
        ], $code);
    }

    /**
     * Send an error JSON response.
     */
    protected function sendError(string $error, array|string|null $errorMessages = [], int $code = 404): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $error,
            'data' => null,
            'errors' => $errorMessages ?: null,
        ], $code);
    }
}
