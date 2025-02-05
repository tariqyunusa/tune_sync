import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SongsProvider } from "./contexts/songContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Verify from "./pages/Verify.tsx";
import Confirm from "./pages/Confirm.tsx";
import { LoaderProvider } from "./contexts/loaderContext.tsx";
import {motion, AnimatePresence} from 'framer-motion'



createRoot(document.getElementById("root")!).render(
  <AnimatePresence mode="wait">
    <BrowserRouter>
  <LoaderProvider>
    <SongsProvider>
    <Routes>
      <Route path="/index.html" element={
        <PageWrapper>
        <App />
      </PageWrapper>} />
      <Route path='/verify' element={
        <SideWrapper>
          <Verify />
        </SideWrapper>
      } />
      <Route path="/confirm" element={
        <PageWrapper>
          <Confirm />
        </PageWrapper>
      } />
    </Routes>
  </SongsProvider>
  </LoaderProvider>
  </BrowserRouter>
  </AnimatePresence>

  
);
function PageWrapper({children}: any){
  return(
    <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    exit={{opacity: 0, y: -20}}
    transition={{duration: 0.2}}
    >
      {children}
    </motion.div>
  )
}
function SideWrapper({children}: any) {
  return(
    <motion.div 
    initial={{x: 50}}
    animate={{x: 0}}
    exit={{x: -50}}
    transition={{duration: 0.2}}
    >
      {children}
    </motion.div>
  )
}
