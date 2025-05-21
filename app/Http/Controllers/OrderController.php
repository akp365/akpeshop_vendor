<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\CheckoutDetail;
use App\Models\CheckoutItem;
use App\Models\Country;
use App\Models\Currency;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\OrderStatusHistory;
use App\Models\Seller;
use App\Models\SellerPayable;
use App\Models\ShippingFeeSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\Facades\DataTables;

class OrderController extends Controller
{


    public function order_details(Request $request)
    {


        if ($request->ajax()) {
            $orderId = $request->query('id');
            $sellerId = $request->query('seller');
            $order = Order::where('id', $orderId)->where('seller_id', $sellerId)->latest()->first();



            $orderDetails = OrderDetails::with([
                'product_details' => function ($query) {
                    $query->select('id', 'seller_id', 'product_code', 'status', 'name', 'category_id', 'sub_category_id');
                },
                'seller_details'
            ])->where('checkout_details', $order->order_details_checkout_id)
                ->where('seller_id', $order->seller_id)
                ->get();





            return DataTables::of($orderDetails)
                ->addColumn('item_name', function ($row) {
                    $itemName = $row->product_details->name;

                    // Check if size exists and append
                    if ($row->size) {
                        $itemName .= "<br> Size: " . $row->size;
                    }

                    // Check if color exists and append
                    if ($row->color) {
                        $itemName .= "<br> Color: " . $row->color;
                    }

                    return $itemName;
                })

                ->addColumn('qty', function ($row) {
                    return $row->qty;
                })
                ->addColumn('price', function ($row) {
                    return $row->price * $row->qty;
                })
                ->addColumn('final_price', function ($row) {
                    return $row->final_price;
                })
                ->addColumn('tax', function ($row) {
                    return $row->tax * $row->qty;
                })
                ->addColumn('product_price', function ($row) {
                    return $row->product_price;
                })
                ->addColumn('commisonFee', function ($row) {
                    return $row->commison;
                })
                ->addColumn('promoter_fee', function ($row) {
                    return $row->promoter_fee;
                })
                ->addColumn('vat_on_fee', function ($row) {
                    return $row->vat_on_fee;
                })
                ->rawColumns(['item_name'])
                ->make(true);



        } else {

            $allCountries = Country::all();

            if ($request->query('id') && $request->query('seller')) {
                $orderId = $request->query('id');
                $sellerId = $request->query('seller');
                $order = Order::where('id', $orderId)->where('seller_id', $sellerId)->latest()->first();



                $orderDetails = OrderDetails::with([
                    'product_details' => function ($query) {
                        $query->select('id', 'seller_id', 'product_code', 'status', 'name', 'category_id', 'sub_category_id');
                    },
                    'seller_details'
                ])->where('checkout_details', $order->order_details_checkout_id)
                    ->where('seller_id', $order->seller_id)
                    ->get();



                // return $orderDetails;



                return view('orders.details', compact('allCountries', 'orderDetails'));
            }

            abort(404);
        }


    }


    public function percentConverter($total_amount, $percent)
    {
        return $total_amount * ($percent / 100);
    }
    public function discountConverter($total_subtotal, $discount, $own_subtotal)
    {
        return ($discount / $total_subtotal) * $own_subtotal;
    }

    public function getShippingFee($seller_id, $shipping_weight)
    {
        // Fetch the latest shipping fee settings
        $shipping = ShippingFeeSetting::where('seller_id', $seller_id)->latest()->first();

        if (!$shipping) {
            return null;
        }

        if ($shipping_weight >= 1 && $shipping_weight <= 1000) {
            return $shipping->shipping_fee_1_to_1000;
        } elseif ($shipping_weight >= 1001 && $shipping_weight <= 3000) {
            return $shipping->shipping_fee_1001_to_3000;
        } elseif ($shipping_weight >= 3001 && $shipping_weight <= 5000) {
            return $shipping->shipping_fee_3001_to_5000;
        } elseif ($shipping_weight >= 5001 && $shipping_weight <= 10000) {
            return $shipping->shipping_fee_5001_to_10000;
        } elseif ($shipping_weight >= 10001 && $shipping_weight <= 15000) {
            return $shipping->shipping_fee_10001_to_15000;
        } elseif ($shipping_weight > 15000) {
            return $shipping->shipping_fee_above_15000;
        } else {
            // Handle invalid or out-of-range weights
            return null;
        }
    }



    // public function order_more_info(Request $request)
    // {
    //     if ($request->ajax()) {

    //         $startDate = Carbon::parse("1000-01-01")->startOfDay();
    //         $endDate = Carbon::parse("3025-01-01")->endOfDay();

    //         if ($request->query('start_date') && $request->query('end_date')) {
    //             $start_date = $request->query('start_date');
    //             $end_date = $request->query('end_date');

    //             $startDate = Carbon::parse($start_date)->startOfDay();
    //             $endDate = Carbon::parse($end_date)->endOfDay();

    //             $orders = Order::where('seller_id', Auth::id())->whereBetween('created_at', [$startDate, $endDate])->get();

