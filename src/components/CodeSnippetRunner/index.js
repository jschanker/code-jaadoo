import "./styles.css";

export default function CodeSnippetRunner({ code }) {
  const printFunctionStr = `const print = (...items) => {
      Array.prototype.forEach.call(items, (item) => {
      if(item instanceof Array) {
        item = "[ " + item.map((a) => {
          if(typeof a === "string") { return "'" + a.replace("'", "\\'") + "'"; }
          else { return a; }
        }).reduce((acc, a) => {
          return acc + ", " + a;
        }) + " ]";
      }
      document.getElementById("output").appendChild(document.createTextNode(item));
      document.getElementById("output").appendChild(document.createTextNode(" "));
    });
    document.getElementById("output").appendChild(document.createTextNode("\\n"));
  };`;
  console.log(printFunctionStr + "\n" + code);
  return (
    <div id="code-runner">
      <button onClick={() => eval(printFunctionStr + "\n" + code)}>
        Run Code
      </button>
      <pre id="output"></pre>
    </div>
  );
}
