import "./styles.css";

export default function TableQuestion({
  inputExamples,
  outputExamples,
  enteredAnswer,
  blocks
}) {
  let evaluateEnteredAnswer = Array.from(enteredAnswer || "").every(
    (_, index) =>
      blocks?.find((block) => {
        const startIndex = enteredAnswer.indexOf(
          block,
          index - block.length + 1
        );
        return startIndex !== -1;
      })
  );
  console.log(
    "Invalid or incomplete token",
    Array.from(enteredAnswer || "").find(
      (_, index) =>
        !blocks?.find((block) => {
          const startIndex = enteredAnswer.indexOf(
            block,
            index - block.length + 1
          );
          return startIndex !== -1;
        })
    )
  );
  const inputVariables = Object.keys(
    inputExamples.length > 0 ? inputExamples[0] : {}
  );
  return (
    <table
      class="table-answer"
      style={{
        backgroundColor: ""
      }}
    >
      {inputVariables.map((inputVariable) => (
        <th>{inputVariable}</th>
      ))}
      <th>
        Output
        <br />
        (from code)
      </th>
      <th>
        Output
        <br />
        (Expected)
      </th>
      {inputExamples.map((input, index) => {
        const actualAnswer = evaluateEnteredAnswer
          ? eval(
              inputVariables
                .map(
                  (variableName) =>
                    `let ${variableName} = ${input[variableName]}`
                )
                .join("\n") +
                "\n" +
                enteredAnswer
            )
          : "-";
        const expectedAnswer = outputExamples[index];
        const isCorrect = actualAnswer === expectedAnswer;
        let backgroundColor = evaluateEnteredAnswer
          ? isCorrect
            ? "rgba(0, 255, 0, 0.25)"
            : "rgba(255, 0, 0, 0.25)"
          : "white";
        return (
          <tr style={{ backgroundColor }}>
            {inputVariables.map((variableName) => (
              <td>{input[variableName]}</td>
            ))}
            <td>{actualAnswer}</td>
            <td>{outputExamples[index]}</td>
          </tr>
        );
      })}
    </table>
  );
}
