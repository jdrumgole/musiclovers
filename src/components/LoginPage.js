// LoginPage.js
import React from "react";
import "../css/loginpage.css";

// import { Link } from "react-router-dom";

const SPOTIFY_CLIENT_ID = "e2c08011b5d94732afddde7cbc6e0815";
const REDIRECT_URI = "http://localhost:3000/artist-search";

const LoginPage = () => {
  const handleSpotifyLogin = () => {
    const state = Math.random().toString(36).substring(7);

    const spotifyAuthURL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user-library-read&state=${state}`;

    sessionStorage.setItem("spotifyAuthState", state);

    window.location.href = spotifyAuthURL;
  };

  return (
    <div className="login-content">
      <div className="wrapper">
          <div className="spotify-loginPage">
            <h1>Login with Spotify</h1>
            <div className="container mt-4">
              <button onClick={handleSpotifyLogin}>
              <span>Login</span>
              <i className="fab fa-spotify"></i>
              </button>
            </div>
          </div> 
      </div>
    </div>
    
  );
};

export default LoginPage;
