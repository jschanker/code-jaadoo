export default function SpellsList({ spells, handler }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(75,0,255,0.5)",
        overflow: "auto",
        padding: "5px"
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}>
        Available Code Spells:
        {(spells || []).map((item) => (
          <button
            onClick={(e) => handler && handler(item, e)}
            style={{ margin: "5px 5px" }}
            key={item}
          >
            {item}
          </button>
        ))}
      </span>
    </div>
  );
}
