<?php

namespace App\Http\Controllers\Api;

use App\City;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Users;
use Illuminate\Http\File;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Storage;
use XMLWriter;
use Symfony\Component\HttpFoundation\Response;

class AddressBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $result = Users::with("city")->get();
        //dd($result);
        return $result;
    }

    public function getCitiesList()
    {
        $result = City::all();
        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        //dd($request->user["name"]);
        $user = new Users();
        $user->name = $request->user["name"];
        $user->first_name = $request->user["firstName"];
        $user->email_id = $request->user["email"];
        $user->street = $request->user["street"];
        $user->zip_code = $request->user["zipcode"];
        $user->city_id = $request->user["city"];

        if($user->save()) {
            return response()->json(["msg"=>"success"]);
        }
        else{
            return response()->json(["msg"=>"failure"]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
      //  dd($id);
      $result = Users::find($id);
      return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
       // dd($request->name);

        $user = Users::find($id);
        $user->name = $request->name;
        $user->first_name = $request->firstName;
        $user->email_id = $request->email;
        $user->street = $request->street;
        $user->zip_code = $request->zipcode;
        $user->city_id = $request->city;

        if($user->update()) {
            return response()->json(["msg"=>"success"]);
        }
        else{
            return response()->json(["msg"=>"failure"]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function exportXml() {

        $users = Users::all();

        //dd($users);
        

        $xml  = new XMLWriter();
        $xml->openUri(storage_path("app/example.xml"));
        $xml->startDocument('1.0');
        $xml->startElement('users');

        foreach($users as $user) {
            //dd($user);
            $xml->startElement('User');
            $xml->writeElement('Name', $user->name);
            $xml->writeElement('FirstName', $user->first_name);
            $xml->writeElement('Email', $user->email_id);
            $xml->writeElement('Street', $user->street);
            $xml->writeElement('ZipCode', $user->zip_code);
            $xml->writeElement('City', $user->city->city_name);
            $xml->endElement();

        }
        $xml->endElement();
        $xml->endDocument();
        $xml->flush();

        $file = storage_path("app/example.xml");

        $headers = array(
            'Cache-Control :public',
            'Content-Transfer-Encoding' => 'binary',
            'Content-Description' => 'File Transfer',
            'Content-Type: application/xml',
           
          );

          $fileContent = FacadesFile::get($file);
           
          return response($fileContent);

    }

    public function exportJson(){

        $users = Users::all();

        $file = Storage::put("app\users.json",$users);

        return response()->json($users);

    }
}
