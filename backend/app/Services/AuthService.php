<?php

namespace App\Services;

use App\Repositories\UserRepository;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthService
{
    protected UserRepository $userRepository;
    protected OtpService $otpService;

    public function __construct(UserRepository $userRepository, OtpService $otpService)
    {
        $this->userRepository = $userRepository;
        $this->otpService = $otpService;
    }

    /**
     * Register a new customer in an inactive state and trigger OTP.
     */
    public function register(array $data): array
    {
        // 1. Resolve the default Customer role
        $customerRole = Role::where('name', 'Customer')->first();
        if (!$customerRole) {
            throw new Exception("Default 'Customer' role not configured in the database.");
        }

        // 2. Prepare user data
        $userData = [
            'role_id' => $customerRole->id,
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'password' => Hash::make($data['password']),
            'status' => 'inactive',
        ];

        // 3. Create the user record
        $user = $this->userRepository->create($userData);

        // 4. Send/log simulation OTP to email
        $simulatedOtp = $this->otpService->sendOtp($user->email);

        return [
            'user' => $user,
            'otp' => $simulatedOtp,
        ];
    }

    /**
     * Confirm a registration via OTP and activate the user.
     */
    public function verifyRegisterOtp(string $email, string $code): bool
    {
        // 1. Verify code
        $isValid = $this->otpService->verifyOtp($email, $code);
        if (!$isValid) {
            return false;
        }

        // 2. Activate user
        $user = $this->userRepository->findByEmail($email);
        if ($user) {
            $user->update([
                'status' => 'active',
                'email_verified_at' => now(),
            ]);
            return true;
        }

        return false;
    }
}
