import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar"; // Correct import
import LoginPage from "./components/LoginPage";
import ArtistSearch from "./components/ArtistSearch";
import AlbumsList from "./components/AlbumList";
import ArtistDetail from "./components/ArtistDetail";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/artist-search" element={<ArtistSearch />} />
        <Route path="/album" element={<AlbumsList />} />
        <Route path="/artist/:artistId" element={<ArtistDetail />} />
      </Routes>
    </>
  );
}

export default App;
