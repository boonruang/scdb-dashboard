export default function UploadProgressBar({ progress }) {
  return (
    <div style={{ marginTop: "1rem", width: "100%", background: "#eee", borderRadius: 8 }}>
      <div
        style={{
          width: `${progress}%`,
          height: "10px",
          background: "#4caf50",
          transition: "width 0.3s ease",
          borderRadius: 8
        }}
      ></div>
      <span style={{ fontSize: 12 }}>{progress}%</span>
    </div>
  );
}

