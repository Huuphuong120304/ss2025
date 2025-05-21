import React, { useState } from 'react';
import axios from 'axios'
export default function SpotifyLogin({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  const openLoginPopup = () => {
    const popup = window.open(
      'http://localhost:5000/login',
      '_blank',
      'width=500,height=600'
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      {/* Header */}
      <div className="w-full p-6">
        {/* Add your header content */}
      </div>

      {/* Login Form */}
      <div className="max-w-md w-full bg-neutral-900 rounded-lg p-8 my-8">
        <h1 className="text-3xl font-bold text-center mb-8">Log in to Spotify</h1>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={openLoginPopup}
            className="flex items-center justify-center w-full border border-gray-700 rounded-full py-3 px-4 space-x-2 hover:bg-neutral-800 transition"
          >
            <div className="flex items-center justify-center w-6 h-6">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>
            <span className="text-sm font-medium">Continue With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
