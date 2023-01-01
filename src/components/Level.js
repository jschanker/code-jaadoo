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
  const [currentStreak, setCurrentStreak] = React.useState(0);

  React.useEffect(() => {
    if (level != undefined) {
      console.log(`level${level}.json`);
      fetch(`/level${level}.json`)
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
  const handleCodeButtonClick = (code) => {
    //const code = e.target.value?.replace(/\r|\n/g, "");
    // const singleLineCode = e.target.value?.replace(/\r|\n/g, "");
    setCurrentAnswer(
      currentAnswer.endsWith(code)
        ? currentAnswer.slice(0, -code.length)
        : currentAnswer + code
    );
  };
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
    )
    .flat()
    .map((item, index) =>
      typeof item === "string"
        ? item
            .split(/<codeButton>|<\/codeButton>/g)
            .map((item, index) =>
              index % 2 === 0 ? (
                item
              ) : (
                <button
                  onClick={(e) => handleCodeButtonClick(e.target.innerText)}
                >
                  {item}
                </button>
              )
            )
        : item
    );

  // React.useEffect(() => console.log(description), []);

  React.useEffect(() => {
    // const expectedAnswerNormal = normalizeAnswer(expectedAnswer);
    // const actualAnswerNormal = normalizeAnswer(currentAnswer);
    const answerInput = document.getElementById("answer");

    if (answerInput) {
      answerInput.focus();
      // Adapted from https://stackoverflow.com/a/48460773
      //   - 40 is for 20px top/bottom padding
      answerInput.style.height = "";
      answerInput.style.height = answerInput.scrollHeight - 40 + "px";
      if (
        expectedAnswerNormal &&
        expectedAnswerNormal === currentAnswerNormal
      ) {
        answerInput.style.backgroundColor = "green";
        setTimeout(() => {
          setIsCorrect(true);
          setCurrentAnswer("");
          answerInput.style.backgroundColor = "";
          if (!gotHint) {
            setCurrentStreak(currentStreak + 1);
          }
        }, 1000);
      } else if (!expectedAnswerNormal.startsWith(currentAnswerNormal)) {
        answerInput.style.backgroundColor = "red";
        setCurrentStreak(0);
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
          // setCurrentAnswer(currentAnswer + item);
          handleCodeButtonClick(item);
        }}
      />
      {numRemaining > 0 ? (
        <>
          <h2>Number of Questions Remaining to Level Up: {numRemaining}</h2>
          {description}
          <label>
            <h3>Answer:&nbsp;</h3>
            <textarea
              id="answer"
              value={currentAnswer}
              cols={40}
              rows={1}
              style={{
                maxWidth: "95%",
                //background:
                //  "url('https://upload.wikimedia.org/wikipedia/commons/3/36/Fire-animation.gif')",
                //backgroundSize: "contain",
                backgroundImage: currentStreak >= 3 && "url('/fire.gif')",
                backgroundSize: "10% 20px",
                //backgroundPosition: "bottom",
                //backgroundRepeat: "no-repeat",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "100% 100%",
                //backgroundRepeat: "no-repeat",
                fontSize: "xx-large",
                fontWeight: "bold",
                //color: "green",
                padding: "20px 5px",
                fontFamily: "courier, monospace",
                resize: "none",
                borderRadius: "10px"
              }}
              onChange={(e) => {
                //console.log(e.target.style.height);
                //e.target.style.height = "";
                //e.target.style.height = e.target.scrollHeight - 40 + "px";
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
              autoFocus
            />
          </label>
          <br />
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
              setCurrentStreak(0);
            }}
            style={{ marginRight: "5px" }}
          >
            Fix current answer and 2 character hint (+1 problem to solve)
          </button>
          <br />
          <br />
          <button
            onClick={() => {
              setShowAnswer(!showAnswer);
              setGotHint(true);
              if (!gotHint) {
                setNumRemaining(numRemaining + 3);
                setCurrentStreak(0);
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

