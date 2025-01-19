import React, { useState, useEffect, useRef } from "react";
import apiInstance from "../../utils/axios";

function PortScanner() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef(null);

  const [progress, setProgress] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Butonu programatik olarak tetikle
      buttonRef.current.click();
    }
  };

  const handleChange = (e) => {
    e.key === "Enter";
  };

  const handleScan = async () => {
    if (!url) {
      alert("Lütfen bir URL girin!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiInstance.post("/port-scan", { url });
      setResult(response.data.Port || {});
    } catch (error) {
      console.error("Hata:", error);
      alert(error.response?.data?.error || "Taramada hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let intervalId = null;

    if (isLoading) {
      setProgress(0);

      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            return 90;
          }
          const increase = [1, 2, 3, 4];
          const randomIncrease =
            increase[Math.floor(Math.random() * increase.length)];
          return prev + randomIncrease;
        });
      }, 2000);
    } else {
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoading]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Port Tarayıcı</h2>

      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Enter Domain"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          width: "300px",
          padding: "10px",
          borderRadius: "4px",
          color: "#fff",
          margin: "10px",
        }}
      />
      <br />

      <button
        ref={buttonRef}
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

      {/* İlerleme çubuğu */}
      {isLoading || progress > 0 ? (
        <div
          style={{
            margin: "20px auto",
            width: "80%",
            height: "20px",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            overflow: "hidden",
            transition: "width 0.2s ease",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#007bff",
              transition: "width 0.2s ease",
            }}
          ></div>
        </div>
      ) : null}

      {result && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              textAlign: "left",
              width: "fit-content",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#4ca1af",
              }}
            >
              Sonuçlar:
            </h3>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                minWidth: "300px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#2c3e50" }}>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                    Port
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                    Servis
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result).map(([port, service]) => (
                  <tr key={port}>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        color: "#4ca1af",
                      }}
                    >
                      {port}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        color: "#4ca1af",
                      }}
                    >
                      {service}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortScanner;
