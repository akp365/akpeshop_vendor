<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory;

    public function checkout_detail() {
        return $this->belongsTo(CheckoutDetail::class, 'checkout_id', 'checkout_id');
    }

    public function checkout() {
        return $this->belongsTo(Checkout::class, 'checkout_id');
    }

    public function checkout_items() {
        return $this->hasMany(CheckoutItem::class, 'checkout_id', 'checkout_id')->where('seller_id', Auth::id());
    }
}
