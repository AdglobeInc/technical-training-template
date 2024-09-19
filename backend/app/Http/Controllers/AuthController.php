<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $this->loginCore($user);

        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'token' => $token,
        ], 201, ['Location' => "/api/users/$user->id"]);
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();

            if ($user instanceof User) {
                $token = $this->loginCore($user);
                return response()->json(['token' => $token], 200);
            }
        }
        return response()->json([
            'cause' => ['message' => '認証に失敗しました。']
        ], 401);
    }

    private function loginCore(User $user)
    {
        return $user->createToken('AccessToken')->plainTextToken;
    }

    public function user(Request $request)
    {
        return response()->json([
            'name' => $request->user()->name,
            'email' => $request->user()->email,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->noContent();
    }
}
