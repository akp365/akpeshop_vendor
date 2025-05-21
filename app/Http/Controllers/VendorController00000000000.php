<?php

namespace App\Http\Controllers;

use App\Models\CategoryChangeRequest;
use App\Models\CateogryRequest;
use App\Models\ChangeLog;
use App\Models\City;
use App\Models\Commission;
use App\Models\Country;
use App\Models\InfoChangeRequest;
use App\Models\Models\Category;
use App\Models\Seller;
use App\Models\SellerCategory;
use Illuminate\Http\Request;
use DataTables;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{

    public function vendorDetails(Request $request){
        //SET SELLER-ID
        $sellerId = Auth::id();
        
        //FETCH VENDOR/SELLER DETAILS
        $vendor = Seller::find($sellerId);

        $infoChangeRequest = InfoChangeRequest::where('seller_id', $sellerId)->first();
        //dd($infoChangeRequest);
        
        //COUNTRY LIST
        $countryList = Country::whereIn('country_name',array("Bangladesh"))->orderBy('country_name')->get();

        /** 
         * PREPARE CATEGORY LIST ARRAY FOR 'ADD NEW CATEGORY' DROPDOWN LIST
         * EXISTING CATEGORIES AND ALREADY REQUESTED CATEGORIES WILL BE EXCLUDED FROM THAT LIST
        **/

            //EXISTING CATEGORIES 
            $vendorCategories = $vendor->categories->pluck('category_id')->toArray();

            //ALREADY REQUESTED CATEGORIES
            $newCatRequests = $vendor->categoryRequests()->where('status','pending')->pluck('category_id')->toArray();

            //REQUESTED TO AVAIL AS A CHANGE TO OLD ONE
            $catChangeRequests = $vendor->catChangeRequests()->where('status', 'pending')->pluck('new_cat')->toArray();

            //MERGE EXISTING CATEGORIES AND ALREADY REQUESTED CATEGORIES TO PREPARE EXCLUDE-LIST
            $excludedCategories = array_merge($vendorCategories, $newCatRequests, $catChangeRequests);
            
            $categoryList = Category::where('parent_id', 'IS', 'NULL')->whereNotIn('id', $excludedCategories)->orderBy('title')->select('id','title')->get();
        /** */

        //RENDER VIEW
        return view('vendor.vendor_details',compact('vendor', 'countryList', 'infoChangeRequest', 'categoryList'));
    }

    //FUNCTION TO FETCH CITY LIST FOR A COUNTRY
    public function citiesForCountry(Request $request, $countryId){
        $cityList = City::select('id','city_name AS text')->where('country_id', '=', $countryId)->orderBy('city_name')->get();
        return json_encode($cityList->toArray());
    }


    //FUNCTION TO UPDATE VENDOR DETAILS
    public function requestProfileUpdate(Request $request){
        //VALIDATE INPUT
        $request->validate([
            'seller_id' => 'required|bail',
            'name' => 'max:100',
            'company_name' => Rule::requiredIf($request->input('account_type') == 'business'),
            'company_address' => Rule::requiredIf($request->input('account_type') == 'business'),
        ]);

        //VALID SELLER
        $sellerDetails = Seller::find($request->seller_id);
        if($sellerDetails)
        {
            $infoChangeRequest = InfoChangeRequest::where('seller_id', $request->seller_id)->first();
            if(!$infoChangeRequest)
            {
                $infoChangeRequest = new InfoChangeRequest();
                $infoChangeRequest->seller_id = $request->seller_id;
            }

            //HANDLE NAME CHANGE REQUEST
            if($request->filled('name') && !in_array( $request->name, array( $sellerDetails->name, $infoChangeRequest->name ) ) )
            {
                $infoChangeRequest->name = $request->name;
            }

            //HANDLE EMAIL CHANGE REQUEST
            if($request->filled('email') && !in_array( $request->email, array( $sellerDetails->email, $infoChangeRequest->email ) ) )
            {
                $infoChangeRequest->email = $request->email;
            }

            //HANDLE GENDER CHANGE REQUEST
            if($request->filled('gender') && !in_array( $request->gender, array( $sellerDetails->gender, $infoChangeRequest->gender ) ) )
            {
                $infoChangeRequest->gender = $request->gender;
            }

            //HANDLE AGE CHANGE REQUEST
            if($request->filled('age') && !in_array( $request->age, array( $sellerDetails->age, $infoChangeRequest->age ) ) )
            {
                $infoChangeRequest->age = $request->age;    
            }

            //HANDLE COUNTRY CHANGE REQUEST
            if($request->filled('country') && !in_array( $request->country, array( $sellerDetails->country_id, $infoChangeRequest->country_id ) ) )
            {
                $infoChangeRequest->country_id = $request->country;                       
            }

            //HANDLE CITY CHANGE REQUEST
            if($request->filled('city') && !in_array( $request->city, array( $sellerDetails->city_id, $infoChangeRequest->city_id ) ) )
            {
                $infoChangeRequest->city_id = $request->city;                    
            }

            //HANDLE SHOP-NAME CHANGE REQUEST
            if($request->filled('shop_name') && !in_array( $request->shop_name, array( $sellerDetails->shop_name, $infoChangeRequest->shop_name ) ) )
            {
                $infoChangeRequest->shop_name = $request->shop_name;                    
            }

            //HANDLE COMPANY-NAME CHANGE REQUEST
            if($request->filled('company_name') && !in_array( $request->company_name, array( $sellerDetails->company_name, $infoChangeRequest->company_name ) ) )
            {
                $infoChangeRequest->company_name = $request->company_name;                    
            }

            //HANDLE SHOP-ADDRESS CHANGE REQUEST
            if($request->filled('shop_address') && !in_array( $request->shop_address, array( $sellerDetails->shop_address, $infoChangeRequest->shop_address ) ) )
            {
                $infoChangeRequest->shop_address = $request->shop_address;                    
            }

            //HANDLE COMPANY-ADDRESS CHANGE REQUEST
            if($request->filled('company_address') && !in_array( $request->company_address, array( $sellerDetails->company_address, $infoChangeRequest->company_address ) ) )
            {
                $infoChangeRequest->company_address = $request->company_address;                    
            }

            //HANDLE ACCOUNT-TYPE CHANGE REQUEST
            if($request->filled('account_type') && !in_array( $request->account_type, array( $sellerDetails->account_type, $infoChangeRequest->account_type ) ) )
            {
                $infoChangeRequest->account_type = $request->account_type;                    
            }

            //HANDLE PHONE CHANGE REQUEST
            if($request->filled('phone') && !in_array( $request->phone, array( $sellerDetails->phone, $infoChangeRequest->phone ) ) )
            {
                $infoChangeRequest->phone = $request->phone;                    
            }

            
            if($infoChangeRequest->save())
            {
                return redirect()->back()->with('message','Youre changes are sent for approval');
            }
            else
            {
                return redirect()->back()->with('error','Something went wrong, please try again later');
            }
        }
        else
        {
            return redirect()->back()->with('error','Invalid seller');
        }
    }


    //REQUEST PHOTO UPDATE
    public function requestDocumentUpdate(Request $request){
        //FETCH SELLER DETAILS
        $infoChangeRequest = InfoChangeRequest::where('seller_id', $request->seller_id)->first();

        if(!$infoChangeRequest)
        {
            $infoChangeRequest = new InfoChangeRequest();
            $infoChangeRequest->seller_id = $request->seller_id;
        }

        //VALIDATE INPUT
        $request->validate([
            'photo' => 'file|mimes:jpeg,jpg,png,svg,pdf|max:40960',
            'nid' => 'file|mimes:jpeg,jpg,png,svg,pdf|max:40960',
            'tin_certificate' => 'file|mimes:jpeg,jpg,png,svg,pdf|max:40960',
            'trade_license' => 'file','mimes:jpeg,jpg,png,svg,pdf','max:40960',
            'gst' => 'file','mimes:jpeg,jpg,png,svg,pdf','max:40960',
            'bank_check' => 'file','mimes:jpeg,jpg,png,svg,pdf','max:40960',
            'seller_id' => 'required'
        ]);

        //SAVE PHOTO
        if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $request->photo->store('seller_attachments','akp_storage');
            $infoChangeRequest->photo_url = $request->photo->hashName();
        }

        //SAVE NID
        if ($request->hasFile('nid') && $request->file('nid')->isValid()) {
            $request->nid->store('seller_attachments','akp_storage');
            $infoChangeRequest->nid_url = $request->nid->hashName();
        }

        //SAVE TIN
        if ($request->hasFile('tin_certificate') && $request->file('tin_certificate')->isValid()) {
            $request->tin_certificate->store('seller_attachments','akp_storage');
            $infoChangeRequest->tin_certificate_url = $request->tin_certificate->hashName();
        }

        //SAVE TRADE LICENSE
        if ($request->hasFile('trade_license') && $request->file('trade_license')->isValid()) {
            $request->trade_license->store('seller_attachments','akp_storage');
            $infoChangeRequest->trade_license_url = $request->trade_license->hashName();
        }

        //SAVE GST
        if ($request->hasFile('gst') && $request->file('gst')->isValid()) {
            $request->gst->store('seller_attachments','akp_storage');
            $infoChangeRequest->gst_url = $request->gst->hashName();
        }

        //SAVE BANK CHEQUE
        if ($request->hasFile('bank_check') && $request->file('bank_check')->isValid()) {
            $request->bank_check->store('seller_attachments','akp_storage');
            $infoChangeRequest->bank_check_url = $request->bank_check->hashName();
        }

        //SAVE CHANGE REQUEST
        if($infoChangeRequest->save())
        {
            return redirect()->back()->with('message','Youre changes are sent for approval');
        }
        else
        {
            return redirect()->back()->with('error','Something went wrong, please try again later');
        }
    }


    public function requestNewCategory(Request $request){
        //VERIFY AJAX
        if($request->ajax())
        {
            //GRAB REQUESTED CATEGORY ID'S FROM INPUT   
            $newCategories = $request->input('categories');

            try{
                //START TRANSACTION
                DB::beginTransaction();

                //INSERT NEW CATEGORY REQUESTS
                foreach($newCategories as $newCat)
                {
                    $categoryRequest = new CateogryRequest();
                    $categoryRequest->seller_id = Auth::id();
                    $categoryRequest->category_id = $newCat;
                    $categoryRequest->save();
                }

                //COMMIT CHANGES
                DB::commit();

                //RETURN SUCCESS RESPONSE
                return response()->json(array('status' => 1));
            }catch(\Exception $e){
                //ROLLBACK CHANGES
                DB::rollback();

                //RETURN ERROR RESPONSE
                return response()->json(array('status' => 0));
            }
        }
        //NON AJAX REQUESTS ARE NOT ALLOWED
        else
        {
            return response()->json(array('status' => 0));
        }
    }


    public function requestCategoryChange(Request $request){
        //VERIFY AJAX
        if($request->ajax())
        {
            $catChangeRequest = new CategoryChangeRequest();
            $catChangeRequest->seller_id = Auth::id();
            $catChangeRequest->old_cat = $request->old_cat;
            $catChangeRequest->new_cat = $request->new_cat;
            
            if($catChangeRequest->save())
            {
                //RETURN SUCCESS RESPONSE
                return response()->json(array('status' => 1));
            }
            else
            {
                //RETURN ERROR RESPONSE
                return response()->json(array('status' => 0));
            }
        }
        //NON AJAX REQUESTS ARE NOT ALLOWED
        else
        {
            return response()->json(array('status' => 0));
        }
    }


    public function changeHistory(Request $request){
        //FETCH CHANGES LOGS IN DESCENDING ORDER SO THAT LATEST CHANGES ARE SHOWN FIRST
        $changeLogs = ChangeLog::where('seller_id',Auth::id())->latest()->get();
        //dd($changeLogs);

        return view('vendor.change_log',compact('changeLogs'));
    }
}
