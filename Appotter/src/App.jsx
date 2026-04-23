import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/Components/Navbar";
import SplashScreen from "../src/Components/SplashScreen";
import Home from "../src/Pages/Home";
import CharacterDetail from "../src/Pages/CharacterDetail"
import Favorites from "../src/Pages/Favorites"
import Info from "../src/Pages/Info"
import User from "../src/Pages/ User"
import Original from "../src/Pages/Original"

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (character) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === character.id)
        ? prev.filter((f) => f.id !== character.id)
        : [...prev, character]
    );
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white pb-16">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/character/:id"
            element={
              <CharacterDetail
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="/favorites" element={<div>Favoritos</div>} />
          <Route path="/original" element={<Original />} />
          <Route path="/info" element={<Info />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;