    //         }



    //         $countryId = 0;
    //         if ($request->query('country_id') && is_numeric($request->query('country_id'))) {
    //             $countryId = $request->query('country_id');
    //         }


    //         $sellerId = 0;
    //         if ($request->query('seller_id') && is_numeric($request->query('seller_id'))) {
    //             $sellerId = $request->query('seller_id');
    //         }



    //         $orderedCurrency = 0;
    //         if ($request->query('ordered_currency')) {
    //             if ($request->query('ordered_currency') == 'none') {
    //                 $orderedCurrency = 0;
    //             } else {
    //                 $orderedCurrency = $request->query('ordered_currency');

    //             }
    //         }


    //         $orderStatus = 0;
    //         if ($request->query('order_status')) {
    //             if ($request->query('order_status') == 'none') {
    //                 $orderStatus = 0;
    //             } else {
    //                 $orderStatus = $request->query('order_status');

    //             }
    //         }



    //         $countryId = 0;
    //         if ($request->query('country_id') && is_numeric($request->query('country_id'))) {
    //             $countryId = $request->query('country_id');
    //         }

    //         $sellerId = 0;
    //         if ($request->query('seller_id') && is_numeric($request->query('seller_id'))) {
    //             $sellerId = $request->query('seller_id');
    //         }

    //         $orderedCurrency = 0;
    //         if ($request->query('ordered_currency')) {
    //             if ($request->query('ordered_currency') == 'none') {
    //                 $orderedCurrency = 0;
    //             } else {
    //                 $orderedCurrency = $request->query('ordered_currency');
    //             }
    //         }

    //         $orderStatus = 0;
    //         if ($request->query('order_status')) {
    //             if ($request->query('order_status') == 'none') {
    //                 $orderStatus = 0;
    //             } else {
    //                 $orderStatus = $request->query('order_status');
    //             }
    //         }

    //         // Initialize the query builder with the basic conditions
    //         $orders = Order::with('checkout')->whereBetween('created_at', [$startDate, $endDate])
    //             ->latest();

    //         if ($countryId != 0) {
    //             $orders = $orders->where('country_id', $countryId);
    //         }

    //         if ($sellerId != 0) {
    //             $orders = $orders->where('seller_id', $sellerId);
    //         }

    //         if ($orderedCurrency != 0) {
    //             $orders = $orders->where('currency', $orderedCurrency);
    //         }

    //         if ($orderStatus != 0) {
    //             $orders = $orders->where('order_status', $orderStatus);
    //         }

    //         $orders = $orders->get()->map(function ($order) {
    //             $order->dubai_date_time = Carbon::parse($order->created_at)
    //                 ->timezone('Asia/Dubai')
    //                 ->format('d/m/Y , H:i');
    //             return $order;
    //         });

    //         // return $orders;




    //         $ordersWithDetails = $orders->map(function ($order) {
    //             $orderDetails = OrderDetails::with([
    //                 'product_details' => function ($query) {
    //                     $query->select('id', 'seller_id', 'product_code', 'status', 'name', 'category_id', 'sub_category_id');
    //                 },
    //                 'seller_details'
    //             ])->where('checkout_details', $order->order_details_checkout_id)
    //                 ->where('seller_id', $order->seller_id)
    //                 ->get();



    //             // return $orderDetails;

    //             $order->total_invoice_value = 0;
    //             $order->total_tax = 0;
    //             $order->total_price_with_vat = 0;
    //             $order->total_price_without_vat = 0;
    //             $order->seller_total_shipping_fee = 0;
    //             $order->total_product_price = 0;
    //             $order->total_included_tax = 0;
    //             $order->total_excluded_tax = 0;

    //             $total_weight = 0;
    //             $seller_id = $order->seller_id;


    //             $checkoutModel = Checkout::find($order->order_details_checkout_id);
    //             $discountAsCurrency = $checkoutModel->discount;
    //             $order->discount = $discountAsCurrency;

    //             $subtotal_and_shipping_cost = $checkoutModel->subtotal + $checkoutModel->shipping_fee;
    //             foreach ($orderDetails as $detail) {

    //                 if ($detail->tax_type === "Included") {
    //                     $order->total_included_tax += $detail->tax * $detail->qty;
    //                 }



    //                 if ($detail->tax_type === "Excluded") {
    //                     $order->total_excluded_tax += $detail->tax * $detail->qty;
    //                 }


    //                 $order->total_price_with_vat += $detail->final_price;
    //                 $order->total_price_without_vat += $detail->product_price;








    //                 $total_weight += $detail->wieght;
    //                 $order->total_product_price += $detail->product_price;
    //                 $order->total_invoice_value += $detail->final_price;
    //                 $order->total_tax += $detail->tax * $detail->qty;
    //                 // $order->commision_details = $sellerCategoriesWiseCommision;
    //                 // $order->commisonFee = $order->total_price_without_vat * ($sellerCategoriesWiseCommision?->commission_rate / 100);
    //                 // $order->promoterClubFee = $order->total_price_without_vat * ($sellerCategoriesWiseCommision?->promoter_club_fee / 100);
    //                 $order->commisonFee += round($detail->commison, 2);
    //                 $order->promoterClubFee += round($detail->promoter_fee, 2);

