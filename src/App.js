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

  function setClearedLevel(type, num) {
    console.log("Cleared level", currentLevel, type, num);
    const index = levels.findIndex(
      (level) =>
        level.type === type && parseFloat(level.num) === parseFloat(num)
    );
    if (index >= currentLevel) {
      localStorage.setItem("currentLevel", currentLevel + 1);
      setLevel(currentLevel + 1);
    }
  }

  return (
    <div
      className="App"
      style={
        {
          /*marginTop: "65px"*/
        }
      }
    >
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
                setOpened={setClearedLevel.bind(null, "treasure")}
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
                setOpened={setClearedLevel.bind(null, "treasure")}
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
              <Level
                spells={spells}
                setClearedLevel={setClearedLevel.bind(null, "level")}
              />
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
                setOpened={setClearedLevel.bind(null, "treasure")}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
