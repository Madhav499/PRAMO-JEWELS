<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sku',
        'name',
        'category',
        'metal_type',
        'purity',
        'metal_weight_gram',
        'making_charge_per_gram',
        'gemstone_cost',
        'base_price',
        'stock_status',
        'stock_quantity',
        'description',
        'huid_verified',
        'certificate_type',
        'certificate_number',
        'images',
        'model3d_url',
        'rating',
        'review_count',
        'is_bestseller',
        'is_new_arrival',
        'featured_collection',
    ];

    protected $casts = [
        'images' => 'array',
        'metal_weight_gram' => 'float',
        'making_charge_per_gram' => 'float',
        'gemstone_cost' => 'float',
        'base_price' => 'float',
        'rating' => 'float',
        'huid_verified' => 'boolean',
        'is_bestseller' => 'boolean',
        'is_new_arrival' => 'boolean',
    ];

    /**
     * Dynamically calculates final price based on spot gold rate and GST 3%.
     */
    public function calculateFinalPrice(float $currentSpotRatePerGram): float
    {
        $metalCost = $this->metal_weight_gram * $currentSpotRatePerGram;
        $makingCharges = $this->metal_weight_gram * $this->making_charge_per_gram;
        $subtotal = $metalCost + $makingCharges + $this->gemstone_cost;
        $gst = $subtotal * 0.03; // 3% Indian Jewellery GST

        return round($subtotal + $gst, 2);
    }
}
