import React from "react";
import { Link } from "react-router-dom";

// Function to calculate star rating
const calculateStarRating = (popularity) => {
  if (popularity >= 90) {
    return "★★★★★";
  } else if (popularity >= 70) {
    return "★★★★☆";
  } else if (popularity >= 50) {
    return "★★★☆☆";
  } else if (popularity >= 30) {
    return "★★☆☆☆";
  } else {
    return "★☆☆☆☆";
  }
};

const AlbumsList = ({ artist }) => {
  // You can add your custom logic to format the artist's information here
  return (
    <Link to={`/artist/${artist.id}`} className="card-link">
      <div className="card card-spotify" style={{ width: "18rem" }}>
        <img src={artist.images[0]?.url} alt={artist.name} />

        <div className="card-body">
          <h3 className="card-title">{artist.name}</h3>
          <p className="card-text">({artist.followers.total} followers)</p>
          <p className="card-text">{calculateStarRating(artist.popularity)}</p>
        </div>
      </div>
    </Link>
  );
};

export default AlbumsList;
