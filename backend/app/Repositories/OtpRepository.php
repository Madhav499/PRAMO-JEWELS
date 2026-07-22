<?php

namespace App\Repositories;

use App\Models\Otp;

class OtpRepository
{
    /**
     * Create a new OTP record.
     */
    public function create(array $data): Otp
    {
        return Otp::create($data);
    }

    /**
     * Find a valid, unverified, unexpired OTP code.
     */
    public function findValidOtp(string $emailOrPhone, string $code): ?Otp
    {
        return Otp::where('email_or_phone', $emailOrPhone)
            ->where('code', $code)
            ->whereNull('verified_at')
            ->where('expires_at', '>', now())
            ->latest()
            ->first();
    }

    /**
     * Mark an OTP as verified.
     */
    public function markAsVerified(Otp $otp): bool
    {
        return $otp->update(['verified_at' => now()]);
    }

    /**
     * Invalidate all existing unverified OTPs for an identifier.
     */
    public function invalidatePreviousOtps(string $emailOrPhone): void
    {
        Otp::where('email_or_phone', $emailOrPhone)
            ->whereNull('verified_at')
            ->update(['expires_at' => now()]);
    }
}
