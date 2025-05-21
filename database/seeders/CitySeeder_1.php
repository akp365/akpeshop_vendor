<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //BANGLADESH
        // $jsonData = json_decode(file_get_contents("https://raw.githubusercontent.com/fahimxyz/bangladesh-geojson/master/bd-districts.json")); 
        // $cntItem = Country::find(18);
        // $insertArray = array();
        // foreach($jsonData->districts as $cityKey => $cityItem)
        // {  
        //     $insertArray[] = array('city_name' => $cityItem->name, 'country_id' => 18);
        // }
        // $cntItem->cities()->createMany($insertArray);

        //INDIA
        // $jsonData = json_decode(file_get_contents("https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json")); 
        // $cntItem = Country::find(88);
        // $insertArray = array();
        // foreach($jsonData as $cityKey => $cityItem)
        // {  
        //     $insertArray[] = array('city_name' => $cityItem->name);
        // }
        // $cntItem->cities()->createMany($insertArray);
    }
}
