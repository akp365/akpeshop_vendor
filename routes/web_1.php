<?php

use App\Http\Controllers\OrderController;
use App\Models\Models\SiteLook;
use Facade\FlareClient\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//HOME
Route::get('/', function () {
    if (Auth::check()) {
        return redirect('my-info');
    }
    return redirect('login');
})->name('home');

//LOGIN
Route::get('login', function () {
    if (Auth::check()) {
        return redirect('my-info');
    }
    return view('login');
})->name('login');

//LOGOUT
Route::get('logout', function(){
    Auth::logout();
    return redirect('/');
})->name('logout');

//LOGIN POST METHOD
Route::post('authenticate', [App\Http\Controllers\LoginController::class, 'authenticate'])->name('authenticate');

//FORGOT PASSWORD
Route::get('forgot-password', [App\Http\Controllers\LoginController::class, 'forgotPassword'])->name('forgot-password');
Route::post('forgot-password', [App\Http\Controllers\LoginController::class, 'sendPwdResetToken'])->name('forgot-password');
Route::get('password/reset/{token}', [App\Http\Controllers\LoginController::class, 'resetPassword'])->name('password/reset');
Route::post('reset-password', [App\Http\Controllers\LoginController::class, 'saveNewPassword'])->name('reset-password');

Route::middleware(['auth'])->group(function () {
    //HOME
    Route::get('my-info', [App\Http\Controllers\VendorController::class, 'vendorDetails'])->name('my-info');

    //UPDATE SELLER INFO
    Route::post('request-profile-update', [App\Http\Controllers\VendorController::class,'requestProfileUpdate'])->name('request-profile-update');  

    //CITY LIST API URL
    Route::get('cities-for-country/{countryId}',[App\Http\Controllers\HelperController::class, 'citiesForCountry'])->name('cities-for-country');
    Route::get('cities-for-country-2/{countryId}',[App\Http\Controllers\HelperController::class, 'citiesForCountryWithAll'])->name('cities-for-country-2');

    //UPDATE PHOTO
    Route::post('request-document-update', [App\Http\Controllers\VendorController::class, 'requestDocumentUpdate'])->name('request-document-update');

    //ADD NEW CATEGORY
    Route::post('request-new-category', [App\Http\Controllers\VendorController::class, 'requestNewCategory'])->name('request-new-category');

    //UPDATE OLD CATEGORY
    Route::post('request-category-change', [App\Http\Controllers\VendorController::class, 'requestCategoryChange'])->name('request-category-change');

    //CHANGE HISTORY
    Route::get('my-change-history', [App\Http\Controllers\VendorController::class, 'changeHistory'])->name('my-change-history');
    
    //Order Controller
    Route::get('order/view', [OrderController::class, 'index'])->name('order');
    Route::get('order/list',[OrderController::class, 'orderList'])->name('order-list');


    //PRODUCTS
    Route::get('products/add-new', [App\Http\Controllers\ProductController::class, 'addNewProduct'])->name('add-new-product');
    Route::post('products/add-new', [App\Http\Controllers\ProductController::class, 'saveNewProduct'])->name('add-new-product');
    Route::get('products/list',[App\Http\Controllers\ProductController::class, 'productList'])->name('product-list');
    Route::get('product/details/{productId}',[App\Http\Controllers\ProductController::class, 'productDetails'])->name('product-details');
    Route::post('delete-product', [App\Http\Controllers\ProductController::class, 'deleteProduct'])->name('delete-product');
    Route::post('update-product', [App\Http\Controllers\ProductController::class, 'updateProduct'])->name('update-product');
    Route::post('change-product-status', [App\Http\Controllers\ProductController::class, 'changeProductStatus'])->name('change-product-status');
    Route::post('renew-product-offer', [App\Http\Controllers\ProductController::class, 'renewProductOffer'])->name('renew-product-offer');

    //CATEGORY LIST API URL
    Route::get('subcat-of-cat/{categoryId}',[App\Http\Controllers\HelperController::class, 'subcatOfCat'])->name('subcat-of-cat');

    //STORE LOOKS
    Route::get("store-looks", [App\Http\Controllers\StoreController::class, 'storeLooks'])->name('store-looks');
    Route::post("save-logo", [App\Http\Controllers\StoreController::class, 'saveLogo'])->name('save_logo');
    Route::post("save-banner", [App\Http\Controllers\StoreController::class, 'saveBanner'])->name('save_banner');

    //SHIPPING FEE
    Route::get("shipping-fee", [App\Http\Controllers\ShippingFeeController::class, 'index'])->name('shipping-fee');
    Route::post("add-new-shipping-setting", [App\Http\Controllers\ShippingFeeController::class, 'addShippingSetting'])->name('add-new-shipping-setting');

});


