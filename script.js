let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }

  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "Delete":
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "Enter":
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "Backspace":
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "*":
    case "/":
    case "-":
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "−" || previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×" || previousOperator === "*") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷" || previousOperator === "/") {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });

  document.querySelector("body").addEventListener("keydown", function (event) {
    buttonClick(event.key);
    // console.log(event.key);
  });
}

init();
