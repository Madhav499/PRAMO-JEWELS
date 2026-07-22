<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Find a user by ID.
     */
    public function find(int $id): ?User
    {
        return User::with('role')->find($id);
    }

    /**
     * Find a user by email.
     */
    public function findByEmail(string $email): ?User
    {
        return User::with('role')->where('email', $email)->first();
    }

    /**
     * Find a user by phone.
     */
    public function findByPhone(string $phone): ?User
    {
        return User::with('role')->where('phone', $phone)->first();
    }

    /**
     * Find a user by email or phone.
     */
    public function findByEmailOrPhone(string $identifier): ?User
    {
        return User::with('role')
            ->where('email', $identifier)
            ->orWhere('phone', $identifier)
            ->first();
    }

    /**
     * Create a new user.
     */
    public function create(array $data): User
    {
        return User::create($data);
    }

    /**
     * Update a user's status.
     */
    public function updateStatus(User $user, string $status): bool
    {
        return $user->update(['status' => $status]);
    }
}
