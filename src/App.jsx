import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import { EventContextProvider } from "./context/EventContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <EventContextProvider>
          <CssBaseline />
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