    //                 $order->vatOnFee += round($detail->vat_on_fee, 2);



    //             }


    //             $order->seller_total_shipping_fee += $this->getShippingFee($seller_id, $total_weight);
    //             $order->total_invoice_value += ($order->seller_total_shipping_fee);
    //             $order->order_details = $orderDetails;
    //             $codCharges = Checkout::find($order->order_details_checkout_id);
    //             // $order->total_cod_fees = $this->percentConverter($order->total_invoice_value, $codCharges->cod_charge_percent);
    //             $order->total_cod_fees = round($this->percentConverter($order->invoice_value, $codCharges->cod_charge_percent), 2);
    //             $order->total_discount = round($this->discountConverter($order->checkout->subtotal, $order->checkout->discount, $order->invoice_value), 2);

    //             //   $order->total_discount = round($order->checkout->subtotal, $order->checkout->discount, $order->invoice_value));
    //             $discountForOrder = round(($order->total_invoice_value / $subtotal_and_shipping_cost) * $order->discount, 2);
    //             $order->total_invoice_value -= $discountForOrder;
    //             $order->final_invoice_value = ($order->invoice_value + $order->total_cod_fees + $order->seller_total_shipping_fee) - $order->total_discount;





    //             $sellerPayableDetails = SellerPayable::latest()->first();
    //             // return $sellerPayableDetails;
    //             $sellerPayablePrice = $order->total_price_without_vat;

    //             // return $order;

    //             if ($sellerPayableDetails->tax == 'added') {
    //                 $sellerPayablePrice += $order->total_tax;
    //             } elseif ($sellerPayableDetails->tax == 'subtracted') {
    //                 $sellerPayablePrice -= $order->total_tax;
    //             }




    //             if ($sellerPayableDetails->shipping_fee == 'added') {
    //                 $sellerPayablePrice += $order->seller_total_shipping_fee;
    //             } elseif ($sellerPayableDetails->shipping_fee == 'subtracted') {
    //                 $sellerPayablePrice -= $order->seller_total_shipping_fee;
    //             }


    //             if ($sellerPayableDetails->cod_charge == 'added') {
    //                 $sellerPayablePrice += $order->total_cod_fees;
    //             } elseif ($sellerPayableDetails->cod_charge == 'subtracted') {
    //                 $sellerPayablePrice -= $order->total_cod_fees;
    //             }




    //             if ($sellerPayableDetails->coupon_discount == 'added') {
    //                 $sellerPayablePrice += $order->total_discount;
    //             } elseif ($sellerPayableDetails->coupon_discount == 'subtracted') {
    //                 $sellerPayablePrice -= $order->total_discount;
    //             }




    //             if ($sellerPayableDetails->commision == 'added') {
    //                 $sellerPayablePrice += $order->commisonFee;
    //             } elseif ($sellerPayableDetails->commision == 'subtracted') {
    //                 $sellerPayablePrice -= $order->commisonFee;
    //             }





    //             if ($sellerPayableDetails->promoter_fee == 'added') {
    //                 $sellerPayablePrice += $order->promoterClubFee;
    //             } elseif ($sellerPayableDetails->promoter_fee == 'subtracted') {
    //                 $sellerPayablePrice -= $order->promoterClubFee;
    //             }





    //             if ($sellerPayableDetails->vat_on_fee == 'added') {
    //                 $sellerPayablePrice += $order->vatOnFee;
    //             } elseif ($sellerPayableDetails->vat_on_fee == 'subtracted') {
    //                 $sellerPayablePrice -= $order->vatOnFee;
    //             }



    //             $order->seller_payable_money = round($sellerPayablePrice, 2);


    //             $subcidy = 0;
    //             if ($order->payment_method == 'credit/debit card') {
    //                 $subcidy = $order->total_discount;
    //             } elseif ($order->payment_method == 'paypal') {
    //                 $subcidy = $order->total_discount;
    //             } elseif ($order->payment_method == 'cod') {
    //                 $subcidy = $order->total_discount;
    //             } elseif ($order->payment_method == 'reward point') {
    //                 $subcidy = $order->total_invoice_value + $order->total_discount;
    //             } elseif ($order->payment_method == 'gift') {
    //                 $subcidy = $order->total_invoice_value + $order->total_discount;
    //             }
    //             $order->subcidy = round($subcidy, 2);


    //             $order->earnings = round(($order->final_invoice_value) - ($order->seller_payable_money), 2);


    //             return $order;
    //         });








