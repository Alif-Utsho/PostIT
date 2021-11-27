<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Connection;

class ConnectionController extends Controller
{
    //

    public function users(){
        $user = session()->get('user');
        $users = User::with('profile')
                ->with('request')
                ->with('sent')
                ->where('type', 'users')
                // ->where('email', '!=', session()->get('user')->email)
                ->get();
        return response()->json([
            'users' => $users,
            'session' => $user
        ]);
    }


    public function connection(){
        $request = Connection::where('receiver', 2)
                ->where('status', 'follower')
                ->with('sender_profile')
                ->with('receiver_profile')
                ->with('sender')
                ->with('receiver')
                ->orderByDesc('created_at')
                ->get();

        $sent = Connection::where('sender', 2)
                ->where('status', 'follower')
                ->with('sender_profile')
                ->with('receiver_profile')
                ->with('sender')
                ->with('receiver')
                ->orderByDesc('created_at')
                ->get();
        
        $friend = Connection::where(function($query){
                                $query->where('receiver', 2)
                                      ->where('status', 'friend');
                            })
                ->orWhere(function($query){
                    $query->where('sender', 2)
                          ->where('status', 'friend');
                })
                ->with('sender_profile')
                ->with('receiver_profile')
                ->with('sender')
                ->with('receiver')
                ->orderByDesc('created_at')
                ->get();

        return response()->json([
            'request' => $request,
            'sent' => $sent,
            'friends' => $friend,
            'session' => session()->get('user')
        ]);
    }

    public function addFriend(Request $req){
        $var = new Connection();
        $var->sender = $req->sender;
        $var->receiver = $req->receiver;
        $session = session()->get('user');
        if($var->save()){
            return response()->json([
                'status' => 200,
                'message' => $var,
                'session' => $session
            ]);
        }
    }

    public function confirmRequest(Request $req){
        $id = $req->id;
        $request = Connection::find($id);
        $request->status = 'friend';

        if($request->save()) return response()->json([
            'request' => $request
        ]);
    }

    public function cancelRequest(Request $req){
        $id = $req->id;
        $request = Connection::find($id);
        
        if($request->delete()) return response()->json([
            'status' => 200
        ]);
    }

    public function unfriend(Request $req){
        $id = $req->id;
        $friend = Connection::find($id);

        if($friend->delete()) return response()->json([
            'status' => 200
        ]);
    }
}
