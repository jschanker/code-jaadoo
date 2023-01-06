import React from "react";

const normalizeAnswer = (answer) => answer.replace(/\s\s+/g, " ");
const repeatCharTimes = (c, times) => Array(times).fill(c).join("");

export default function AnswerInput({
  startInTextMode,
  tutorialStep,
  currentAnswer,
  selectedElement,
  answerBlockData,
  currentStreak,
  setCurrentAnswer,
  // handleCodeButtonClick,
  answer
}) {
  const [isTextMode, setIsTextMode] = React.useState(!!startInTextMode);
  const [
    currentAnswerBlockIndices,
    setCurrentAnswerBlockIndices
  ] = React.useState([]);
  const isAnswerComplete =
    normalizeAnswer(answer) === normalizeAnswer(currentAnswer);
  const isAnswerCorrect = normalizeAnswer(answer).startsWith(
    normalizeAnswer(currentAnswer)
  );
  const answerBackgroundColor = isAnswerComplete
    ? "green"
    : isAnswerCorrect
    ? "white"
    : "red";

  const updateUsedAnswerBlocks = (textAnswer) => {
    const newAnswerBlockIndices = [];
    let sToBlockify = normalizeAnswer(textAnswer);
    /*
    let blocksLeft = answerBlockData
      .slice()
      .map(({ value }) => ({ value, used: false }));
    */
    answerBlockData.forEach((item) => (item.used = false));
    let nextIndex = answerBlockData.findIndex((item) =>
      sToBlockify.startsWith(item.value)
    );
    for (let i = 0; nextIndex !== -1 && i < answerBlockData.length; i++) {
      newAnswerBlockIndices.push(nextIndex);
      answerBlockData[nextIndex].used = true;
      sToBlockify = sToBlockify.substring(
        answerBlockData[nextIndex].value.length
      );
      nextIndex = answerBlockData.findIndex(
        (item) => sToBlockify.startsWith(item.value) && !item.used
      );
    }
    setCurrentAnswerBlockIndices(newAnswerBlockIndices);
    setCurrentAnswer(textAnswer);
  };

  React.useEffect(() => {
    updateUsedAnswerBlocks(currentAnswer);
  }, [isTextMode, answerBlockData]);

  const handleCodeButtonClick = (code, ele) => {
    if (isTextMode) {
      setCurrentAnswer(
        currentAnswer.endsWith(code)
          ? currentAnswer.slice(0, -code.length)
          : currentAnswer + code
      );
      setIsTextMode(false);
    } else {
      setCurrentAnswer(
        currentAnswerBlockIndices.reduce(
          (codeStr, answerBlockIndex) =>
            answerBlockData[answerBlockIndex].used
              ? codeStr + answerBlockData[answerBlockIndex].value
              : codeStr,
          ""
        ) + code
      );
    }
  };

  return (
    <>
      <h3>Answer:&nbsp;</h3>
      {isTextMode ? (
        <>
          <label>
            <textarea
              id="answer"
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
                backgroundColor: answerBackgroundColor,
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
                const newValue = e.target.value;
                const newAnswerBlockIndices = [];
                let sToBlockify = newValue;
                /*
                let blocksLeft = answerBlockData
                  .slice()
                  .map(({ value }) => ({ value, used: false }));
                */
                answerBlockData.forEach((item) => (item.used = false));
                let nextIndex = answerBlockData.findIndex((item) =>
                  sToBlockify.startsWith(item.value)
                );
                for (
                  let i = 0;
                  nextIndex !== -1 && i < answerBlockData.length;
                  i++
                ) {
                  newAnswerBlockIndices.push(nextIndex);
                  answerBlockData[nextIndex].used = true;
                  sToBlockify = sToBlockify.substring(
                    answerBlockData[nextIndex].value.length
                  );
                  nextIndex = answerBlockData.findIndex(
                    (item) => sToBlockify.startsWith(item.value) && !item.used
                  );
                }
                setCurrentAnswerBlockIndices(newAnswerBlockIndices);
                setCurrentAnswer(newValue, e.target);
              }}
              autoFocus
            />
          </label>
        </>
      ) : (
        <>
          <div
            id="answerBlock"
            //style={{ position: "relative", backgroundColor: "blue" }}
          >
            <label>
              <textarea
                id="answer"
                readOnly
                //value={currentAnswer}
                //cols={40}
                //rows={1}
                ref={
                  tutorialStep === 4 || tutorialStep === 8
                    ? selectedElement
                    : null
                }
                style={{
                  maxWidth: "95%",
                  visibility: "hidden",
                  display: "none",
                  color: "white",
                  width: document
                    .getElementById("blockAnswerDiv")
                    ?.getBoundingClientRect().width,
                  height: document
                    .getElementById("blockAnswerDiv")
                    ?.getBoundingClientRect().height,
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
                  setCurrentAnswer(e.target.value, e.target);
                }}
                onClick={(e) => {
                  let i = 0;
                  let s = "";
                  let suffix =
                    answerBlockData[currentAnswerBlockIndices[i]]?.value;
                  while (
                    answer.startsWith(s + suffix) &&
                    i < currentAnswerBlockIndices.length
                  ) {
                    s += suffix;
                    i++;
                    suffix =
                      answerBlockData[currentAnswerBlockIndices[i]]?.value;
                  }
                  currentAnswerBlockIndices
                    .slice(i)
                    .forEach((i) => (answerBlockData[i].used = false));
                  setCurrentAnswer(s);
                  setIsTextMode(true);
                }}
                autoFocus
              />
            </label>
            <div
              style={{
                //position: "absolute",
                top: "50%",
                left: "50%",
                width: "95%",
                //transform: "translate(-50%, -50%)",
                backgroundColor: answerBackgroundColor,
                border: "2px solid black",
                /*width: document
                  .getElementById("blockAnswerDiv")
                  ?.getBoundingClientRect().width,
                height: document
                  .getElementById("blockAnswerDiv")
                  ?.getBoundingClientRect().height,*/
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
                borderRadius: "10px"
              }}
              id="block-answer-div"
              onClick={() => {
                setIsTextMode(true);
                setTimeout(() => {
                  const answerInput = document.getElementById("answer");
                  answerInput.setSelectionRange(answer.length, answer.length);
                  // Adapted from https://stackoverflow.com/a/48460773
                  //   - 40 is for 20px top/bottom padding
                  answerInput.style.height = "";
                  answerInput.style.height =
                    answerInput.scrollHeight - 40 + "px";
                }, 0);
              }}
            >
              {currentAnswerBlockIndices.map((indexInAllBlocks, index) => (
                <button
                  onClick={(e) => {
                    console.log(currentAnswer, answer);
                    console.log(currentAnswerBlockIndices);
                    setIsTextMode(false);
                    answerBlockData[indexInAllBlocks].used = false;
                    setCurrentAnswerBlockIndices(
                      currentAnswerBlockIndices
                        .slice(0, index)
                        .concat(currentAnswerBlockIndices.slice(index + 1))
                    );
                    handleCodeButtonClick(
                      //answerBlockData[indexInAllBlocks].value,
                      "",
                      e.target
                    );
                    //e.target.disabled = true;
                  }}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "xx-large",
                    maxWidth: "95%",
                    overflow: "auto"
                  }}
                  disabled={!answerBlockData[indexInAllBlocks]?.used}
                >
                  {answerBlockData[indexInAllBlocks]?.value}
                </button>
              ))}
            </div>
          </div>
          <br />
          <br />
        </>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          maxWidth: "95%"
        }}
      >
        {answerBlockData.map((item, index) => (
          <button
            onClick={(e) => {
              console.log(index, currentAnswerBlockIndices);
              setCurrentAnswerBlockIndices(
                currentAnswerBlockIndices.concat(index)
              );
              handleCodeButtonClick(item.value, e.target);
              item.used = true;
              //e.target.disabled = true;
            }}
            style={{ fontFamily: "monospace", minWidth: 0 }}
            disabled={item.used}
          >
            {item.used ? repeatCharTimes(" ", item.value.length) : item.value}
          </button>
        ))}
      </div>
      <hr />
    </>
  );
}
