const button = document.querySelectorAll("#shadow");
const input = document.getElementById("input");

button.forEach((button) => {
  button.addEventListener("click", (e) => {
    const isOperator = (char) => {
      return ["+", "-", "÷", "×", "％"].includes(char);
    };
    const value = e.target.value;
    let currentExpression = input.value;
    const lastChar = currentExpression.slice(-1);
    if (isOperator(lastChar) && isOperator(value)) {
      return;
    }
    if (currentExpression.length === 0 && isOperator(value)) {
      return;
    }
    input.value += value;
  });
});

const handleResult = () => {
  function sanitizeExpression(expression) {
    let result = expression
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/％/g, "%");
    console.log(result);
    return result;
  }

  function handlePercentage(expression) {
    let result = expression.replace(/(\d+(\.\d+)?)%/g, (_, num) => {
      return `(${num} / 100)`;
    });
    console.log(result);
    return result;
  }

  const rawInput = input.value.trim();
  if (!rawInput) {
    console.error("Input is empty");
    return;
  }

  // Sanitize and process percentages only once
  let sanitizedExpression = sanitizeExpression(rawInput);
  let expressionWithPercentages = handlePercentage(sanitizedExpression);

  // Evaluate the expression
  const result = eval(expressionWithPercentages);
  console.log(result);

  // Display the result
  input.value = result;
};

const allclear = () => {
  input.value = "";
};
const cleardata = () => {
  const currentExpression = input.value;
  const lastChar = currentExpression.slice(-1);
  if (lastChar === " ") {
    return;
  }
  input.value = currentExpression.slice(0, -1);
};

const changeValue = () => {
  let expression = input.value;
  let firstOperatorIndex = expression.search(/[\+\-\÷\×]/);

  if (firstOperatorIndex !== -1) {
    let beforeFirstOperator = expression.slice(0, firstOperatorIndex + 1);
    let afterFirstOperator = expression.slice(firstOperatorIndex + 1);
    afterFirstOperator = afterFirstOperator.replace(/(\d+)/g, `(-$1)`);
    input.value = beforeFirstOperator + afterFirstOperator;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  const button = document.querySelectorAll("#shadow");
  button.forEach((button) => {
    button.addEventListener("click", () => {
      input.scrollLeft = input.scrollWidth;
      if (input.value.length > 11) {
        input.classList.add("text-2xl");
        input.classList.remove("text-4xl");
      } else {
        input.classList.add("text-4xl");
        input.classList.remove("text-2xl");
      }
      console.log(input.value.length);
    });
  });
});
