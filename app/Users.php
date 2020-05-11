<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    //
    protected $table="address";


   // protected $touches = ['city_id'];

    public $timestamps = true;

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
