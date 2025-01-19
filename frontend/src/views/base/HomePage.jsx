import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        margin: "0",
        backgroundImage: `url('/mnt/data/hawknox1.png'), linear-gradient(to bottom, rgba(44, 62, 80, 0.9), rgba(76, 161, 175, 0.9))`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "0",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: "5rem", marginBottom: "20px" }}>HAWKNOX</h1>

      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
          maxWidth: "1000px",
          background: "rgba(0, 0, 0, 0)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Welcome to HAWKNOX, your ultimate cybersecurity solution.<br></br>{" "}
        <strong style={{ fontWeight: "bold" }}>
          {" "}
          Secure. Analyze. Protect.
        </strong>
      </p>

      <button
        onClick={() => navigate("/scanner")}
        style={{
          padding: "15px 30px",
          fontSize: "1.2rem",
          color: "#2c3e50",
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#e3e3e3";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#fff";
        }}
      >
        Start Scanning
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "0.9rem",
          opacity: 0.8,
        }}
      >
        &copy; {new Date().getFullYear()} HAWKNOX. All rights reserved.
      </div>
    </div>
  );
}

export default HomePage;