    //         return DataTables::of($ordersWithDetails)
    //             ->addColumn('invoice_value', function ($row) {
    //                 return $row->total_invoice_value . " " . $row->currency ?? 'N/A';
    //             })
    //             ->addColumn('tax', function ($row) {
    //                 return $row->total_tax ?? 'N/A';
    //             })
    //             ->addColumn('shipping_fee', function ($row) {
    //                 return $row->shipping_fee ?? 'N/A';
    //             })
    //             ->addColumn('checkout_cod_charge', function ($row) {
    //                 return $row->total_cod_fees ?? 'N/A';
    //             })
    //             ->addColumn('product_only_price', function ($row) {
    //                 return $row->total_price_with_vat . " " . $row->currency ?? 'N/A';
    //             })
    //             ->addColumn('vat_on_fee', function ($row) {
    //                 return round($row->vatOnFee, 2);
    //             })
    //             ->addColumn('seller_payable_amnt', function ($row) {
    //                 return round($row->seller_payable_money, 2);
    //             })
    //             ->addColumn('order_details_btn', function ($row) {
    //                 return "<a href='#' class='btn btn-sm btn-primary update-btn' style='margin-bottom:10px;' target='_blank'>Details</a>";
    //             })

    //             ->addColumn('checkout_items', function ($row) {
    //                 return collect($row->checkout_items_details)->map(function ($item) {
    //                     $productName = $item['product']['name'] ?? 'N/A';
    //                     $orderStatus = $item['order_status'] ?? 'N/A';
    //                     $sellerName = $item['product']['seller']['name'] ?? 'N/A';
    //                     $shopName = $item['product']['seller']['shop_name'] ?? 'N/A';
    //                     $phone = $item['product']['seller']['phone'] ?? 'N/A';

    //                     return "Name: {$productName}<br>Order Status: {$orderStatus}<br>Seller Name: {$sellerName}<br>Shop Name: {$shopName}<br>Phone Number: {$phone}";
    //                 })->join('<br><br>');
    //             })
    //             ->rawColumns(['checkout_items', 'order_details_btn'])
    //             ->make(true);







    //         } else {
    //         $startDate = Carbon::parse("1000-01-01")->startOfDay();
    //         $endDate = Carbon::parse("3025-01-01")->endOfDay();

    //         if ($request->query('start_date') && $request->query('end_date')) {
    //             $start_date = $request->query('start_date');
    //             $end_date = $request->query('end_date');

    //             $startDate = Carbon::parse($start_date)->startOfDay();
    //             $endDate = Carbon::parse($end_date)->endOfDay();

    //             $orders = Order::where('seller_id', Auth::id())->whereBetween('created_at', [$startDate, $endDate])->get();

    //         }



    //         $countryId = 0;
    //         if ($request->query('country_id') && is_numeric($request->query('country_id'))) {
    //             $countryId = $request->query('country_id');
    //         }


    //         $sellerId = 0;
    //         if ($request->query('seller_id') && is_numeric($request->query('seller_id'))) {
    //             $sellerId = $request->query('seller_id');
    //         }



    //         $orderedCurrency = 0;
    //         if ($request->query('ordered_currency')) {
    //             if ($request->query('ordered_currency') == 'none') {
    //                 $orderedCurrency = 0;
    //             } else {
    //                 $orderedCurrency = $request->query('ordered_currency');

    //             }
    //         }


    //         $orderStatus = 0;
    //         if ($request->query('order_status')) {
    //             if ($request->query('order_status') == 'none') {
    //                 $orderStatus = 0;
    //             } else {
    //                 $orderStatus = $request->query('order_status');

    //             }
    //         }



    //         $countryId = 0;
    //         if ($request->query('country_id') && is_numeric($request->query('country_id'))) {
    //             $countryId = $request->query('country_id');
    //         }

    //         $sellerId = 0;
    //         if ($request->query('seller_id') && is_numeric($request->query('seller_id'))) {
    //             $sellerId = $request->query('seller_id');
    //         }

    //         $orderedCurrency = 0;
    //         if ($request->query('ordered_currency')) {
    //             if ($request->query('ordered_currency') == 'none') {
    //                 $orderedCurrency = 0;
    //             } else {
    //                 $orderedCurrency = $request->query('ordered_currency');
    //             }
    //         }

    //         $orderStatus = 0;
    //         if ($request->query('order_status')) {
    //             if ($request->query('order_status') == 'none') {
    //                 $orderStatus = 0;
    //             } else {
    //                 $orderStatus = $request->query('order_status');
    //             }
    //         }

    //         // Initialize the query builder with the basic conditions
    //         $orders = Order::with('checkout')->whereBetween('created_at', [$startDate, $endDate])
    //             ->latest();

    //         if ($countryId != 0) {
    //             $orders = $orders->where('country_id', $countryId);
    //         }

    //         if ($sellerId != 0) {
    //             $orders = $orders->where('seller_id', $sellerId);
    //         }

    //         if ($orderedCurrency != 0) {
    //             $orders = $orders->where('currency', $orderedCurrency);
    //         }

    //         if ($orderStatus != 0) {
    //             $orders = $orders->where('order_status', $orderStatus);
    //         }

    //         $orders = $orders->get()->map(function ($order) {
    //             $order->dubai_date_time = Carbon::parse($order->created_at)
    //                 ->timezone('Asia/Dubai')
    //                 ->format('d/m/Y , H:i');
    //             return $order;
    //         });

