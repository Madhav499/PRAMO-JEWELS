<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\VerifyOtpRequest;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use App\Repositories\UserRepository;
use App\Traits\SendsJsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;

class AuthController extends Controller
{
    use SendsJsonResponse;

    protected AuthService $authService;
    protected UserRepository $userRepository;

    public function __construct(AuthService $authService, UserRepository $userRepository)
    {
        $this->authService = $authService;
        $this->userRepository = $userRepository;
    }

    /**
     * POST /api/v1/auth/register
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->register($request->validated());
            $user = $result['user'];
            $otp = $result['otp'];

            $data = [
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'status' => $user->status,
                ]
            ];

            // Attach simulated OTP inside a _simulation wrapper if simulation is enabled
            if (env('OTP_SIMULATION', false)) {
                $data['_simulation'] = [
                    'otp_code' => $otp
                ];
            }

            return $this->sendResponse(
                $data,
                'Registration successful. Please verify the OTP sent to your email.',
                201
            );
        } catch (Exception $e) {
            Log::error("Registration error: " . $e->getMessage());
            return $this->sendError('Failed to register customer.', [$e->getMessage()], 500);
        }
    }

    /**
     * POST /api/v1/auth/verify-otp
     */
    public function verifyOtp(VerifyOtpRequest $request): JsonResponse
    {
        try {
            $email = $request->input('email');
            $code = $request->input('code');

            $verified = $this->authService->verifyRegisterOtp($email, $code);

            if (!$verified) {
                return $this->sendError('Invalid or expired OTP code.', null, 422);
            }

            return $this->sendResponse(null, 'Account verified successfully. You can now log in.');
        } catch (Exception $e) {
            Log::error("OTP verification error: " . $e->getMessage());
            return $this->sendError('Verification failed.', [$e->getMessage()], 500);
        }
    }

    /**
     * POST /api/v1/auth/login
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $user = $this->userRepository->findByEmail($request->input('email'));

            if (!$user || !Hash::check($request->input('password'), $user->password)) {
                return $this->sendError('Invalid login credentials.', null, 401);
            }

            if (!$user->isActive()) {
                return $this->sendError('Your account is not active. Please verify your OTP code.', null, 403);
            }

            // Create Sanctum personal access token
            $token = $user->createToken('auth-token')->plainTextToken;

            return $this->sendResponse([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role ? $user->role->name : 'Customer',
                ]
            ], 'Login successful.');
        } catch (Exception $e) {
            Log::error("Login error: " . $e->getMessage());
            return $this->sendError('Authentication failed.', [$e->getMessage()], 500);
        }
    }

    /**
     * POST /api/v1/auth/logout (auth:sanctum protected)
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // Revoke current user token
            $request->user()->currentAccessToken()->delete();

            return $this->sendResponse(null, 'Logged out successfully.');
        } catch (Exception $e) {
            Log::error("Logout error: " . $e->getMessage());
            return $this->sendError('Logout failed.', [$e->getMessage()], 500);
        }
    }

    /**
     * GET /api/v1/auth/me (auth:sanctum protected)
     */
    public function me(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            return $this->sendResponse([
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->role ? $user->role->name : 'Customer',
                'status' => $user->status,
            ], 'Authenticated profile retrieved.');
        } catch (Exception $e) {
            return $this->sendError('Failed to fetch profile.', [$e->getMessage()], 500);
        }
    }
}
