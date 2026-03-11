export default function Calendar() {
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  return (
    <div>
      <h2>Marzo 2025</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
        }}
      >
        <div>Lun</div>
        <div>Mar</div>
        <div>Mer</div>
        <div>Gio</div>
        <div>Ven</div>
        <div>Sab</div>
        <div>Dom</div>
        {days.map((d) => (
          <div
            key={d}
            style={{
              border: "1px solid #ccc",
              minHeight: "80px",
              padding: "4px",
            }}
          >
            <strong>{d}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