    //         // return $orders;




    //         $ordersWithDetails = $orders->map(function ($order) {
    //             $orderDetails = OrderDetails::with([
    //                 'product_details' => function ($query) {
    //                     $query->select('id', 'seller_id', 'product_code', 'status', 'name', 'category_id', 'sub_category_id');
    //                 },
    //                 'seller_details'
    //             ])->where('checkout_details', $order->order_details_checkout_id)
    //                 ->where('seller_id', $order->seller_id)
    //                 ->get();



    //             // return $orderDetails;

    //             $order->total_invoice_value = 0;
    //             $order->total_tax = 0;
    //             $order->total_price_with_vat = 0;
    //             $order->total_price_without_vat = 0;
    //             $order->seller_total_shipping_fee = 0;
    //             $order->total_product_price = 0;
    //             $order->total_included_tax = 0;
    //             $order->total_excluded_tax = 0;

    //             $total_weight = 0;
    //             $seller_id = $order->seller_id;


    //             $checkoutModel = Checkout::find($order->order_details_checkout_id);
    //             $discountAsCurrency = $checkoutModel->discount;
    //             $order->discount = $discountAsCurrency;

    //             $subtotal_and_shipping_cost = $checkoutModel->subtotal + $checkoutModel->shipping_fee;
    //             foreach ($orderDetails as $detail) {

    //                 if ($detail->tax_type === "Included") {
    //                     $order->total_included_tax += $detail->tax * $detail->qty;
    //                 }



    //                 if ($detail->tax_type === "Excluded") {
    //                     $order->total_excluded_tax += $detail->tax * $detail->qty;
    //                 }


    //                 $order->total_price_with_vat += $detail->final_price;
    //                 $order->total_price_without_vat += $detail->product_price;








    //                 $total_weight += $detail->wieght;
    //                 $order->total_product_price += $detail->product_price;
    //                 $order->total_invoice_value += $detail->final_price;
    //                 $order->total_tax += $detail->tax * $detail->qty;
    //                 // $order->commision_details = $sellerCategoriesWiseCommision;
    //                 // $order->commisonFee = $order->total_price_without_vat * ($sellerCategoriesWiseCommision?->commission_rate / 100);
    //                 // $order->promoterClubFee = $order->total_price_without_vat * ($sellerCategoriesWiseCommision?->promoter_club_fee / 100);
    //                 $order->commisonFee += round($detail->commison, 2);
    //                 $order->promoterClubFee += round($detail->promoter_fee, 2);

    //                 $order->vatOnFee += round($detail->vat_on_fee, 2);



    //             }


    //             $order->seller_total_shipping_fee += $this->getShippingFee($seller_id, $total_weight);
    //             $order->total_invoice_value += ($order->seller_total_shipping_fee);
    //             $order->order_details = $orderDetails;
    //             $codCharges = Checkout::find($order->order_details_checkout_id);
    //             // $order->total_cod_fees = $this->percentConverter($order->total_invoice_value, $codCharges->cod_charge_percent);
    //             $order->total_cod_fees = round($this->percentConverter($order->invoice_value, $codCharges->cod_charge_percent), 2);
    //             $order->total_discount = round($this->discountConverter($order->checkout->subtotal, $order->checkout->discount, $order->invoice_value), 2);

    //             //   $order->total_discount = round($order->checkout->subtotal, $order->checkout->discount, $order->invoice_value));
    //             $discountForOrder = round(($order->total_invoice_value / $subtotal_and_shipping_cost) * $order->discount, 2);
    //             $order->total_invoice_value -= $discountForOrder;
    //             $order->final_invoice_value = ($order->invoice_value + $order->total_cod_fees + $order->seller_total_shipping_fee) - $order->total_discount;

    //             // return $orders




    //             $sellerPayableDetails = SellerPayable::latest()->first();
    //             // return $sellerPayableDetails;
    //             $sellerPayablePrice = $order->total_price_without_vat;

    //             // return $order;

    //             if ($sellerPayableDetails->tax == 'added') {
    //                 $sellerPayablePrice += $order->total_tax;
    //             } elseif ($sellerPayableDetails->tax == 'subtracted') {
    //                 $sellerPayablePrice -= $order->total_tax;
    //             }




    //             if ($sellerPayableDetails->shipping_fee == 'added') {
    //                 $sellerPayablePrice += $order->seller_total_shipping_fee;
    //             } elseif ($sellerPayableDetails->shipping_fee == 'subtracted') {
    //                 $sellerPayablePrice -= $order->seller_total_shipping_fee;
    //             }


    //             if ($sellerPayableDetails->cod_charge == 'added') {
    //                 $sellerPayablePrice += $order->total_cod_fees;
    //             } elseif ($sellerPayableDetails->cod_charge == 'subtracted') {
    //                 $sellerPayablePrice -= $order->total_cod_fees;
    //             }




