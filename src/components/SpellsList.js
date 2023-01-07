import React from "react";

export default function SpellsList({ spells, handler, setClicked, disabled }) {
  const selectedElement = React.useRef(null);
  //console.log("SE", selectedElement, setClicked("print"));
  const [currentSpells, setCurrentSpells] = React.useState(spells);
  React.useEffect(() => {
    if (setClicked && typeof setClicked === "function") {
      spells.forEach(
        (item) =>
          setClicked(item) && handler(item, { target: selectedElement.current })
      );
    }
    // spells.forEach(spell => !currentSpells.includes(spell));
    // delay for flash of gold effect
    const t = setTimeout(() => {
      setCurrentSpells(spells);
    }, 5000);
    return () => clearTimeout(t); // cleanup
  }, [setClicked, spells, handler, selectedElement]);
  /*
  React.useEffect(() => {
    if (typeof setClicked === "function") {
      spells.forEach((item) => setClicked(item) && handler(item, null));
    }
  }, [setClicked, spells, handler]);
  */
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(75,0,255,0.5)",
        overflow: "auto",
        padding: "5px",
        textAlign: "left"
      }}
    >
      <h3 style={{ textAlign: "center", margin: 0 }}>Available Code Spells:</h3>
      <span style={{ whiteSpace: "nowrap" }}>
        {(spells || []).map((item) => (
          <button
            onClick={(e) => handler && handler(item, e)}
            style={{
              margin: "5px 5px",
              animation: !currentSpells.includes(item)
                ? "buttonBlink 500ms 3"
                : "",
              backgroundColor: !currentSpells.includes(item) ? "gold" : "",
              transition: "1s"
            }}
            ref={
              typeof setClicked === "function" && setClicked(item)
                ? selectedElement
                : null
            }
            key={item}
            disabled={disabled}
          >
            {item}
          </button>
        ))}
      </span>
    </div>
  );
}
