<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Post;
use App\Models\React;


class PostController extends Controller
{
    //
    public function posts(){
        
        $posts = Post::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'posts' => $posts
        ]);

    }

    public function singlePost(Request $req){
        $post = Post::where('id', $req->id)
            ->with('user')
            ->with('reacts')
            ->first();
        return response()->json([
            'post'=>$post
        ]);
    }

    public function createPost(Request $req){

        $var = new Post();
        $var->user_id = $req->user_id;
        $var->desc = $req->desc;
        if($var->save()){
            return response()->json([
                'post' => $req->desc
            ]);
        }
        else{
            return response()->json([
                'message' => 'something went wrong'
            ]);
        }
    }

    public function editPost(Request $req){
        $post = Post::find($req->id);
        $post->desc = $req->desc;
        if($post->save()){
            return response()->json([
                'message'=> 'Post updated'
            ]);
        }
    }

    public function deletePost(Request $req){
        $var = Post::find($req->id);

        $reacts = React::where('post_id', $req->id)->get();
        if(count($reacts) > 0 ) $reacts->each->delete();
        
        if($var->delete()){
            return response()->json([
                'message'=> 'Post Deleted'
            ]);
        }
        
    }
}
