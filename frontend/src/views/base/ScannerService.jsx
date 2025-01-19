import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TerminalEffect() {
  const [commands, setCommands] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Terminalde görünecek komut listesi
  const commandList = [
    "ping google.com",
    "tracert google.com",
    "nslookup github.com",
    "curl -I https://www.example.com",
    "whois example.com",
    "nmap -sV 127.0.0.1",
  ];

  // Her 3 saniyede bir yeni komut eklenmesi
  useEffect(() => {
    if (currentIndex < commandList.length) {
      const intervalId = setInterval(() => {
        setCommands((prevCommands) => [
          ...prevCommands,
          commandList[currentIndex],
        ]);
        setCurrentIndex((prev) => prev + 1);
      }, 3000);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, commandList]);

  // Her yeni komut eklendiğinde sayfanın aşağı kayması
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [commands]);

  return (
    <div
      style={{
        fontFamily: "monospace",
        color: "rgba(0,255,0,0.6)",
        padding: "50px",
      }}
    >
      {commands.map((cmd, index) => (
        <div key={index}>$ {cmd}</div>
      ))}
    </div>
  );
}

function ScannerService() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Scanner Services</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "30px",
        }}
      >
        <button
          onClick={() => navigate("/port")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Port Scanner
        </button>
        <button
          onClick={() => navigate("/dns")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          DNS Scanner
        </button>
        <button
          onClick={() => navigate("/ssl")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          SSL Scanner
        </button>
        <button
          onClick={() => navigate("/directory")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Directory Scanner
        </button>
        <button
          onClick={() => navigate("/js-file")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          JS File Scanner
        </button>
        <button
          onClick={() => navigate("/who-is")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          WHOIS Scanner
        </button>
      </div>

      {/* Terminal Etkisi */}
      <TerminalEffect />
    </div>
  );
}

export default ScannerService;
