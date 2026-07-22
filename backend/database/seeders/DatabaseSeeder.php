<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Roles
        $roles = [
            ['name' => 'Customer', 'description' => 'Browse and purchase jewellery, manage profile and orders'],
            ['name' => 'Support', 'description' => 'View customers and assist with orders/refunds'],
            ['name' => 'Inventory Manager', 'description' => 'Manage products, categories, and inventory stock'],
            ['name' => 'Admin', 'description' => 'Manage users, orders, coupons, and reports'],
            ['name' => 'Super Admin', 'description' => 'Full platform administration and security settings'],
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['name' => $r['name']], ['description' => $r['description']]);
        }

        $customerRole = Role::where('name', 'Customer')->first();
        $adminRole = Role::where('name', 'Admin')->first();

        // 2. Seed Default Accounts
        User::firstOrCreate(
            ['email' => 'admin@pramojewels.com'],
            [
                'role_id' => $adminRole->id,
                'first_name' => 'System',
                'last_name' => 'Administrator',
                'phone' => '+919999999999',
                'password' => Hash::make('PramoAdmin123!'),
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        User::firstOrCreate(
            ['email' => 'customer@pramojewels.com'],
            [
                'role_id' => $customerRole->id,
                'first_name' => 'John',
                'last_name' => 'Doe',
                'phone' => '+919876543210',
                'password' => Hash::make('PramoCustomer123!'),
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 3. Seed Categories
        $categoriesData = [
            ['name' => 'Rings', 'slug' => 'rings'],
            ['name' => 'Necklaces', 'slug' => 'necklaces'],
            ['name' => 'Earrings', 'slug' => 'earrings'],
            ['name' => 'Bracelets', 'slug' => 'bracelets'],
        ];

        $categories = [];
        foreach ($categoriesData as $c) {
            $categories[$c['slug']] = Category::firstOrCreate(
                ['slug' => $c['slug']],
                ['name' => $c['name'], 'status' => 'active']
            );
        }

        // 4. Seed Products and Inventory
        $productsData = [
            [
                'category_slug' => 'rings',
                'sku' => 'RNG-CL-YG18',
                'name' => '18K Yellow Gold Classic Band',
                'metal_type' => 'Gold',
                'purity' => '18K',
                'price' => 1250.00,
                'stock_status' => 'in_stock',
                'description' => 'A timeless, classic wedding band crafted from solid 18K yellow gold, featuring a comfortable polished inner profile.',
                'quantity' => 25,
            ],
            [
                'category_slug' => 'rings',
                'sku' => 'RNG-DI-SS925',
                'name' => '925 Sterling Silver Diamond Ring',
                'metal_type' => 'Silver',
                'purity' => '925 Sterling',
                'price' => 1800.00,
                'stock_status' => 'in_stock',
                'description' => 'Crafted in premium 925 sterling silver, this ring showcases a brilliant-cut center diamond surrounded by a micro-pave halo.',
                'quantity' => 10,
            ],
            [
                'category_slug' => 'necklaces',
                'sku' => 'NKL-PD-RG22',
                'name' => '22K Rose Gold Pendant Necklace',
                'metal_type' => 'Gold',
                'purity' => '22K',
                'price' => 3400.00,
                'stock_status' => 'in_stock',
                'description' => 'An elegant statement necklace featuring a hand-carved floral pendant in solid 22K rose gold on a matching delicate link chain.',
                'quantity' => 15,
            ],
            [
                'category_slug' => 'earrings',
                'sku' => 'EAR-HP-WG18',
                'name' => '18K White Gold Diamond Hoops',
                'metal_type' => 'Gold',
                'purity' => '18K',
                'price' => 2950.00,
                'stock_status' => 'in_stock',
                'description' => 'Modern hoop earrings in 18K white gold, encrusted with brilliant-cut diamonds inside and out for maximum radiance.',
                'quantity' => 8,
            ],
        ];

        foreach ($productsData as $p) {
            $category = $categories[$p['category_slug']];
            
            $product = Product::firstOrCreate(
                ['sku' => $p['sku']],
                [
                    'category_id' => $category->id,
                    'name' => $p['name'],
                    'metal_type' => $p['metal_type'],
                    'purity' => $p['purity'],
                    'price' => $p['price'],
                    'stock_status' => $p['stock_status'],
                    'description' => $p['description'],
                ]
            );

            Inventory::firstOrCreate(
                ['product_id' => $product->id],
                [
                    'quantity' => $p['quantity'],
                    'reserved_quantity' => 0,
                ]
            );
        }
    }
}
