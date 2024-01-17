import React from "react";
import { Link } from "react-router-dom";
import spotifyLogo from "../images/Spotify-Logo.png";
import "../css/NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className='nav'>
        <a href='/' className="site-title"> MusicLovers </a>
          <ul>
            <li>
              <a href='/Home'> Home</a>
            </li>
            <li>
              <a href='/playlist'> Playlist </a>
            </li>
          </ul>
        
      </nav>
    </>
  );
};

export default NavBar;
