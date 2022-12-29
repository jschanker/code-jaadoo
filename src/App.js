import React from "react";
import "./styles.css";
import closedTreasureChest from "./assets/closed-treasure-chest.png";
import SpellsList from "./components/SpellsList";
import LevelMap from "./components/LevelMap";
import Level from "./components/Level";
import Treasure from "./components/Treasure";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function App() {
  const isOpened = (index) => {
    return (
      levels.findIndex(
        (item) => item.type === "treasure" && item.num === parseInt(index, 10)
      ) < currentLevel
    );
  };
  const [spells, setSpells] = React.useState(
    JSON.parse(localStorage.getItem("spells")) || []
  );
  const [currentLevel, setLevel] = React.useState(
    parseInt(localStorage.getItem("currentLevel"), 10) || 0
  );
  const [levels, setLevels] = React.useState(
    [
      { type: "treasure", num: 0 },
      { type: "level", num: 1 },
      { type: "treasure", num: 1 },
      { type: "level", num: 2 },
      { type: "treasure", num: 2 },
      { type: "level", num: 3 },
      { type: "treasure", num: 3 },
      { type: "level", num: 4 },
      { type: "treasure", num: 4 },
      { type: "level", num: 5 },
      { type: "treasure", num: 5 }
      /*{ type: "level", num: 6 },
      { type: "treasure", num: 6 },
      { type: "level", num: 7 },
      { type: "treasure", num: 7 }*/
    ].map((item, index) => ({ ...item, index }))
  );

  React.useEffect(() => {
    localStorage.setItem("spells", JSON.stringify(spells));
  }, [spells]);

  function setClearedLevel() {
    console.log("CL", currentLevel);
    localStorage.setItem("currentLevel", currentLevel + 1);
    setLevel(currentLevel + 1);
  }

  return (
    <div className="App" style={{ marginTop: "45px" }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Treasure
                spells={spells}
                setSpells={setSpells}
                isOpened={isOpened}
                setOpened={setClearedLevel}
              />
            }
          />
          <Route
            path="/codejaadoo"
            exact
            element={
              <Treasure
                spells={spells}
                setSpells={setSpells}
                isOpened={isOpened}
                setOpened={setClearedLevel}
              />
            }
          />
          <Route
            path="/map"
            exact
            element={
              <LevelMap
                levels={levels}
                currentLevel={currentLevel}
                spells={spells}
              />
            }
          />
          <Route
            path="/level/:level"
            exact
            element={
              <Level spells={spells} setClearedLevel={setClearedLevel} />
            }
          />
          <Route
            path="/treasure/:level"
            exact
            element={
              <Treasure
                spells={spells}
                setSpells={setSpells}
                isOpened={isOpened}
                setOpened={setClearedLevel}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
