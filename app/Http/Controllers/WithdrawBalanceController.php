<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Currency;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\OrderStatusHistory;
use App\Models\Seller;
use App\Models\SellerPayable;
use App\Models\ShippingFeeSetting;
use App\Models\WithdrawBalance;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WithdrawBalanceController extends Controller
{


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











    public function index(Request $request) {
        $allWithdraw = WithdrawBalance::where('seller_id', Auth::id())->latest()->get();


        
        $orders = Order::with('checkout')->where('seller_id', Auth::id())
            ->latest();


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



        $total_earnings_in_selected_currency = 0.00;

        foreach ($ordersWithDetails as $order) {
            $converted_amount = (float) str_replace(',', '', $order->earnings_in_selected_currency['converted_amount']);
            $total_earnings_in_selected_currency += $converted_amount;
        }

        $formatted_total_current_currency_earnings = number_format($total_earnings_in_selected_currency, 2);



        // return $ordersWithDetails[0]['sellerCurrency'];

        $withdraw = WithdrawBalance::where('seller_id', Auth::id())->where('status', 'approve')->sum('amount');
        $withdraw_request = WithdrawBalance::where('seller_id', Auth::id())->where('status', 'pending')->sum('amount');
        $total_balance = $total_earnings_in_selected_currency - $withdraw ?? 0;

        $total_balance_data = number_format($total_balance,2);


        $seller_current_currency = Seller::find(Auth::id());
        $seller_current_currency_name = Currency::find($seller_current_currency->currency_id)->title;

        return view('withdraw.index', compact  ('formatted_total_current_currency_earnings', 'withdraw', 'total_balance_data', 'withdraw_request', 'seller_current_currency_name','allWithdraw'));



    }
    
    public function WithdrawRequest(Request $request) {
        $vendorID = Auth::id();
        $amount = $request->amount;
        $currency = $request->currency;


        WithdrawBalance::create([
            'seller_id' => $vendorID,
            'amount' => $amount,
            'currency'=> $currency,
            'status'=> 'pending',
        ]);

        return redirect()->back()->with('success','Withdraw request successfull.');

    }
}
