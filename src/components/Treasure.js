import React from "react";
import SpellsList from "./SpellsList";
import CodeSnippetRunner from "./CodeSnippetRunner";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import closedTreasureChest from "../assets/closed-treasure-chest.png";
import openTreasureChestGold from "../assets/open-treasure-chest-gold.svg.png";

export default function Treasure({ spells, setSpells, isOpened, setOpened }) {
  const { level = 0 } = useParams();
  const opened = isOpened(level);
  const [treasureData, setTreasureData] = React.useState(null);
  const [ranCode, setRanCode] = React.useState(false);
  React.useEffect(() => {
    console.log(`/treasure${level}.json`);
    fetch(`/treasure${level}.json`)
      .then((res) => res.json())
      .then((data) => setTreasureData(data));
  }, [level]);
  // console.log(treasureData);
  return (
    <>
      <SpellsList spells={spells} disabled={true} />
      {/*
      <span style={{ backgroundColor: "black", color: "white" }}>
        XP 0 Block inventory
      </span>
      */}
      {!opened ? (
        <>
          <h1>{treasureData?.closedHeading}</h1>
          <img
            src={closedTreasureChest}
            style={{ width: "200px", height: "auto" }}
            alt="treasure"
            onClick={(e) => {
              if (treasureData) {
                setOpened(true);
                if (!spells.includes(treasureData?.treasure)) {
                  setSpells(spells.concat(treasureData?.treasure));
                }
              }
            }}
          />
          <h2>Click the box above to open!</h2>
        </>
      ) : (
        <>
          {/*<p>You can use this spell to output text to the screen.</p>*/}
          <h1>{treasureData?.openedHeading}</h1>
          <p>
            <img
              src={openTreasureChestGold}
              alt="Open treasure chest with gold"
              width="100"
            />
          </p>
          <p>{treasureData?.description}</p>
          {treasureData?.usage && (
            <>
              <h3>Example usage:</h3>
              <pre>{treasureData.usage}</pre>
            </>
          )}
          {treasureData?.output && (
            <>
              <h3>Output from spell:</h3>
              {/*<pre>{treasureData.output}</pre>*/}
              <CodeSnippetRunner
                code={treasureData.usage}
                runCallback={() => setRanCode(true)}
              />
            </>
          )}
          {/*<button onClick={() => setOpened(false)}>print</button>*/}
          <HashLink
            to="/map"
            style={{
              animation: ranCode ? "textBlink 500ms 3" : "",
              backgroundColor: ranCode ? "gold" : "white"
            }}
          >
            Go forward
          </HashLink>
        </>
      )}
    </>
  );
}
