<?php

namespace App\Services;

use App\Repositories\OtpRepository;
use App\Models\Otp;
use Illuminate\Support\Facades\Log;

class OtpService
{
    protected OtpRepository $otpRepository;

    public function __construct(OtpRepository $otpRepository)
    {
        $this->otpRepository = $otpRepository;
    }

    /**
     * Generate and "send" (simulate) an OTP.
     */
    public function sendOtp(string $emailOrPhone): string
    {
        // 1. Invalidate any active previous OTPs
        $this->otpRepository->invalidatePreviousOtps($emailOrPhone);

        // 2. Generate a random 6-digit OTP code
        $code = (string) mt_rand(100000, 999999);

        // For absolute testing simplicity, if env is local we can keep it dynamic, or let it fall back
        // 3. Save the new OTP in database
        $this->otpRepository->create([
            'email_or_phone' => $emailOrPhone,
            'code' => $code, // Plain string in database for simulation simplicity
            'expires_at' => now()->addMinutes(10),
        ]);

        // 4. Log the simulated OTP code
        Log::info("Simulated OTP generated for {$emailOrPhone}: {$code}");

        return $code;
    }

    /**
     * Verify an OTP.
     */
    public function verifyOtp(string $emailOrPhone, string $code): bool
    {
        // Developer static bypass code in local simulation
        if (config('app.env') === 'local' && $code === '123456') {
            return true;
        }

        $otp = $this->otpRepository->findValidOtp($emailOrPhone, $code);

        if (!$otp) {
            return false;
        }

        $this->otpRepository->markAsVerified($otp);
        return true;
    }
}
