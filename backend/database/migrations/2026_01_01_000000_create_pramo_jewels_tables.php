<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Users Table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->string('password');
            $table->enum('role', ['ADMIN', 'CUSTOMER', 'INVENTORY_MANAGER'])->default('CUSTOMER');
            $table->timestamps();
        });

        // Products Table
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('name');
            $table->string('category');
            $table->string('metal_type');
            $table->string('purity');
            $table->decimal('metal_weight_gram', 8, 2);
            $table->decimal('making_charge_per_gram', 8, 2);
            $table->decimal('gemstone_cost', 10, 2)->default(0);
            $table->decimal('base_price', 10, 2);
            $table->enum('stock_status', ['IN_STOCK', 'LOW_STOCK', 'MADE_TO_ORDER', 'OUT_OF_STOCK'])->default('IN_STOCK');
            $table->integer('stock_quantity')->default(10);
            $table->text('description');
            $table->boolean('huid_verified')->default(true);
            $table->string('certificate_type')->default('BIS_HALLMARK');
            $table->string('certificate_number')->nullable();
            $table->json('images');
            $table->string('model3d_url')->nullable();
            $table->decimal('rating', 3, 2)->default(5.0);
            $table->integer('review_count')->default(0);
            $table->boolean('is_bestseller')->default(false);
            $table->boolean('is_new_arrival')->default(false);
            $table->string('featured_collection')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        // Orders Table
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('making_charges_total', 10, 2);
            $table->decimal('tax_gst', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->enum('order_status', ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'])->default('PENDING');
            $table->enum('payment_status', ['UNPAID', 'COMPLETED', 'REFUNDED'])->default('UNPAID');
            $table->string('payment_method');
            $table->json('shipping_address');
            $table->string('tracking_number')->nullable();
            $table->string('courier_name')->nullable();
            $table->timestamps();
        });

        // Metal Spot Rates Table
        Schema::create('metal_rates', function (Blueprint $table) {
            $table->id();
            $table->decimal('gold_24k', 8, 2);
            $table->decimal('gold_22k', 8, 2);
            $table->decimal('gold_18k', 8, 2);
            $table->decimal('platinum', 8, 2);
            $table->decimal('silver_999', 8, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('metal_rates');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('users');
    }
};
