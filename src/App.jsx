import { BrowserRouter, Routes, Route } from "react-router-dom";

import HeroSection from "./herosection";
import Estimate from "./estimate";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HeroSection />}
        />

        <Route
          path="/estimate"
          element={<Estimate />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;