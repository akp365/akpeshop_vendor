<?php

namespace App\Http\Controllers;

use App\Models\StoreLook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class StoreController extends Controller
{
    public function storeLooks(Request $request){
        //-- COLLECT CURRENT LOOKS 
        $currentLook = StoreLook::where('seller_id', Auth::id())->first();
        //dd($currentLook);

        return view('vendor.looks', ['currentLook' => $currentLook]);
    }

    function saveLogo(Request $request){
        $validator = Validator::make(
        $request->all(),
        [
            'image' => 'required|file|mimes:jpeg,jpg,png,svg|max:10000',
        ]
        );

        //IMAGE IS NOT VALID
        if ($validator->fails()) {
            $errorMessage = "";
            foreach ($validator->errors()->getMessages() as $key => $data) {
                $errorMessage .= implode("\n\r", $data);
            }
            return ['status' => 0, 'message' => $errorMessage];
        }


        //IMAGE IS VALID
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            //UPLOAD IMAGE
            $request->image->store('store_looks' . '/' . Auth::id(),'akp_storage');

            //-- GRAB SITE LOOK
            $currentLook = StoreLook::where('seller_id', Auth::id())->first();
            if($currentLook){
            }else{
                $currentLook = new StoreLook();
                $currentLook->seller_id = Auth::id();
            }

            //-- SET LOGO
            $currentLook->logo = $request->image->hashName();

            //SAVE THE CHANGES AND RETURN 1
            if($currentLook->save())
            {
                return response()->json(array('status' => 1));
            }
            //STATUS 0 IF FAIL TO SAVE
            else
            {
                return response()->json(array('status' => 0));
            }
        }

    }

    
    function saveBanner(Request $request){
        $validator = Validator::make(
        $request->all(),
        [
            'image' => 'required|file|mimes:jpeg,jpg,png,svg|max:10000',
        ]
        );

        //IMAGE IS NOT VALID
        if ($validator->fails()) {
            $errorMessage = "";
            foreach ($validator->errors()->getMessages() as $key => $data) {
                $errorMessage .= implode("\n\r", $data);
            }
            return ['status' => 0, 'message' => $errorMessage];
        }


        //IMAGE IS VALID
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            //UPLOAD IMAGE
            $request->image->store('store_looks' . '/' . Auth::id(),'akp_storage');

            //-- GRAB SITE LOOK
            $currentLook = StoreLook::where('seller_id', Auth::id())->first();
            if($currentLook){
            }else{
                $currentLook = new StoreLook();
                $currentLook->seller_id = Auth::id();
            }

            //-- SET LOGO
            $currentLook->banner = $request->image->hashName();

            //SAVE THE CHANGES AND RETURN 1
            if($currentLook->save())
            {
                return response()->json(array('status' => 1));
            }
            //STATUS 0 IF FAIL TO SAVE
            else
            {
                return response()->json(array('status' => 0));
            }
        }

    }
}
