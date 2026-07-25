<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'subtotal',
        'making_charges_total',
        'tax_gst',
        'discount',
        'total_amount',
        'order_status',
        'payment_status',
        'payment_method',
        'shipping_address',
        'tracking_number',
        'courier_name',
    ];

    protected $casts = [
        'shipping_address' => 'array',
        'subtotal' => 'float',
        'total_amount' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