    //             if ($sellerPayableDetails->coupon_discount == 'added') {
    //                 $sellerPayablePrice += $order->total_discount;
    //             } elseif ($sellerPayableDetails->coupon_discount == 'subtracted') {
    //                 $sellerPayablePrice -= $order->total_discount;
    //             }




    //             if ($sellerPayableDetails->commision == 'added') {
    //                 $sellerPayablePrice += $order->commisonFee;
    //             } elseif ($sellerPayableDetails->commision == 'subtracted') {
    //                 $sellerPayablePrice -= $order->commisonFee;
    //             }





    //             if ($sellerPayableDetails->promoter_fee == 'added') {
    //                 $sellerPayablePrice += $order->promoterClubFee;
    //             } elseif ($sellerPayableDetails->promoter_fee == 'subtracted') {
    //                 $sellerPayablePrice -= $order->promoterClubFee;
    //             }





    //             if ($sellerPayableDetails->vat_on_fee == 'added') {
    //                 $sellerPayablePrice += $order->vatOnFee;
    //             } elseif ($sellerPayableDetails->vat_on_fee == 'subtracted') {
    //                 $sellerPayablePrice -= $order->vatOnFee;
    //             }

    //             // return $order;


    //             $order->seller_payable_money = round($sellerPayablePrice, 2);


    //             $subcidy = 0;
    //             if ($order->payment_method == 'credit/debit card') {
    //                 $subcidy = $order->total_discount;
    //             } elseif ($order->payment_method == 'paypal') {
    //                 $subcidy = $order->total_discount;
    //             } elseif ($order->payment_method == 'cod') {
    //                 $subcidy = $order->total_discount;
    //             } elseif ($order->payment_method == 'reward point') {
    //                 $subcidy = $order->total_invoice_value + $order->total_discount;
    //             } elseif ($order->payment_method == 'gift') {
    //                 $subcidy = $order->total_invoice_value + $order->total_discount;
    //             }
    //             $order->subcidy = round($subcidy, 2);


    //             $order->earnings = round(($order->total_invoice_value + $order->discount) - $order->seller_payable, 2);


    //             return $order;
    //         });






    //         // return $ordersWithDetails;










    //         $allCountries = Country::all();
    //         $allSellers = Seller::all();
    //         $allCurrency = Currency::all();
    //         return view('user.order.list_more_info', compact('allCountries', 'allSellers', 'allCurrency'));

    //         // return view('orders.index');
    //     }
    // }


    public function OrderStatus($checkoutId, $seller_id)
    {
        $checkoutItems = CheckoutItem::where('checkout_id', $checkoutId)->where('seller_id', $seller_id)->get();

        $orderStatus = 'No status';

        foreach ($checkoutItems as $item) {
            $status = strtolower($item->order_status);
            if ($status == 'placed') {
                $orderStatus = 'Placed';
            }
            if ($status == 'cancel by seller') {
                $orderStatus = 'Cancel by seller';
            }
            if ($status == 'cancel by customer') {
                $orderStatus = 'Cancel by customer';
            }
            if ($status == 'confirmed') {
                $orderStatus = 'Confirmed';
            }
            if ($status == 'dispatched') {
                $orderStatus = 'Dispatched';
            }
            if ($status == 'delivered') {
                $orderStatus = 'Delivered';
            }
            if ($status == 'returned') {
                $orderStatus = 'Returned';
            }
        }

        return $orderStatus;
    }
























