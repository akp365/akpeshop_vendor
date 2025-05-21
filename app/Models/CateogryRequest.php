<?php

namespace App\Models;

use App\Models\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CateogryRequest extends Model
{
    use HasFactory;

    protected $table = 'category_requests';

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id', 'id');
    }
}
