<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class AuthController extends Controller
{
    //
    public function login(Request $req){

        $email = $req->email;
        $password = $req->password;
        $user = User::where('email', $email)->first();

        if($user){
            if(Hash::check($req->password, $user->password)){
                // session()->put('user', $user);
                session()->flush();
                session(['username'=>$user->email]);
                return response()->json([
                    'status' => 200,
                    'user' => $user,
                    'session' => session()->get('username')
                ]);
            }
            else{
                return response()->json([
                    'status' => 401,
                    'message' => "Invalid credential"
                ]);
            }
        }
        else{
            return response()->json([
                'status' => 402,
                'message' => "User not found"
            ]);
        }

    }

    public function register(Request $req){
        $var = new User();
        $var->name = $req->name;
        $var->phone = $req->phone;
        $var->email = $req->email;
        $var->password = Hash::make($req->password);
        if($var->save()){
            return response()->json([
                'status' => 200,
                'message' => 'User registered'
            ]);
        }
        else{
            return response()->json([
                'status' => 504,
                'message' => 'User can\'t registered'
            ]);
        }


    }

    public function signout(){
        session()->flush();
        return redirect()->route('home');
    }
}
