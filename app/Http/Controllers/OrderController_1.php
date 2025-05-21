<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\CheckoutDetail;
use App\Models\CheckoutItem;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables;

class OrderController extends Controller
{
    public function index()
    {

        // $orders = Order::with(['checkout_items.product' =>  function ($data) {
        //     $data->select('id', 'name', 'retail_price', 'seller_id');
        // }, 'checkout', 'checkout_detail'],)->latest()->get();



        // $filteredOrders = $orders->filter(function ($order) {
        //     $sellerData = json_decode($order->seller, true);
        //     return is_array($sellerData) && count($sellerData) > 0;
        // })->map(function ($order) {
        //     $order->total_price = $order->shipping_fee + $order->cod_charge + $order->checkout->subtotal;
        //     return $order;
        // });


        $orders = Order::with('checkout_items')->latest()->get();

        // return $orders;




        return view('order.allorder');
    }
    public function orderList(Request $request)
    {
        //PREPARE DATA FOR DATA-TABLE
        if ($request->ajax()) {
            $orders = Order::with('checkout')->latest()->get();

            return DataTables::of($orders)
                ->addIndexColumn()
                ->addColumn('customer_name', function($order) {
                    return $order->customer_name;
                })
                ->make(true);

        }
        //RENDER VIEW
        else {
            return view('order.allorder');
        }
    }
}
