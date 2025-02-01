import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SongsProvider } from "./contexts/songContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./pages/Verify.tsx";
import Confirm from "./pages/Confirm.tsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SongsProvider>
    <Routes>
      <Route path="/index.html" element={<App />} />
      <Route path='/verify' element={<Verify />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
  </SongsProvider>
  </BrowserRouter>

  
);
