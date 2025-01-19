import React, { useState } from "react";
import apiInstance from "../../utils/axios";

function WhoIsScanner() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async () => {
    if (!domain) {
      alert("Lütfen bir Url girin!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiInstance.post("/whois-scan", { domain });
      setResult(response.data || {});
      console.log(response.data);
    } catch (error) {
      console.error("HATA:", error);
      alert(error.response?.data?.error || "Taramada hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>WHO IS SCANNER</h2>
      <input
        type="text"
        placeholder="URL giriniz"
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
        </div>
      )}
    </div>
  );
}

export default WhoIsScanner;
