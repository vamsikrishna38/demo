<?php

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('addressdetails','Api\AddressBookController@index');

Route::get('citydetails','Api\AddressBookController@getCitiesList');

Route::post('saveuser','Api\AddressBookController@store');

Route::get('details/{id}','Api\AddressBookController@edit');

Route::put('update/{id}', 'Api\AddressBookController@update');

Route::get('exportxml','Api\AddressBookController@exportXml');

Route::get('exportjson','Api\AddressBookController@exportJson');