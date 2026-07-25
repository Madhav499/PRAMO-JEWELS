<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PramoJewelsSeeder extends Seeder
{
    public function run(): void
    {
        // Seed Admin User
        User::create([
            'first_name' => 'Maharaja',
            'last_name' => 'Pramo',
            'email' => 'admin@pramojewels.com',
            'phone' => '+91 98765 43210',
            'password' => Hash::make('PramoJewels#2026!'),
            'role' => 'ADMIN',
        ]);

        // Seed Initial Live Metal Spot Rates
        DB::table('metal_rates')->insert([
            'gold_24k' => 7850.00,
            'gold_22k' => 7200.00,
            'gold_18k' => 5900.00,
            'platinum' => 3450.00,
            'silver_999' => 94.00,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Seed Masterpiece Products
        Product::create([
            'sku' => 'PJ-RNG-LOTUS-01',
            'name' => 'Royal Lotus Solitaire Diamond Ring',
            'category' => 'RINGS',
            'metal_type' => '22K_GOLD',
            'purity' => '22K (916 BIS Hallmarked)',
            'metal_weight_gram' => 6.8,
            'making_charge_per_gram' => 650.00,
            'gemstone_cost' => 45000.00,
            'base_price' => 98420.00,
            'stock_status' => 'IN_STOCK',
            'stock_quantity' => 12,
            'description' => 'Iconic heritage ring featuring a 1.2-carat solitaire held by six intricate lotus-petaled gold prongs.',
            'huid_verified' => true,
            'certificate_type' => 'IGI',
            'certificate_number' => 'IGI-IND-2026-88912',
            'images' => [
                'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
            ],
            'rating' => 4.9,
            'review_count' => 38,
            'is_bestseller' => true,
            'is_new_arrival' => true,
            'featured_collection' => 'Royal Heritage',
        ]);
    }
}
