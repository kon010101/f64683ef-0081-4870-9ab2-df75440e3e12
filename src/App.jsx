import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import LandingPage from "./pages/LandingPage/LandingPage";
import CartPage from "./pages/CartPage/CartPage";
import { EventContextProvider } from "./context/EventContext";
import PrimarySearchAppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <EventContextProvider>
          <CssBaseline />
          <PrimarySearchAppBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </EventContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
