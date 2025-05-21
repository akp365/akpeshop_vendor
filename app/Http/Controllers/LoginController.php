<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'account_status' => 'active'])) {
            // Authentication passed...
            return redirect()->intended('dashboard');
        }
        return redirect()->back()->withInput()->withErrors("Incorrect email address or password");
    }


    public function forgotPassword(Request $request){
        return view('forgot_password');
    }


    public function sendPwdResetToken(Request $request){
        $user = DB::table('sellers')->where('email', '=', $request->email)->first();
        //dd($user);

        //Check if the user exists
        if (!$user) {
            return redirect()->back()->withErrors(['email' => 'User does not exist']);
        }

        //Create Password Reset Token
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => Str::random(60),
            'created_at' => Carbon::now()
        ]);

        //Get the token just created above
        $tokenData = DB::table('password_resets')
        ->where('email', $request->email)->first();

        if ($this->sendResetEmail($request->email, $tokenData->token)) {
            return redirect()->back()->with('message', 'Password reset link has been sent to your email address');
        } else {
            return redirect()->back()->withErrors(['email' => 'Oops ! something went wrong, please try again later !']);
        }
    }


    private function sendResetEmail($email, $token)
    {
        //Retrieve the user from the database
        $user = DB::table('sellers')->where('email', $email)->select('name', 'email')->first();
        //Generate, the password reset link. The token generated is embedded in the link
        $link = URL::to('/') . '/password/reset/' . $token . '?email=' . urlencode($user->email);

        try {

            //SEND EMAIL
            $details = [
                'title' => 'Reset your password',
                'name' => $user->name,
                'password_reset_url' => $link,
            ];

            \Mail::to($email)->send(new \App\Mail\ResetPasswordEmail($details));

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }


    public function resetPassword(Request $request, $token){
        return view('reset_password', ['token' => $token, 'email' => $request->email]);
    }


    public function saveNewPassword(Request $request){
        //Validate input
        $request->validate([
            'email' => 'required|email|exists:sellers,email',
            'password' => 'required|confirmed|min:6',
            'token' => 'required' ]);

        $password = $request->password;

        // Validate the token
        $tokenData = DB::table('password_resets')
        ->where('token', $request->token)->first();

        // Redirect the user back to the password reset request form if the token is invalid
        if (!$tokenData) return view('forgot_password');

        $seller = Seller::where('email', $tokenData->email)->first();

        // Redirect the user back if the email is invalid
        if (!$seller) return redirect()->back()->withErrors(['email' => 'Email not found']);

        //Hash and update the new password
        $seller->password = \Hash::make($password);
        $seller->update(); //or $seller->save();

        //Delete the token
        DB::table('password_resets')->where('email', $seller->email)
        ->delete();

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password, 'account_status' => 'active'])) {
            // Authentication passed...
            return redirect()->intended('my-info');
        }
    }
}
