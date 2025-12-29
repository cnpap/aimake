<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class GithubController extends Controller
{
    /**
     * Redirect the user to GitHub's authentication page.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('github')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     */
    public function callback(Request $request): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver('github')->user();
        } catch (Throwable) {
            return redirect()
                ->route('login')
                ->with('status', 'GitHub 登录失败，请重试。');
        }

        $email = $socialUser->getEmail();

        if (! $email) {
            return redirect()
                ->route('login')
                ->with('status', 'GitHub 未提供邮箱，无法登录。');
        }

        $avatarUrl = $socialUser->getAvatar();

        $user = User::query()->firstOrCreate(
            ['email' => $email],
            [
                'name' => $socialUser->getName() ?: $socialUser->getNickname() ?: 'GitHub 用户',
                'avatar' => $avatarUrl,
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
            ]
        );

        if ($avatarUrl && $user->avatar !== $avatarUrl) {
            $user->forceFill(['avatar' => $avatarUrl])->save();
        }

        Auth::login($user, remember: true);

        return redirect()->intended(route('dashboard'));
    }
}
