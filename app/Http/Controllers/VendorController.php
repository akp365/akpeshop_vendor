<?php

namespace App\Http\Controllers;

use App\Models\AssignTicket;
use App\Models\CategoryChangeRequest;
use App\Models\CateogryRequest;
use App\Models\ChangeLog;
use App\Models\Checkout;
use App\Models\CheckoutItem;
use App\Models\City;
use App\Models\Commission;
use App\Models\Country;
use App\Models\Currency;
use App\Models\InfoChangeRequest;
use App\Models\Models\Category;
use App\Models\OpenTicket;
use App\Models\OpenTicketMessage;
use App\Models\Order;
use App\Models\OrderDetails;
use App\Models\OrderStatusHistory;
use App\Models\Product;
use App\Models\Seller;
use App\Models\SellerCategory;
use App\Models\SellerPayable;
use App\Models\ShippingFeeSetting;
use App\Models\WithdrawBalance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DataTables;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{


    public function SendTicketMessage(Request $request) {
        $ticket_id = $request->ticket_id;
        $message = $request->message;

        OpenTicketMessage::create([
            'ticket_id'=> $ticket_id,
            'vendor_id'=> Auth::id(),
            'message'=> $message,
        ]);

        return back()->with('success','Message send success');

    }

    public function OpenTicketView(Request $request) {
        $unique_id = $request->ticket_unique_id;
        $openTicketId = OpenTicket::where("unique_id", $unique_id)->first();

        $user = Auth::user();

        $openTicket = OpenTicketMessage::where('ticket_id', $openTicketId->id)->get();


        $allVendor = Seller::latest()->get();
        // return $openTicket;

        return view('open_ticket_view', compact('openTicket', 'allVendor', 'openTicketId'));

    }

    public function OpenTicketList(Request $request) {
        $assignedTickets = AssignTicket::with('tickets')
            ->where('vendor', Auth::id())
            ->latest()
            ->get()
            ->unique('ticket_id');

        $tickets = $assignedTickets->pluck('tickets')->flatten();

        return view('open_ticket_list', compact('tickets'));
    }



    public function updateOrder(Request $request)
    {
        $checkoutId = $request->checkout_id;
        $sellerId = $request->seller_id;
        $note = $request->note;
        $status = $request->status;
        $orderId = $request->order_id;

        $checkout = CheckoutItem::where('checkout_id', $checkoutId)->where('seller_id', Auth::id())->get();

        foreach ($checkout as $item) {
            $item->order_status = $status;
            $item->save();
        }


        OrderStatusHistory::create([
            'checkout_id' => $checkoutId,
            'order_id' => $orderId,
            'seller_id' => $sellerId,
            'note' => $note,
            'status_name' => $status,
            //    'added_by' => Auth::user()->id,
        ]);

        $orderStatus = Order::find($orderId);
        $orderStatus->order_status = $status;
        $orderStatus->save();


        return redirect()->back();
    }


    public function get_total_sells_by_currency(Request $request)
    {
        $allCurrencies = Currency::all()->pluck('title')->toArray();
        // return $allCurrencies;
        // Get vendor's current currency
        $vendorCurrentCurrency = Auth::user()->currency_id;
        $rateExchange = Currency::find($vendorCurrentCurrency);
        $usd_convert_rate = $rateExchange->usd_conversion_rate;
        $vendor_current_curreny_name = $allCurrencies[$vendorCurrentCurrency - 1];
        // Get orders grouped by currency
        $total_orders = Order::where('seller_id', Auth::id())->get()->groupBy('currency');

        $currency_summary = [];
        $totalCurrencyAmnt = 0;

        foreach ($total_orders as $currency => $orders) {
            $total_amount = $orders->sum('invoice_value');

            // Find exchange rate for the current currency
            $currency_rate = Currency::where('title', $currency)->first();

            if ($currency_rate) {
                $currency_to_usd = $currency_rate->usd_conversion_rate;
                $converted_amount = ($total_amount / $currency_to_usd) * $usd_convert_rate;
            } else {
                $converted_amount = 0; // Handle missing exchange rates
            }

            $currency_summary[$currency] = [
                'total_amount' => $total_amount,
                'total_selected_currency_amnt' => number_format(round($converted_amount, 2), 2, '.', ',')
            ];

            // Accumulate total converted amount as a float
            $totalCurrencyAmnt += round($converted_amount, 2);
        }

        // Format the final total amount
        $totalCurrencyAmnt = number_format($totalCurrencyAmnt, 2, '.', ',');

        $different_currency_wise_data = [
            'currency_summary' => $currency_summary,
            'currency_name' => $vendor_current_curreny_name,  // Name of the currency (e.g., AED, USD)
            'total_selected_currency_amnt' => $totalCurrencyAmnt
        ];

        return $different_currency_wise_data;

    }
    public function get_total_sells(Request $request)
    {
        $allCurrencies = Currency::all()->pluck('title')->toArray();
        // return $allCurrencies;
        // Get vendor's current currency
        $vendorCurrentCurrency = Auth::user()->currency_id;
        $rateExchange = Currency::find($vendorCurrentCurrency);
        $usd_convert_rate = $rateExchange->usd_conversion_rate;
        $vendor_current_curreny_name = $allCurrencies[$vendorCurrentCurrency - 1];
        // Get orders grouped by currency
        $total_orders = Order::where('seller_id', Auth::id())->get()->groupBy('currency');

        $currency_summary = [];
        $totalCurrencyAmnt = 0;

        foreach ($total_orders as $currency => $orders) {
            $total_amount = $orders->sum('invoice_value');

            // Find exchange rate for the current currency
            $currency_rate = Currency::where('title', $currency)->first();

            if ($currency_rate) {
                $currency_to_usd = $currency_rate->usd_conversion_rate;
                $converted_amount = ($total_amount / $currency_to_usd) * $usd_convert_rate;
            } else {
                $converted_amount = 0; // Handle missing exchange rates
            }

            $currency_summary[$currency] = [
                'total_amount' => $total_amount,
                'total_selected_currency_amnt' => number_format(round($converted_amount, 2), 2, '.', ',')
            ];

            // Accumulate total converted amount as a float
            $totalCurrencyAmnt += round($converted_amount, 2);
        }

        // Format the final total amount
        $totalCurrencyAmnt = number_format($totalCurrencyAmnt, 2, '.', ',');

        return [
            'currency_summary' => $currency_summary,
            'currency_name' => $vendor_current_curreny_name,  // Name of the currency (e.g., AED, USD)
            'total_selected_currency_amnt' => $totalCurrencyAmnt
        ];



    }




    public function index(Request $request)
    {
        $vendorTotalSells = Order::where('seller_id', Auth::id())->count();
        $vendorTotalSells = Order::where('seller_id', Auth::id())->sum('invoice_value');
        $all_orders = Order::where('seller_id', Auth::id())->latest()->get();
        $total_customers = Order::where('seller_id', Auth::id())->distinct('customer_id')->count();
        $total_seller = 0;
        $totalProduct = Product::where('seller_id', Auth::id())->count();
        $recent_orders = Order::where('seller_id', Auth::id())->limit(10)->get();





        $allCurrencies = Currency::all()->pluck('title')->toArray();
        // return $allCurrencies;
        // Get vendor's current currency
        $vendorCurrentCurrency = Auth::user()->currency_id;
        $rateExchange = Currency::find($vendorCurrentCurrency);
        $usd_convert_rate = $rateExchange->usd_conversion_rate;
        $vendor_current_curreny_name = $allCurrencies[$vendorCurrentCurrency - 1];
        // Get orders grouped by currency
        $total_orders = Order::where('seller_id', Auth::id())->get()->groupBy('currency');

        $currency_summary = [];
        $totalCurrencyAmnt = 0;

        foreach ($total_orders as $currency => $orders) {
            $total_amount = $orders->sum('invoice_value');

            // Find exchange rate for the current currency
            $currency_rate = Currency::where('title', $currency)->first();

            if ($currency_rate) {
                $currency_to_usd = $currency_rate->usd_conversion_rate;
                $converted_amount = ($total_amount / $currency_to_usd) * $usd_convert_rate;
            } else {
                $converted_amount = 0; // Handle missing exchange rates
            }

            $currency_summary[$currency] = [
                'total_amount' => $total_amount,
                'total_selected_currency_amnt' => number_format(round($converted_amount, 2), 2, '.', ',')
            ];

            // Accumulate total converted amount as a float
            $totalCurrencyAmnt += round($converted_amount, 2);
        }

        // Format the final total amount
        $totalCurrencyAmnt = number_format($totalCurrencyAmnt, 2, '.', ',');

        $currency_summary = [
            'currency_summary' => $currency_summary,
            'currency_name' => $vendor_current_curreny_name,  // Name of the currency (e.g., AED, USD)
            'total_selected_currency_amnt' => $totalCurrencyAmnt
        ];












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

        $withdraw = WithdrawBalance::where('seller_id', Auth::id())->sum('amount');
        $withdraw_request = WithdrawBalance::where('seller_id', Auth::id())->where('status', 'pending')->sum('amount');
        $total_balance = $total_earnings_in_selected_currency - $withdraw ?? 0;

        $total_balance_data = number_format($total_balance,2);


        $seller_current_currency = Seller::find(Auth::id());
        $seller_current_currency_name = Currency::find($seller_current_currency->currency_id)->title;

        return view('dashboard', compact('vendorTotalSells', 'all_orders', 'total_customers', 'total_seller', 'totalProduct', 'recent_orders', 'currency_summary', 'formatted_total_current_currency_earnings', 'withdraw', 'total_balance_data', 'withdraw_request', 'seller_current_currency_name'));
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
    public function vendorDetails(Request $request)
    {
        //SET SELLER-ID
        $sellerId = Auth::id();

        //FETCH VENDOR/SELLER DETAILS
        $vendor = Seller::find($sellerId);

        $infoChangeRequest = InfoChangeRequest::where('seller_id', $sellerId)->first();
        //dd($infoChangeRequest);

        //COUNTRY LIST
        $countryList = Country::whereIn('country_name', array("Bangladesh"))->orderBy('country_name')->get();

        /**
         * PREPARE CATEGORY LIST ARRAY FOR 'ADD NEW CATEGORY' DROPDOWN LIST
         * EXISTING CATEGORIES AND ALREADY REQUESTED CATEGORIES WILL BE EXCLUDED FROM THAT LIST
         **/

        //EXISTING CATEGORIES
        $vendorCategories = $vendor->categories->pluck('category_id')->toArray();

        //ALREADY REQUESTED CATEGORIES
        $newCatRequests = $vendor->categoryRequests()->where('status', 'pending')->pluck('category_id')->toArray();

        //REQUESTED TO AVAIL AS A CHANGE TO OLD ONE
        $catChangeRequests = $vendor->catChangeRequests()->where('status', 'pending')->pluck('new_cat')->toArray();

        //MERGE EXISTING CATEGORIES AND ALREADY REQUESTED CATEGORIES TO PREPARE EXCLUDE-LIST
        $excludedCategories = array_merge($vendorCategories, $newCatRequests, $catChangeRequests);

        $categoryList = Category::where('parent_id', 'IS', 'NULL')->whereNotIn('id', $excludedCategories)->orderBy('title')->select('id', 'title')->get();
        /** */

        //RENDER VIEW
        return view('vendor.vendor_details', compact('vendor', 'countryList', 'infoChangeRequest', 'categoryList'));
    }

    //FUNCTION TO FETCH CITY LIST FOR A COUNTRY
    public function citiesForCountry(Request $request, $countryId)
    {
        $cityList = City::select('id', 'city_name AS text')->where('country_id', '=', $countryId)->orderBy('city_name')->get();
        return json_encode($cityList->toArray());
    }


    //FUNCTION TO UPDATE VENDOR DETAILS
    public function requestProfileUpdate(Request $request)
    {
        //VALIDATE INPUT
        $request->validate([
            'seller_id' => 'required|bail',
            'name' => 'max:100',
            'company_name' => Rule::requiredIf($request->input('account_type') == 'business'),
            'company_address' => Rule::requiredIf($request->input('account_type') == 'business'),
        ]);

        //VALID SELLER
        $sellerDetails = Seller::find($request->seller_id);
        if ($sellerDetails) {
            $infoChangeRequest = InfoChangeRequest::where('seller_id', $request->seller_id)->first();
            if (!$infoChangeRequest) {
                $infoChangeRequest = new InfoChangeRequest();
                $infoChangeRequest->seller_id = $request->seller_id;
            }

            //HANDLE NAME CHANGE REQUEST
            if ($request->filled('name') && !in_array($request->name, array($sellerDetails->name, $infoChangeRequest->name))) {
                $infoChangeRequest->name = $request->name;
            }

            //HANDLE EMAIL CHANGE REQUEST
            if ($request->filled('email') && !in_array($request->email, array($sellerDetails->email, $infoChangeRequest->email))) {
                $infoChangeRequest->email = $request->email;
            }

            //HANDLE GENDER CHANGE REQUEST
            if ($request->filled('gender') && !in_array($request->gender, array($sellerDetails->gender, $infoChangeRequest->gender))) {
                $infoChangeRequest->gender = $request->gender;
            }

            //HANDLE AGE CHANGE REQUEST
            if ($request->filled('age') && !in_array($request->age, array($sellerDetails->age, $infoChangeRequest->age))) {
                $infoChangeRequest->age = $request->age;
            }

            //HANDLE COUNTRY CHANGE REQUEST
            if ($request->filled('country') && !in_array($request->country, array($sellerDetails->country_id, $infoChangeRequest->country_id))) {
                $infoChangeRequest->country_id = $request->country;
            }

            //HANDLE CITY CHANGE REQUEST
            if ($request->filled('city') && !in_array($request->city, array($sellerDetails->city_id, $infoChangeRequest->city_id))) {
                $infoChangeRequest->city_id = $request->city;
            }

            //HANDLE SHOP-NAME CHANGE REQUEST
            if ($request->filled('shop_name') && !in_array($request->shop_name, array($sellerDetails->shop_name, $infoChangeRequest->shop_name))) {
                $infoChangeRequest->shop_name = $request->shop_name;
            }

            //HANDLE COMPANY-NAME CHANGE REQUEST
            if ($request->filled('company_name') && !in_array($request->company_name, array($sellerDetails->company_name, $infoChangeRequest->company_name))) {
                $infoChangeRequest->company_name = $request->company_name;
            }

            //HANDLE SHOP-ADDRESS CHANGE REQUEST
            if ($request->filled('shop_address') && !in_array($request->shop_address, array($sellerDetails->shop_address, $infoChangeRequest->shop_address))) {
                $infoChangeRequest->shop_address = $request->shop_address;
            }

            //HANDLE COMPANY-ADDRESS CHANGE REQUEST
            if ($request->filled('company_address') && !in_array($request->company_address, array($sellerDetails->company_address, $infoChangeRequest->company_address))) {
                $infoChangeRequest->company_address = $request->company_address;
            }

            //HANDLE ACCOUNT-TYPE CHANGE REQUEST
            if ($request->filled('account_type') && !in_array($request->account_type, array($sellerDetails->account_type, $infoChangeRequest->account_type))) {
                $infoChangeRequest->account_type = $request->account_type;
            }

            //HANDLE PHONE CHANGE REQUEST
            if ($request->filled('phone') && !in_array($request->phone, array($sellerDetails->phone, $infoChangeRequest->phone))) {
                $infoChangeRequest->phone = $request->phone;
            }


            if ($infoChangeRequest->save()) {
                return redirect()->back()->with('message', 'Youre changes are sent for approval');
            } else {
                return redirect()->back()->with('error', 'Something went wrong, please try again later');
            }
        } else {
            return redirect()->back()->with('error', 'Invalid seller');
        }
    }


    //REQUEST PHOTO UPDATE
    public function requestDocumentUpdate(Request $request)
    {
        //FETCH SELLER DETAILS
        $infoChangeRequest = InfoChangeRequest::where('seller_id', $request->seller_id)->first();

        if (!$infoChangeRequest) {
            $infoChangeRequest = new InfoChangeRequest();
            $infoChangeRequest->seller_id = $request->seller_id;
        }

        //VALIDATE INPUT
        $request->validate([
            'photo' => 'file|mimes:jpeg,jpg,png,svg,pdf|max:40960',
            'nid' => 'file|mimes:jpeg,jpg,png,svg,pdf|max:40960',
            'tin_certificate' => 'file|mimes:jpeg,jpg,png,svg,pdf|max:40960',
            'trade_license' => 'file',
            'mimes:jpeg,jpg,png,svg,pdf',
            'max:40960',
            'gst' => 'file',
            'mimes:jpeg,jpg,png,svg,pdf',
            'max:40960',
            'bank_check' => 'file',
            'mimes:jpeg,jpg,png,svg,pdf',
            'max:40960',
            'seller_id' => 'required'
        ]);

        //SAVE PHOTO
        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $request->photo->store('seller_attachments', 'akp_storage');
            $infoChangeRequest->photo_url = $request->photo->hashName();
        }

        //SAVE NID
        if ($request->hasFile('nid') && $request->file('nid')->isValid()) {
            $request->nid->store('seller_attachments', 'akp_storage');
            $infoChangeRequest->nid_url = $request->nid->hashName();
        }

        //SAVE TIN
        if ($request->hasFile('tin_certificate') && $request->file('tin_certificate')->isValid()) {
            $request->tin_certificate->store('seller_attachments', 'akp_storage');
            $infoChangeRequest->tin_certificate_url = $request->tin_certificate->hashName();
        }

        //SAVE TRADE LICENSE
        if ($request->hasFile('trade_license') && $request->file('trade_license')->isValid()) {
            $request->trade_license->store('seller_attachments', 'akp_storage');
            $infoChangeRequest->trade_license_url = $request->trade_license->hashName();
        }

        //SAVE GST
        if ($request->hasFile('gst') && $request->file('gst')->isValid()) {
            $request->gst->store('seller_attachments', 'akp_storage');
            $infoChangeRequest->gst_url = $request->gst->hashName();
        }

        //SAVE BANK CHEQUE
        if ($request->hasFile('bank_check') && $request->file('bank_check')->isValid()) {
            $request->bank_check->store('seller_attachments', 'akp_storage');
            $infoChangeRequest->bank_check_url = $request->bank_check->hashName();
        }

        //SAVE CHANGE REQUEST
        if ($infoChangeRequest->save()) {
            return redirect()->back()->with('message', 'Youre changes are sent for approval');
        } else {
            return redirect()->back()->with('error', 'Something went wrong, please try again later');
        }
    }


    public function requestNewCategory(Request $request)
    {
        //VERIFY AJAX
        if ($request->ajax()) {
            //GRAB REQUESTED CATEGORY ID'S FROM INPUT
            $newCategories = $request->input('categories');

            try {
                //START TRANSACTION
                DB::beginTransaction();

                //INSERT NEW CATEGORY REQUESTS
                foreach ($newCategories as $newCat) {
                    $categoryRequest = new CateogryRequest();
                    $categoryRequest->seller_id = Auth::id();
                    $categoryRequest->category_id = $newCat;
                    $categoryRequest->save();
                }

                //COMMIT CHANGES
                DB::commit();

                //RETURN SUCCESS RESPONSE
                return response()->json(array('status' => 1));
            } catch (\Exception $e) {
                //ROLLBACK CHANGES
                DB::rollback();

                //RETURN ERROR RESPONSE
                return response()->json(array('status' => 0));
            }
        }
        //NON AJAX REQUESTS ARE NOT ALLOWED
        else {
            return response()->json(array('status' => 0));
        }
    }


    public function requestCategoryChange(Request $request)
    {
        //VERIFY AJAX
        if ($request->ajax()) {
            $catChangeRequest = new CategoryChangeRequest();
            $catChangeRequest->seller_id = Auth::id();
            $catChangeRequest->old_cat = $request->old_cat;
            $catChangeRequest->new_cat = $request->new_cat;

            if ($catChangeRequest->save()) {
                //RETURN SUCCESS RESPONSE
                return response()->json(array('status' => 1));
            } else {
                //RETURN ERROR RESPONSE
                return response()->json(array('status' => 0));
            }
        }
        //NON AJAX REQUESTS ARE NOT ALLOWED
        else {
            return response()->json(array('status' => 0));
        }
    }


    public function changeHistory(Request $request)
    {
        //FETCH CHANGES LOGS IN DESCENDING ORDER SO THAT LATEST CHANGES ARE SHOWN FIRST
        $changeLogs = ChangeLog::where('seller_id', Auth::id())->latest()->get();
        //dd($changeLogs);

        return view('vendor.change_log', compact('changeLogs'));
    }
}
