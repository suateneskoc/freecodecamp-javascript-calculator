/* eslint-disable no-new-func */
import { useState } from "react";

const numberId = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const operations = [
  { id: "divide", label: "/", symbol: "/" },
  { id: "multiply", label: "×", symbol: "*" },
  { id: "subtract", label: "-", symbol: "-" },
  { id: "add", label: "+", symbol: "+" },
];

function App() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-2">
      <div className="grid aspect-[2/3] w-full max-w-sm grid-cols-4 grid-rows-6 gap-1 rounded-lg bg-black p-2 font-mono text-2xl text-white">
        <div className="col-span-4 flex flex-col items-end justify-evenly rounded-lg bg-gray-800 px-2">
          <div className="text-lg text-green-600">{history}</div>
          <div id="display" className="text-3xl">
            {display}
          </div>
        </div>

        {/* AC */}
        <button
          id="clear"
          className="col-span-3 col-start-1 row-start-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700"
          onClick={() => {
            setHistory("");
            setDisplay("0");
          }}
        >
          AC
        </button>

        {/* Operations */}
        {operations.map((operation, index) => (
          <button
            id={operation.id}
            className="col-span-1 col-start-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600"
            style={{ gridRowStart: index + 2 }}
            onClick={() => {
              if (operation.symbol === "-") {
                if (["/", "*", "+"].includes(display))
                  setHistory((prev) => prev + "-");
                else if (parseFloat(display)) {
                  if (history.includes("="))
                    setHistory(display + operation.symbol);
                  else setHistory((prev) => prev + display + operation.symbol);
                  setDisplay(operation.symbol);
                }
              } else {
                if (
                  operations
                    .map((operation) => operation.symbol)
                    .includes(display)
                ) {
                  setHistory(
                    history.replace(/(\/|\*|\+|-)+$/, operation.symbol)
                  );
                  setDisplay(operation.symbol);
                } else if (parseFloat(display)) {
                  if (history.includes("="))
                    setHistory(display + operation.symbol);
                  else setHistory((prev) => prev + display + operation.symbol);
                  setDisplay(operation.symbol);
                }
              }
            }}
          >
            {operation.label}
          </button>
        ))}

        {/* Equals */}
        <button
          id="equals"
          className="col-span-1 col-start-4 row-start-6 bg-blue-600 hover:bg-blue-500 active:bg-blue-700"
          onClick={() => {
            let temp = display;
            let result = Function("return " + history + display)();
            setHistory((prev) => prev + temp + "=" + result);
            setDisplay(result);
          }}
        >
          =
        </button>

        {/* Numbers */}
        {Array.from(Array(9).keys()).map((i) => {
          return (
            <button
              id={numberId[i + 1]}
              className="bg-gray-500 hover:bg-gray-400 active:bg-gray-600"
              style={{
                gridRow: parseInt(i / 3) + 3 + " / " + (parseInt(i / 3) + 4),
                gridColumn: (i % 3) + 1 + " / " + ((i % 3) + 2),
              }}
              onClick={() => {
                if (
                  [
                    ...operations.map((operation) => operation.symbol),
                    "0",
                  ].includes(display)
                )
                  setDisplay("" + (i + 1));
                else setDisplay((prev) => prev + (i + 1));
              }}
            >
              {i + 1}
            </button>
          );
        })}

        {/* Zero */}
        <button
          id={numberId[0]}
          className="col-span-2 col-start-1 row-start-6 bg-gray-500 hover:bg-gray-400 active:bg-gray-600"
          onClick={() => {
            if (display !== "0") setDisplay((prev) => prev + 0);
          }}
        >
          0
        </button>

        {/* Decimal */}
        <button
          id="decimal"
          className="col-span-1 col-start-3 row-start-6 bg-gray-500 hover:bg-gray-400 active:bg-gray-600"
          onClick={() => {
            if (["/", "*", "-", "+"].includes(display)) setDisplay("0.");
            else if (display.indexOf(".") === -1)
              setDisplay((prev) => prev + ".");
          }}
        >
          .
        </button>
      </div>
      <a href="https://github.com/suateneskoc/freecodecamp-javascript-calculator">
        GitHub
      </a>
    </div>
  );
}

export default App;
