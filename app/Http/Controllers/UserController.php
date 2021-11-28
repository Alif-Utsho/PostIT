<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Connection;
use App\Models\Profile;

class UserController extends Controller
{
    //
    
    public function singleUser(Request $req){
        $user = User::where('id', $req->id)
                ->with('profile')
                ->with('friends')
                ->with('request')
                ->with('sent')
                ->with('posts')
                ->first();

        return response()->json([
            'user'=> $user
        ]);
    }

    public function editprofile(Request $req){
        $user = User::where('id', $req->id)->first();
        $user->name = $req->name;

        $profile = Profile::where('user_id', $req->id)->first();
        if(!$profile){
            $profile= new Profile();
        }
        $profile->user_id = $req->id;
        $profile->bio = $req->bio;
        $profile->fb = $req->fb;
        $profile->instagram = $req->instagram;
        $profile->linkedin = $req->linkedin;
        $profile->github = $req->github;

        if($user->save() && $profile->save())return response()->json([
            'status'=> 200,
            'message' => 'Profile updated'
        ]);
        else return response()->json([
            'status'=>401,
            'message'=>'Something went wrong'
        ]);
    }
}
