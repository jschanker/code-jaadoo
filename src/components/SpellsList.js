import React from "react";

export default function SpellsList({ spells, handler, setClicked }) {
  const selectedElement = React.useRef(null);
  React.useEffect(() => {
    if (setClicked && typeof setClicked === "function") {
      spells.forEach(
        (item) =>
          setClicked(item) && handler(item, { target: selectedElement.current })
      );
    }
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
        padding: "5px"
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}>
        Available Code Spells:
        {(spells || []).map((item) => (
          <button
            onClick={(e) => handler && handler(item, e)}
            style={{ margin: "5px 5px" }}
            ref={
              typeof setClicked === "function" && setClicked(item)
                ? selectedElement
                : null
            }
            key={item}
          >
            {item}
          </button>
        ))}
      </span>
    </div>
  );
}
