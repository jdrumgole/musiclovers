// ArtistSearch.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../css/artistsearch.css";
import AlbumsList from "../components/AlbumList";

const ArtistSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const location = useLocation();
  const accessToken = new URLSearchParams(location.hash.substring(1)).get(
    "access_token"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch();
    }
  }, [debouncedSearchQuery]);

  const handleSearch = async () => {
    try {
      if (!accessToken) {
        console.error(
          "Access token is missing. Please authenticate with Spotify."
        );
        return;
      }

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${debouncedSearchQuery}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const artists = data.artists.items;
        setSearchResults(artists);
      } else {
        console.error("Error searching for artists");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="artist-search">
      <h2>Spotify Artist Search</h2>
      <div className="search-container">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search for an artist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="button-transparent">
            <i className="fa fa-search search-icon"></i>
          </button>
        </div>
      </div>

      <div className="search-results">
        {searchResults.map((artist) => (
          <AlbumsList key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default ArtistSearch;
