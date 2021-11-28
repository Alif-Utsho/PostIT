<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasFactory;

    public function profile(){
        return $this->hasOne(Profile::class);
    }

    public function request(){
        return $this->hasMany(Connection::class, 'receiver'); //->where('status', 'follower');
    }

    public function sent(){
        return $this->hasMany(Connection::class, 'sender'); //->where('status', 'follower');
    }

    public function friends(){
        return $this->hasMany(Connection::class, 'receiver')->where('status', 'friend'); // ->hasMany(Connection::class, 'sender')->where('status', 'friend');
    }

    // public function send_friends(){
    //     return $this->hasMany(Connection::class, 'sender')->where('status', 'friend');
    // }

    // public function friends(){
    //     return $this->rec_friends->merge($this->send_friends);
    // }


    public function posts(){
        return $this->hasMany(Post::class);
    }
}




// {
//     use HasApiTokens, HasFactory, Notifiable;

//     /**
//      * The attributes that are mass assignable.
//      *
//      * @var string[]
//      */
//     protected $fillable = [
//         'name',
//         'email',
//         'password',
//     ];

//     /**
//      * The attributes that should be hidden for serialization.
//      *
//      * @var array
//      */
//     protected $hidden = [
//         'password',
//         'remember_token',
//     ];

//     /**
//      * The attributes that should be cast.
//      *
//      * @var array
//      */
//     protected $casts = [
//         'email_verified_at' => 'datetime',
//     ];
// }
