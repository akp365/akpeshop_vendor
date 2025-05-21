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


    public function items(){
        return $this->hasMany(CheckoutItems::class, 'id', 'product_id');
    }

    public function order_details_data() {
        return $this->hasMany(OrderDetails::class, 'checkout_details', 'id');
    }
}
