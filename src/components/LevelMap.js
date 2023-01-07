import React from "react";
import closedTreasureChest from "../assets/closed-treasure-chest.png";
import openTreasureChest from "../assets/open-treasure-chest-empty.svg.png";
import lock from "../assets/lock.png";
import wizard from "../assets/wizard-walking-forward.gif";
import { HashLink } from "react-router-hash-link";
import SpellsList from "./SpellsList";
export default function LevelMap({ currentLevel, levels, spells }) {
  const completedLevels = levels?.slice(0, currentLevel) || [];
  const remainingLevels = levels?.slice(currentLevel) || [];
  const [selectedLevel, setSelectedLevel] = React.useState(null);
  const isLevelAccessible = (level) => level.index <= currentLevel;
  return (
    <div
      style={{
        /*display: "grid",
        gridTemplateColumns: "100px 100px 100px",
        alignItems: "center",
        justifyContent: "center"*/
        marginTop: "65px"
      }}
      onClick={() => setSelectedLevel(null)}
    >
      <SpellsList spells={spells || ["print"]} />
      {selectedLevel != null ? (
        isLevelAccessible(selectedLevel) ? (
          <div
            style={{
              position: "fixed",
              width: "100%",
              /*minHeight: "100px",*/
              backgroundColor: "rgba(127, 127, 255, 0.75)",
              borderRadius: "20px"
            }}
          >
            <HashLink
              to={`/${
                selectedLevel.type === "treasure"
                  ? `treasure/${selectedLevel.num}`
                  : `level/${selectedLevel.num}`
              }`}
              style={{
                color: "black",
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                padding: "50px 0"
              }}
            >
              {selectedLevel.type === "treasure"
                ? `Click to collect treasure`
                : `Click to Start Level ${selectedLevel.num}`}
            </HashLink>
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              width: "100%",
              /*minHeight: "100px",*/
              backgroundColor: "rgba(200, 200, 200, 0.5)",
              borderRadius: "20px",
              padding: "10px 0"
            }}
          >
            <img
              src={lock}
              alt="Locked"
              width="100"
            />
            <p style={{ marginTop: 0 }}>
              You need to successfully complete previous levels before you can
              access this.
            </p>
          </div>
        )
      ) : (
        ""
      )}
      {completedLevels.map((level, index) => (
        <div
          style={{
            borderRadius: "30px",
            width: "50px",
            height: "50px",
            backgroundColor: "gold",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10px"
          }}
          id={level.index}
          onClick={(e) => {
            console.log(e.currentTarget.id);
            setSelectedLevel(level);
            e.stopPropagation();
          }}
        >
          {level.type === "treasure" ? (
            <img
              src={openTreasureChest}
              width="40"
              alt="open treasure chest"
            />
          ) : (
            `Level ${level.num}`
          )}
        </div>
      ))}
      <div>
        <img
          src={wizard}
          alt="The wizard walks forward!"
          width="53"
        />
      </div>
      {remainingLevels.map((level, index) => (
        <div 
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div style={{ fontWeight:"bold", color:"#084" }}>
            {index === 0 && "Click to proceed ➡️"}
          </div>
          <div
            style={{
              borderRadius: "30px",
              width: "50px",
              height: "50px",
              backgroundColor: "#dddddd",
              textAlign: "center",
              marginTop: "10px"
            }}
            id={level.index}
            onClick={(e) => {
              console.log(e.currentTarget.id);
              setSelectedLevel(level);
              e.stopPropagation();
            }}
          >
            {level.type === "treasure" ? (
              <img
                src={closedTreasureChest}
                width="40"
                alt="open treasure chest"
              />
            ) : (
              <span>{`Level ${level?.num}`}</span>
            )}
          </div>
          <div style={{ fontWeight:"bold", color:"#084" }}>
            {index === 0 && "⬅️ Click to proceed"}
          </div>
        </div>
      ))}
      <HashLink to="/">Go back</HashLink>
    </div>
  );
}
