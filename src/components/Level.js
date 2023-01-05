import React from "react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import SpellsList from "./SpellsList";
import _ from "lodash";
// import ReactFitText from "react-fittext";
// import AutosizeInput from "react-input-autosize";
// import AnswerInput from "./AnswerInput";

const normalizeAnswer = (answer) => answer.replace(/\s\s+/g, " ");
const repeatCharTimes = (c, times) => Array(times).fill(c).join("");

export default function Level({ spells, setClearedLevel }) {
  let { level } = useParams();
  const tutorialDirections = [
    "",
    "Click on a spell once to add its text to your answer.",
    "You can also click on buttons in the problems to add their text. Uh oh! The answer box turned red. This means it's not correct.",
    "No worries, we can click on the button again to remove this code.",
    "Let's type in a space and quotes in the input. Still red.",
    "OK, let's get a hint. Click on this button to remove all incorrect code and find out the next two symbols. This means we'll have to answer one more problem. Oh well, more practice for our wizard.",
    "That's right, we forgot the open parenthesis.",
    "Let's now click on the button again to reinstate the text.",
    "Finally, let's add the remaining quotation marks and closing parenthesis to complete our answer. Yay, it turned green and the text disappeared, so this means we were correct!",
    "That's all there is to it. Type in code and use the buttons to add code as you please. You can also get the full answer by clicking this button. But this means three more problems to solve."
  ];
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
  const [answerBlockData, setAnswerBlockData] = React.useState([]);
  const [gotHint, setGotHint] = React.useState(false);
  const [currentStreak, setCurrentStreak] = React.useState(0);
  // const [tutorialStep, setTutorialStep] = React.useState(level === "1" ? 1 : 0);
  const [tutorialStep, setTutorialStep] = React.useState(0);
  const [pointerPosition, setPointerPosition] = React.useState({ x: 0, y: 0 });
  const selectedElement = React.useRef(null);
  //console.log("SE", selectedElement, setClicked("print"));
  React.useEffect(() => {
    console.log(selectedElement.current, "");
    if (selectedElement.current) {
      handleCodeButtonClick(
        selectedElement.current.innerText,
        selectedElement.current
      );
    }
  }, [selectedElement, tutorialStep]);

  /*
  React.useEffect(() => {
    if (problemData.problems.length > 0 && tutorialStep === 1) {
      //document.body.//appendChild("<div👆
      setTimeout(
        () =>
          (document.getElementById("tutorial-directions").style.width =
            "500px"),
        5000
      );
    }
  }, [problemData, tutorialStep]);
*/
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
    setAnswerBlockData(
      _.shuffle(problemInfo?.answerBlocks || []).map(
        (answerBlockItem, used) => {
          return {
            value: answerBlockItem
              .replace(
                /%([0-9]+)/g,
                (_, a) => answerArgs[a - 1][questionArgIndices[a - 1]]
              )
              .replace(
                /%([0-9]+)/g,
                (_, a) => questionArgs[a - 1][questionArgIndices[a - 1]]
              ),
            used: false
          };
        }
      )
    );
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
  const handleCodeButtonClick = (code, ele) => {
    //const code = e.target.value?.replace(/\r|\n/g, "");
    // const singleLineCode = e.target.value?.replace(/\r|\n/g, "");
    if (tutorialStep > 0 && ele?.getBoundingClientRect()) {
      setPointerPosition({
        x:
          ele.getBoundingClientRect().x + ele.getBoundingClientRect().width / 2,
        y:
          ele.getBoundingClientRect().y + ele.getBoundingClientRect().height / 2
      });
      ele.style.animation = "buttonBlink 500ms 5";
      ele.style.backgroundColor = "rgb(239, 239, 239)";
    }
    if (tutorialStep !== 4 && tutorialStep !== 5 && tutorialStep < 8) {
      setCurrentAnswer(
        currentAnswer.endsWith(code)
          ? currentAnswer.slice(0, -code.length)
          : currentAnswer + code
      );
    } else if (tutorialStep === 4) {
      setCurrentAnswer(currentAnswer + ' "');
    } else if (tutorialStep === 5) {
      console.log("5", tutorialStep);
      setCurrentAnswer(currentAnswer.slice(0, -2) + '("');
    } else if (tutorialStep === 8) {
      setCurrentAnswer(currentAnswer + '")');
    }
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
        ? item.split(/<codeButton>|<\/codeButton>/g).map((item, index) =>
            index % 2 === 0 ? (
              item
            ) : (
              <button
                onClick={(e) =>
                  handleCodeButtonClick(e.target.innerText, e.target)
                }
                disabled={
                  tutorialStep !== 0 &&
                  tutorialStep !== 2 &&
                  tutorialStep !== 3 &&
                  tutorialStep !== 7
                }
                ref={
                  tutorialStep === 2 ||
                  tutorialStep === 3 ||
                  tutorialStep ===
                    7 /*&&
                  expectedAnswerNormal
                    .substring(currentAnswerNormal.length)
                    .startsWith(item) &&
                  !currentAnswer.endsWith(item)*/
                    ? selectedElement
                    : null
                }
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
      answerInput.setSelectionRange(
        answerInput.value.length,
        answerInput.value.length
      );
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
  }, [currentAnswerNormal, expectedAnswerNormal, tutorialStep]);

  return (
    <div style={{ marginTop: "45px" }}>
      {/*
      <SpellsList
        spells={spells}
        setClicked={
          tutorialStep === 1 &&
          ((item) =>
            expectedAnswerNormal.startsWith(item) &&
            !currentAnswer.endsWith(item))
        }
        handler={(item, e) => {
          // setCurrentAnswer(currentAnswer + item);
          handleCodeButtonClick(item, e.target);
        }}
      />
      */}
      {tutorialStep > 0 ? (
        <div
          style={{
            position: "absolute",
            top: pointerPosition.y,
            left: pointerPosition.x - 10,
            textAlign: "left"
          }}
        >
          <span role="img" ariaLabel="pointer" style={{ fontSize: "xx-large" }}>
            👆
          </span>
          <div
            id="tutorial-directions"
            style={{
              backgroundColor: "rgb(255, 255, 205, 1)",
              /*width: "100%",*/
              maxWidth: "100px",
              minHeight: "50px",
              overflow: "hidden",
              position: "relative",
              //right: "50px"
              left: "10px",
              top: "-10px",
              padding: "5px",
              transition: "1s"
            }}
          >
            {tutorialDirections[tutorialStep]}
            <button
              onClick={() =>
                setTutorialStep((tutorialStep + 1) % tutorialDirections.length)
              }
              style={{
                marginTop: "20px",
                fontWeight: "strong",
                display: "block"
              }}
            >
              Click{" "}
              {tutorialStep < tutorialDirections.length - 1
                ? "for the next step"
                : "to finish"}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {numRemaining > 0 ? (
        <>
          <h2>Number of Questions Remaining to Level Up: {numRemaining}</h2>
          {description}
          <label style={{ display: "none" }}>
            <h3>Answer:&nbsp;</h3>
            <textarea
              id="answerOld"
              readOnly={tutorialStep !== 0}
              value={currentAnswer}
              cols={40}
              rows={1}
              ref={
                tutorialStep === 4 || tutorialStep === 8
                  ? selectedElement
                  : null
              }
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
          <AnswerInput
            startInTextMode={false}
            tutorialStep={tutorialStep}
            currentAnswer={currentAnswer}
            selectedElement={selectedElement}
            answerBlockData={answerBlockData}
            currentStreak={currentStreak}
            setCurrentAnswer={setCurrentAnswer}
            answer={expectedAnswer}
            handleCodeButtonClick={handleCodeButtonClick}
          />
          {/*<div style={{ display: "flex", justifyContent: "space-around" }}>
            {answerBlockData.map((item) => (
              <button
                onClick={(e) => {
                  handleCodeButtonClick(item.value, e.target);
                  item.used = true;
                  //e.target.disabled = true;
                }}
                disabled={item.used}
              >
                {item.value}
              </button>
            ))}
          </div>
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
            ref={tutorialStep === 5 ? selectedElement : null}
            disabled={tutorialStep !== 0 && tutorialStep !== 5}
          >
            Fix current answer and 2 character hint (+1 problem to solve)
          </button>*/}
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
            ref={tutorialStep === 9 ? selectedElement : null}
            disabled={tutorialStep !== 0 && tutorialStep !== 9}
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
