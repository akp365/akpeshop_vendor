<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Models\Category;
use Illuminate\Http\Request;

class HelperController extends Controller
{
    //FUNCTION TO FETCH CITY LIST FOR A COUNTRY
    public function citiesForCountry(Request $request, $countryId){
        $cityList = City::select('id','city_name AS text')->where('country_id', '=', $countryId)->orderBy('city_name')->get();
        return json_encode($cityList->toArray());
    }

    //FUNCTION TO FETCH CITY LIST FOR A COUNTRY
    //THIS FUNCTION APPEND 'ALL' AT THE TOP
    public function citiesForCountryWithAll(Request $request, $countryId){
        $cityList = City::select('id','city_name AS text')->where('country_id', '=', $countryId)->orderBy('city_name')->get();
        $output = array(array('id' => 99999,'text' => 'All'));
        $output = array_merge($output, $cityList->toArray());
        return json_encode($output);
    }

    //FUNCTION TO FETCH SUBCAT LIST FOR A CATEGORY
    public function subcatOfCat(Request $request, $categoryId){
        $subcatList = Category::select('id','title AS text')->where('parent_id', '=', $categoryId)->orderBy('title')->get();
        $output = $subcatList->toArray();
        return json_encode($output);
    }
}
