<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    //
    protected $touches = ['id'];

    public function users(){

        return $this->hasMany(Users::class);
    }
}
