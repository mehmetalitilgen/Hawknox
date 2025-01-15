import React, { useState } from "react";
import apiInstance from "../utils/axios";

function DnsScanner() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    if (!domain) {
      alert("Enter a URL!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiInstance.post("/dns-scan", { domain });
      setResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Hata", error);
      alert(error.response?.data?.error || "TARAMADA HATA OLUŞTU");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>DNS Tarayıcı</h2>
      <input
        type="text"
        placeholder="Domain giriniz"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        style={{ width: "300px", padding: "10px", borderRadius: "4px" }}
      />
      <br />
      <button
        onClick={handleScan}
        disabled={isLoading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isLoading ? "Taranıyor..." : "Tara"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            display: "inline-block",
          }}
        >
          <h3>Sonuçlar:</h3>
          {/* <ul>
            {Object.entries(result).map(([port, service]) => (
              <li key={port}>
                <strong>Port:</strong> {port}, <strong>Servis:</strong>{" "}
                {service}
              </li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
}

export default DnsScanner;
