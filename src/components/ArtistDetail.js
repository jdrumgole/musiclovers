import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/artistsearch.css";

const ArtistDetail = () => {
  const { artistId } = useParams();
  const [artistInfo, setArtistInfo] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const accessToken =
          "BQCGUZdNayLliiq1Zp2p8ONuTD3LEhWkQ5zvjYeFNk-gCkVrOGT50ODrv8bCLGJKTk7TmDE0lM1lYGOEvPDGvpHGZdvsPyfc_SSj9KL0OHhw0m36CpfUlci981_IPGCW-UuyvkdCRGwUxxke67KZ_KHAhbnTP1Xd1syH2--bLQnZ0MIZYA2IS-OTaErnm7L9rvYuY1Pnt91d0TLs";
        const artistResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (artistResponse.ok) {
          const artistData = await artistResponse.json();
          setArtistInfo(artistData);
        } else {
          console.error("Error fetching artist details");
        }

        const songsResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (songsResponse.ok) {
          const songsData = await songsResponse.json();
          setArtistSongs(songsData.tracks);
        } else {
          console.error("Error fetching artist's top tracks");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (loading) {
    return <div>Loading artist details...</div>;
  }

  if (!artistInfo) {
    return <div>Artist not found.</div>;
  }

  return (
    <>
      {/* <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/artist-search">Search</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {artistInfo.name}
          </li>
        </ol>
      </nav> */}
      <div className="artist-detail">
        <h2>{artistInfo.name}</h2>
        {/* <p>Followers: {artistInfo.followers.total}</p> */}
        <h3>Albums</h3>
        <div className="card-deck">
          {artistSongs.map((song) => (
            <div class="card card-spotify" style={{ width: "18rem" }}>
              <img
                src={song.album.images[0].url}
                class="card-img-top"
                alt={song.name}
              />
              <div class="card-body card-body-spotify-albums">
                <h5 class="card-title card-header-spotify">{song.name}</h5>
                <p className="card-header-spotify">{artistInfo.name}</p>
                <p class="card-text card-body-spotify">
                  {" "}
                  {song.album.release_date}
                </p>
                <p class="card-text card-body-spotify">
                  {song.album.total_tracks} trackes
                </p>
                <div class="card-footer">
                  <small class="text-body-secondary">
                    <Link
                      to={song.external_urls.spotify}
                      className="preview-on-spotify-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Preview on Spotify
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ArtistDetail;