    public function view(Request $request)
    {
        $startDate = Carbon::parse("1000-01-01")->startOfDay();
        $endDate = Carbon::parse("3025-01-01")->endOfDay();

        if ($request->query('start_date') && $request->query('end_date')) {
            $start_date = $request->query('start_date');
            $end_date = $request->query('end_date');

            $startDate = Carbon::parse($start_date)->startOfDay();
            $endDate = Carbon::parse($end_date)->endOfDay();

            $orders = Order::whereBetween('created_at', [$startDate, $endDate])->get();

        }



        $countryId = 0;
        if ($request->query('country_id') && is_numeric($request->query('country_id'))) {
            $countryId = $request->query('country_id');
        }


        $sellerId = 0;
        if ($request->query('seller_id') && is_numeric($request->query('seller_id'))) {
            $sellerId = $request->query('seller_id');
        }



        $orderedCurrency = 0;
        if ($request->query('ordered_currency')) {
            if ($request->query('ordered_currency') == 'none') {
                $orderedCurrency = 0;
            } else {
                $orderedCurrency = $request->query('ordered_currency');

            }
        }


        $orderStatus = 0;
        if ($request->query('order_status')) {
            if ($request->query('order_status') == 'none') {
                $orderStatus = 0;
            } else {
                $orderStatus = $request->query('order_status');

            }
        }



        $countryId = 0;
        if ($request->query('country_id') && is_numeric($request->query('country_id'))) {
            $countryId = $request->query('country_id');
        }

        $sellerId = 0;
        if ($request->query('seller_id') && is_numeric($request->query('seller_id'))) {
            $sellerId = $request->query('seller_id');
        }

        $orderedCurrency = 0;
        if ($request->query('ordered_currency')) {
            if ($request->query('ordered_currency') == 'none') {
                $orderedCurrency = 0;
            } else {
                $orderedCurrency = $request->query('ordered_currency');
            }
        }

        $orderStatus = 0;
        if ($request->query('order_status')) {
            if ($request->query('order_status') == 'none') {
                $orderStatus = 0;
            } else {
                $orderStatus = $request->query('order_status');
            }
        }

        // Initialize the query builder with the basic conditions
        $orders = Order::with('checkout')->whereBetween('created_at', [$startDate, $endDate])->where('seller_id', Auth::id())
            ->latest();

        if ($countryId != 0) {
            $orders = $orders->where('country_id', $countryId);
        }

        if ($sellerId != 0) {
            $orders = $orders->where('seller_id', $sellerId);
        }

        if ($orderedCurrency != 0) {
            $orders = $orders->where('currency', $orderedCurrency);
        }

        if ($orderStatus != 0) {
            $orders = $orders->where('order_status', $orderStatus);
        }




        $orders = $orders->get()->map(function ($order) {
            $order->dubai_date_time = Carbon::parse($order->created_at)
                ->timezone('Asia/Dubai')
                ->format('d/m/Y , H:i');


            $seller = Seller::find(Auth::id());
            $sellerCurrency = Currency::where('id', $seller->currency_id)->latest()->first();



            $order->sellerCurrency = $sellerCurrency->title;
            return $order;
        });





        $ordersWithDetails = $orders->map(function ($order) {
            $orderDetails = OrderDetails::with([
                'product_details' => function ($query) {
                    $query->select('id', 'seller_id', 'product_code', 'status', 'name', 'category_id', 'sub_category_id');
                },
                'seller_details'
            ])->where('checkout_details', $order->order_details_checkout_id)
                ->where('seller_id', $order->seller_id)
                ->get();




            $order->total_invoice_value = 0;
            $order->total_tax = 0;
            $order->total_price_with_vat = 0;
            $order->total_price_without_vat = 0;
            $order->seller_total_shipping_fee = 0;
            $order->total_product_price = 0;
            $order->total_included_tax = 0;
            $order->total_excluded_tax = 0;

            $total_weight = 0;
            $seller_id = $order->seller_id;


            $checkoutModel = Checkout::find($order->order_details_checkout_id);
            $discountAsCurrency = $checkoutModel->discount;
            $order->discount = $discountAsCurrency;

            $subtotal_and_shipping_cost = $checkoutModel->subtotal + $checkoutModel->shipping_fee;
            foreach ($orderDetails as $detail) {

                if ($detail->tax_type === "Included") {
                    $order->total_included_tax += $detail->tax * $detail->qty;
                }



                if ($detail->tax_type === "Excluded") {
                    $order->total_excluded_tax += $detail->tax * $detail->qty;
                }


                $order->total_price_with_vat += $detail->final_price;
                $order->total_price_without_vat += $detail->product_price;








                $total_weight += $detail->wieght;
                $order->total_product_price += $detail->product_price;
                $order->total_invoice_value += $detail->final_price;
                $order->total_tax += $detail->tax * $detail->qty;
                // $order->commision_details = $sellerCategoriesWiseCommision;
                // $order->commisonFee = $order->total_price_without_vat * ($sellerCategoriesWiseCommision?->commission_rate / 100);
                // $order->promoterClubFee = $order->total_price_without_vat * ($sellerCategoriesWiseCommision?->promoter_club_fee / 100);
                $order->commisonFee += round($detail->commison, 2);
                $order->promoterClubFee += round($detail->promoter_fee, 2);

                $order->vatOnFee += round($detail->vat_on_fee, 2);



            }


            $order->seller_total_shipping_fee += $this->getShippingFee($seller_id, $total_weight);
            $order->total_invoice_value += ($order->seller_total_shipping_fee);
            $order->order_details = $orderDetails;
            $codCharges = Checkout::find($order->order_details_checkout_id);
            // $order->total_cod_fees = $this->percentConverter($order->total_invoice_value, $codCharges->cod_charge_percent);
            $order->total_cod_fees = round($this->percentConverter($order->invoice_value, $codCharges->cod_charge_percent), 2);
            $order->total_discount = round($this->discountConverter($order->checkout->subtotal, $order->checkout->discount, $order->invoice_value), 2);

            //   $order->total_discount = round($order->checkout->subtotal, $order->checkout->discount, $order->invoice_value));
            $discountForOrder = round(($order->total_invoice_value / $subtotal_and_shipping_cost) * $order->discount, 2);
            $order->total_invoice_value -= $discountForOrder;
            $order->final_invoice_value = ($order->invoice_value + $order->total_cod_fees + $order->seller_total_shipping_fee) - $order->total_discount;





            $sellerPayableDetails = SellerPayable::latest()->first();
            // return $sellerPayableDetails;
            $sellerPayablePrice = $order->total_price_without_vat;

            // return $order;

            if ($sellerPayableDetails->tax == 'added') {
                $sellerPayablePrice += $order->total_tax;
            } elseif ($sellerPayableDetails->tax == 'subtracted') {
                $sellerPayablePrice -= $order->total_tax;
            }




            if ($sellerPayableDetails->shipping_fee == 'added') {
                $sellerPayablePrice += $order->seller_total_shipping_fee;
            } elseif ($sellerPayableDetails->shipping_fee == 'subtracted') {
                $sellerPayablePrice -= $order->seller_total_shipping_fee;
            }


            if ($sellerPayableDetails->cod_charge == 'added') {
                $sellerPayablePrice += $order->total_cod_fees;
            } elseif ($sellerPayableDetails->cod_charge == 'subtracted') {
                $sellerPayablePrice -= $order->total_cod_fees;
            }




            if ($sellerPayableDetails->coupon_discount == 'added') {
                $sellerPayablePrice += $order->total_discount;
            } elseif ($sellerPayableDetails->coupon_discount == 'subtracted') {
                $sellerPayablePrice -= $order->total_discount;
            }




            if ($sellerPayableDetails->commision == 'added') {
                $sellerPayablePrice += $order->commisonFee;
            } elseif ($sellerPayableDetails->commision == 'subtracted') {
                $sellerPayablePrice -= $order->commisonFee;
            }





            if ($sellerPayableDetails->promoter_fee == 'added') {
                $sellerPayablePrice += $order->promoterClubFee;
            } elseif ($sellerPayableDetails->promoter_fee == 'subtracted') {
                $sellerPayablePrice -= $order->promoterClubFee;
            }





            if ($sellerPayableDetails->vat_on_fee == 'added') {
                $sellerPayablePrice += $order->vatOnFee;
            } elseif ($sellerPayableDetails->vat_on_fee == 'subtracted') {
                $sellerPayablePrice -= $order->vatOnFee;
            }



            $order->seller_payable_money = round($sellerPayablePrice, 2);


            $subcidy = 0;
            if ($order->payment_method == 'credit/debit card') {
                $subcidy = $order->total_discount;
            } elseif ($order->payment_method == 'paypal') {
                $subcidy = $order->total_discount;
            } elseif ($order->payment_method == 'cod') {
                $subcidy = $order->total_discount;
            } elseif ($order->payment_method == 'reward point') {
                $subcidy = $order->total_invoice_value + $order->total_discount;
            } elseif ($order->payment_method == 'gift') {
                $subcidy = $order->total_invoice_value + $order->total_discount;
            }
            $order->subcidy = round($subcidy, 2);


            $order->earnings = round(($order->final_invoice_value) - ($order->seller_payable_money), 2);

            $orderStatusHistory = OrderStatusHistory::where('order_id', $order->id)->latest()->get();
            $order->order_status_history = $orderStatusHistory;

            $order->order_status_history_data = view('orders.render_order_status_history_as_html', compact('order'))->render();
            $order->earnings_in_selected_currency = $this->convertCurrency($order->currency, $order->seller_payable_money, $order->sellerCurrency);
            return $order;
        });




        $ordersWithDetailsV2 = $ordersWithDetails;

        if ($request->query('invoce_no')) {
            $invoice_no = $request->query('invoce_no');

            $ordersWithDetails = [];

            foreach ($ordersWithDetailsV2 as $order) {
                if ($order['invoice_no'] === $invoice_no) {
                    $ordersWithDetails[] = $order;
                }
            }


            $allCountries = Country::all();
            $allSellers = Seller::all();
            $allCurrency = Currency::all();
    
            return view('orders.index', compact('allCountries', 'allSellers', 'allCurrency', 'orders', 'ordersWithDetails'));
            
        }







        


        $allCountries = Country::all();
        $allSellers = Seller::all();
        $allCurrency = Currency::all();

        return view('orders.index', compact('allCountries', 'allSellers', 'allCurrency', 'orders', 'ordersWithDetails'));
    }






    public function convertCurrency($currentCurrency, $amount, $targetCurrency)
    {
        // Find exchange rates for both currencies
        $currentCurrencyRate = Currency::where('title', $currentCurrency)->first();
        $targetCurrencyRate = Currency::where('title', $targetCurrency)->first();

        if (!$currentCurrencyRate || !$targetCurrencyRate) {
            return response()->json(['error' => 'Invalid currency provided'], 400);
        }

        // Convert amount to USD first, then to target currency
        $amountInUSD = $amount / $currentCurrencyRate->usd_conversion_rate;
        $convertedAmount = $amountInUSD * $targetCurrencyRate->usd_conversion_rate;

        return [
            'original_currency' => $currentCurrency,
            'original_amount' => number_format($amount, 2, '.', ','),
            'converted_currency' => $targetCurrency,
            'converted_amount' => number_format($convertedAmount, 2, '.', ',')
        ];
    }
































    public function orderList(Request $request)
    {
        //PREPARE DATA FOR DATA-TABLE
        if ($request->ajax()) {
            $orders = Order::with('checkout')->latest()->get();

            return DataTables::of($orders)
                ->addIndexColumn()
                ->addColumn('customer_name', function ($order) {
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
