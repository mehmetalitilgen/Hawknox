import React, { useState } from "react";
import apiInstance from "../../utils/axios";

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
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h2>DNS Tarayıcı</h2>

      {/* INPUT ve BUTON Alanı */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Domain giriniz"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            width: "300px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "#fff",
            margin: "10px",
          }}
        />

        <button
          onClick={handleScan}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            minWidth: "120px",
          }}
        >
          {isLoading ? "Taranıyor..." : "Tara"}
        </button>
      </div>

      {/* DNS Sonuçları */}
      {result && (
        <div
          style={{
            textAlign: "left",
            margin: "40px auto 0 auto",
            maxWidth: "800px", // responsive görünüm için genişlik kısıtlaması
          }}
        >
          <h3>Sonuçlar</h3>

          {/* A Kayıtları */}
          {result.A && result.A.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4>A Kayıtları</h4>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      IP Address
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      TTL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.A.map((record, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {record.ip_address}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {record.ttl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CNAME */}
          {result.CNAME && (
            <div style={{ marginBottom: "20px" }}>
              <h4>CNAME Kaydı</h4>
              {result.CNAME.error ? (
                <p style={{ color: "red" }}>Hata: {result.CNAME.error}</p>
              ) : (
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    border: "1px solid #ccc",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                        CNAME
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {result.CNAME}
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* MX Kayıtları */}
          {result.MX && result.MX.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4>MX Kayıtları</h4>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Mail Server
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Priority
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      TTL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.MX.map((mx, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {mx.mail_server}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {mx.priority}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {mx.ttl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* NS Kayıtları */}
          {result.NS && result.NS.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4>NS Kayıtları</h4>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Name Server
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      TTL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.NS.map((ns, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {ns.name_server}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {ns.ttl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SOA Kaydı */}
          {result.SOA && (
            <div style={{ marginBottom: "20px" }}>
              <h4>SOA Kaydı</h4>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Primary NS
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Responsible Party
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Serial Number
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Refresh Interval
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Retry Interval
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Expire Limit
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Minimum TTL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.primary_name_server}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.responsible_party}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.serial_number}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.refresh_interval}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.retry_interval}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.expire_limit}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {result.SOA.minimum_ttl}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TXT Kayıtları */}
          {result.TXT && result.TXT.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <h4>TXT Kayıtları</h4>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  border: "1px solid #ccc",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      Text Record
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      TTL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {result.TXT.map((txt, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {txt.text_record}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {txt.ttl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DnsScanner;
