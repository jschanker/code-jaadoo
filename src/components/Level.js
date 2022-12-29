import React from "react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SpellsList from "./SpellsList";

const normalizeAnswer = (answer) => answer.replace(/\s\s+/g, " ");
const repeatCharTimes = (c, times) => Array(times).fill(c).join("");

export default function Level({ spells, setClearedLevel }) {
  let { level } = useParams();
  const [problemData, setProblemData] = React.useState({
    type: "foo",
    problems: [
      {
        description: "Loading...",
        questionArgs: [],
        answer: "",
        answerArgs: []
      }
    ]
  });
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [problemNumber, setProblemNumber] = React.useState(0);
  const [questionArgIndices, setQuestionArgIndices] = React.useState([]);
  const [currentAnswer, setCurrentAnswer] = React.useState("");
  const [gotHint, setGotHint] = React.useState(false);
  React.useEffect(() => {
    if (level != undefined) {
      console.log(`level${level}.json`);
      fetch(`/codejaadoo/level${level}.json`)
        .then((res) => res.json())
        .then((data) => setProblemData(data));
    }
  }, [level]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [numRemaining, setNumRemaining] = React.useState(Infinity);
  React.useEffect(() => {
    const questionNumber = Math.floor(
      Math.random() * problemData.problems.length
    );
    const questionArgIndices = problemData.problems[
      questionNumber
    ].questionArgs.map((arr) => Math.floor(Math.random() * arr.length));
    console.log("A", questionNumber, questionArgIndices);
    setProblemNumber(questionNumber);
    setQuestionArgIndices(questionArgIndices);
    if (numRemaining === Infinity && problemData?.type !== "foo") {
      // loaded
      console.log(problemData);
      setNumRemaining(problemData.numToClear || 5);
    } else if (numRemaining > 0 && isCorrect) {
      setNumRemaining(numRemaining - 1);
      setGotHint(false);
    } else if (numRemaining === 0) {
      setClearedLevel();
    }
    setIsCorrect(false);
    setShowAnswer(false);
  }, [problemData, isCorrect]);

  const problemInfo = problemData.problems[problemNumber];
  const questionArgs = problemInfo.questionArgs;
  const answerArgs = problemInfo.answerArgs;
  const expectedAnswer = problemInfo.answer
    .replace(
      /%([0-9]+)/g,
      (_, a) => answerArgs[a - 1][questionArgIndices[a - 1]]
    )
    .replace(
      /%([0-9]+)/g,
      (_, a) => questionArgs[a - 1][questionArgIndices[a - 1]]
    );
  const expectedAnswerNormal = normalizeAnswer(expectedAnswer);
  const currentAnswerNormal = normalizeAnswer(currentAnswer);
  const description = problemInfo.description
    .replace(
      /%([0-9]+)/g,
      (_, a) => questionArgs[a - 1][questionArgIndices[a - 1]]
    )
    .replace(
      /___+/,
      currentAnswerNormal.substring(0, 100) +
        repeatCharTimes(
          "_",
          Math.max(expectedAnswerNormal.length - currentAnswerNormal.length, 0)
        )
    )
    .split(/<pre>|<\/pre>/g)
    .map((item, index) => (index % 2 === 0 ? item : <pre>{item}</pre>))
    .map((item, index) =>
      typeof item === "string"
        ? item
            .split(/<h3>|<\/h3>/g)
            .map((item, index) => (index % 2 === 0 ? item : <h3>{item}</h3>))
        : item
    );

  React.useEffect(() => {
    // const expectedAnswerNormal = normalizeAnswer(expectedAnswer);
    // const actualAnswerNormal = normalizeAnswer(currentAnswer);
    const answerInput = document.getElementById("answer");

    if (answerInput) {
      if (expectedAnswerNormal === currentAnswerNormal) {
        answerInput.style.backgroundColor = "green";
        setTimeout(() => {
          setIsCorrect(true);
          setCurrentAnswer("");
          answerInput.style.backgroundColor = "";
        }, 1000);
      } else if (!expectedAnswerNormal.startsWith(currentAnswerNormal)) {
        answerInput.style.backgroundColor = "red";
      } else {
        answerInput.style.backgroundColor = "";
      }
    }
  }, [currentAnswerNormal, expectedAnswerNormal]);

  return (
    <div style={{ marginTop: "45px" }}>
      <SpellsList
        spells={spells}
        handler={(item) => {
          setCurrentAnswer(currentAnswer + item);
        }}
      />
      {numRemaining > 0 ? (
        <>
          <h2>Number of Questions Remaining to Level Up: {numRemaining}</h2>
          {description}
          <br />
          <button
            onClick={() => {
              const expectedAnswerNormal = normalizeAnswer(expectedAnswer);
              const actualAnswerNormal = normalizeAnswer(currentAnswer);
              const indexOfDivergence = Array.from(
                expectedAnswerNormal
              ).findIndex((c, index) => c !== actualAnswerNormal[index]);

              if (indexOfDivergence !== -1) {
                setCurrentAnswer(
                  expectedAnswerNormal.substring(0, indexOfDivergence + 2)
                );
                setNumRemaining(numRemaining + 1);
              }
            }}
            style={{ marginRight: "5px" }}
          >
            Fix current answer and 2 character hint (+1 problem to solve)
          </button>
          <button
            onClick={() => {
              setShowAnswer(!showAnswer);
              setGotHint(true);
              if (!gotHint) {
                setNumRemaining(numRemaining + 3);
              }
            }}
          >
            Click to{" "}
            {showAnswer ? "hide answer" : "show answer (+3 problems to solve)"}
          </button>
          <div style={{ display: showAnswer ? "block" : "none" }}>
            {expectedAnswer}
          </div>
          <br />
          <br />
          <label>
            Answer:&nbsp;
            <input
              id="answer"
              value={currentAnswer}
              size={50}
              style={{ maxWidth: "100%" }}
              onChange={(e) => {
                /*
                const expectedAnswerNormal = expectedAnswer.replace(
                  /\s\s+/g,
                  " "
                );
                const actualAnswerNormal = e.target.value.replace(
                  /\s\s+/g,
                  " "
                );

                if (expectedAnswerNormal === actualAnswerNormal) {
                  e.target.style.backgroundColor = "green";
                  setTimeout(() => {
                    setIsCorrect(true);
                    setCurrentAnswer("");
                    e.target.style.backgroundColor = "";
                  }, 1000);
                } else if (
                  !expectedAnswerNormal.startsWith(actualAnswerNormal)
                ) {
                  e.target.style.backgroundColor = "red";
                } else {
                  e.target.style.backgroundColor = "";
                }
                */
                setCurrentAnswer(e.target.value);
              }}
            />
          </label>
          <p>
            <HashLink
              to="/map"
              onClick={(e) =>
                window.confirm(
                  "Are you sure? If you return to the map, you'll need to start this level from the beginning."
                ) || e.preventDefault()
              }
            >
              Quit, and go back to the level map!
            </HashLink>
          </p>
        </>
      ) : (
        <>
          <h1 style={{ color: "green" }}>SUCCESS! Leveled Up!</h1>
          <HashLink to="/map">Go back to the map!</HashLink>
        </>
      )}
    </div>
  );
}
