<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'sku',
        'name',
        'metal_type',
        'purity',
        'price',
        'stock_status',
        'description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the inventory associated with the product.
     */
    public function inventory(): HasOne
    {
        return $this->hasOne(Inventory::class);
    }
}
