<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingFeeSetting;
use Illuminate\Support\Facades\DB;
use Session;
use Redirect;
use Illuminate\Support\Facades\Auth;

class ShippingFeeController extends Controller
{
    public function index()
    {
        $shippingFeeSettings = ShippingFeeSetting::where('seller_id', '=', Auth::id())->get()->toArray();

        return view('shipping_fee_setting', compact('shippingFeeSettings'));
    }

    public function addShippingSetting(Request $request)
    {
        //REQUEST->ID WILL BE NULL IF SHIPPING FEE DOESN'T EXIST
        //IF SHIPPING FEE ID EXISTS UPDATE
        if ($request->id) {

            //UPDATE SHIPPING FEE SETTINGS
            $cart = ShippingFeeSetting::where(['seller_id' => Auth::id()])
                ->update([
                    'shipping_fee_1_to_1000' => $request->shipping_fee_1_to_1000,
                    'shipping_fee_1001_to_3000' => $request->shipping_fee_1001_to_3000,
                    'shipping_fee_3001_to_5000' => $request->shipping_fee_3001_to_5000,
                    'shipping_fee_5001_to_10000' => $request->shipping_fee_5001_to_10000,
                    'shipping_fee_10001_to_15000' => $request->shipping_fee_10001_to_15000,
                    'shipping_fee_above_15000' => $request->shipping_fee_above_15000,
                    'seller_id' => Auth::id(),
                ]);

            return redirect()->route('shipping-fee')->with('message', "Shipping fee updated");

        }else{

            //INSERT SHIPPING FEE SETTINGS
            $shippingFeeSetting = new ShippingFeeSetting();

            $shippingFeeSetting->seller_id = Auth::id();
            $shippingFeeSetting->shipping_fee_1_to_1000 =  $request->shipping_fee_1_to_1000 ?? 0.00;
            $shippingFeeSetting->shipping_fee_1001_to_3000 =  $request->shipping_fee_1001_to_3000 ?? 0.00;
            $shippingFeeSetting->shipping_fee_3001_to_5000 =  $request->shipping_fee_3001_to_5000 ?? 0.00;
            $shippingFeeSetting->shipping_fee_5001_to_10000 =  $request->shipping_fee_5001_to_10000 ?? 0.00;
            $shippingFeeSetting->shipping_fee_10001_to_15000 =  $request->shipping_fee_10001_to_15000 ?? 0.00;
            $shippingFeeSetting->shipping_fee_above_15000 =  $request->shipping_fee_above_15000 ?? 0.00;

            if ($shippingFeeSetting->save()) 
            {
                return redirect()->route('shipping-fee')->with('message', "Shipping fee updated");
            } 
            else 
            {
                return redirect()->back()->withInput()->withErrors("Ooops !! Something went wrong, Please try again");
            }
        }
    }
}
