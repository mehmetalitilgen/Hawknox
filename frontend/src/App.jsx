import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PortScanner from "./views/PortScanner";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DnsScanner from "./views/DnsScanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/port" element={<PortScanner />} />
        <Route path="/dns" element={<DnsScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
