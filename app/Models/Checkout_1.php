<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    // public function checkoutDetail()
    // {
    //     return $this->hasOne(CheckoutDetail::class);
    // }

    // public function checkoutItems()
    // {
    //     return $this->hasMany(CheckoutItem::class, 'checkout_id', 'id')->where('seller_id', auth()->id());
    // }



}
