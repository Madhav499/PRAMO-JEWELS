<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Models\Otp;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed default roles
        Role::create(['name' => 'Customer', 'description' => 'Customer role']);
    }

    /**
     * Test successful registration.
     */
    public function test_customer_can_register_successfully(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'phone' => '+918888888888',
            'password' => 'SecurePass123!',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user' => [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                        'status',
                    ],
                ]
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'jane@example.com',
            'status' => 'inactive',
        ]);

        $this->assertDatabaseHas('otps', [
            'email_or_phone' => 'jane@example.com',
        ]);
    }

    /**
     * Test registration validation errors.
     */
    public function test_registration_requires_valid_data(): void
    {
        $response = $this->postJson('/api/v1/auth/register', [
            'first_name' => '',
            'last_name' => '',
            'email' => 'invalid-email',
            'password' => 'short', // Does not meet complex requirements
        ]);

        $response->assertStatus(422);
    }

    /**
     * Test successful OTP verification.
     */
    public function test_customer_can_verify_otp_and_activate(): void
    {
        // 1. Create inactive user
        $role = Role::where('name', 'Customer')->first();
        $user = User::create([
            'role_id' => $role->id,
            'first_name' => 'Jane',
            'last_name' => 'Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('SecurePass123!'),
            'status' => 'inactive',
        ]);

        // 2. Generate OTP
        $otp = Otp::create([
            'email_or_phone' => 'jane@example.com',
            'code' => '123456',
            'expires_at' => now()->addMinutes(10),
        ]);

        // 3. Verify OTP
        $response = $this->postJson('/api/v1/auth/verify-otp', [
            'email' => 'jane@example.com',
            'code' => '123456',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('users', [
            'email' => 'jane@example.com',
            'status' => 'active',
        ]);
    }

    /**
     * Test login verification.
     */
    public function test_user_can_login_only_after_activation(): void
    {
        $role = Role::where('name', 'Customer')->first();
        $user = User::create([
            'role_id' => $role->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('SecurePass123!'),
            'status' => 'inactive', // Inactive user
        ]);

        // 1. Attempt login as inactive user
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'john@example.com',
            'password' => 'SecurePass123!',
        ]);

        $response->assertStatus(403); // Forbidden

        // 2. Activate user
        $user->update(['status' => 'active']);

        // 3. Attempt login again
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'john@example.com',
            'password' => 'SecurePass123!',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'access_token',
                    'token_type',
                    'user' => [
                        'id',
                        'first_name',
                        'last_name',
                        'email',
                        'role',
                    ]
                ]
            ]);
    }

    /**
     * Test me query and logout.
     */
    public function test_authenticated_user_can_retrieve_profile_and_logout(): void
    {
        $role = Role::where('name', 'Customer')->first();
        $user = User::create([
            'role_id' => $role->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('SecurePass123!'),
            'status' => 'active',
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        // 1. Retrieve profile
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/v1/auth/me');

        $response->assertStatus(200)
            ->assertJsonPath('data.email', 'john@example.com');

        // 2. Logout
        $logoutResponse = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/v1/auth/logout');

        $logoutResponse->assertStatus(200);

        // Verify the token has been deleted from the database
        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}
