import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PortScanner from "./views/services/PortScanner";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DnsScanner from "./views/services/DnsScanner";
import SslScanner from "./views/services/SslScanner";
import DirectoryScanner from "./views/services/DirectoryScanner";
import JsFileScanner from "./views/services/JsFileScanner";
import WhoIsScanner from "./views/services/whoIsScanner";
import HomePage from "./views/base/HomePage";
import ScannerService from "./views/base/ScannerService";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scanner" element={<ScannerService />} />
        <Route path="/port" element={<PortScanner />} />
        <Route path="/dns" element={<DnsScanner />} />
        <Route path="/ssl" element={<SslScanner />} />
        <Route path="/directory" element={<DirectoryScanner />} />
        <Route path="/js-file" element={<JsFileScanner />} />
        <Route path="/who-is" element={<WhoIsScanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
