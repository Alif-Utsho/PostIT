<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Token;

class AuthController extends Controller
{
    //
    public function login(Request $req){

        $email = $req->email;
        $password = $req->password;
        $user = User::where('email', $email)->first();

        if($user){
            if(Hash::check($req->password, $user->password)){

                $token = new Token();
                $token->user_id = $user->id;
                $token->type = $user->type;
                $token->token = Str::random(64);
                $token->save();

                return response()->json([
                    'status' => 200,
                    'user' => $user,
                    'token' => $token
                ], 200);
            }
            else{
                return response()->json([
                    'message' => "Invalid credential"
                ], 401);
            }
        }
        else{
            return response()->json([
                'message' => "User not found"
            ], 402);
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

    public function signout(Request $req){
        $token = Token::where('token', $req->header('token'))->first();
        $token->expired = true;
        
        if($token->save()){
            return response()->json([
                'status'=> 200
            ]);
        }
    }
}
