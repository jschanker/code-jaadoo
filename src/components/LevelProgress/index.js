// import React from "react";
export default function LevelProgress({ totalQuestions, numRemaining }) {
  //const completed = Math.max(totalQuestions - numRemaining, 0);
  const completedPortion = Math.round(
    Math.max((totalQuestions - numRemaining) / totalQuestions, 0) * 100
  );
  // console.log(completedPortion);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        //maxWidth: "95%",
        width: "95%",
        fontSize: "small",
        marginBottom: "10px",
        //background: "linear-gradient(to right, green 40%, #fff 0%)",
        background:
          "linear-gradient(to right, #6c0 " + completedPortion + "%, #ccc 0%",
        border: "2px solid black",
        borderRadius: "10px",
        minHeight: "10px",
        transition: "1s"
      }}
    >
      {Math.max(totalQuestions - numRemaining, 0)}/{totalQuestions}
      {/*Array.from(Array(totalQuestions).keys()).map((num) => (
        <span>{num < completed ? "✅" : "☐"}</span>
      ))*/}
    </div>
  );
}
