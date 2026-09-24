const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

let currentNumber = "";
let previousNumber = "";
let operator = null;


/* =========================
   NUMBER BUTTONS
========================= */

document.querySelectorAll("[data-number]").forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        if (number === "." && currentNumber.includes(".")) {
            return;
        }

        if (currentNumber === "0" && number !== ".") {
            currentNumber = "";
        }

        currentNumber += number;

        updateDisplay();
    });

});


/* =========================
   OPERATOR BUTTONS
========================= */

document.querySelectorAll("[data-operator]").forEach(button => {

    button.addEventListener("click", () => {

        if (currentNumber === "") {
            return;
        }

        if (previousNumber !== "") {
            calculate();
        }

        operator = button.dataset.operator;

        previousNumber = currentNumber;

        currentNumber = "";

        updateDisplay();
    });

});


/* =========================
   ACTION BUTTONS
========================= */

document.querySelector('[data-action="clear"]')
    .addEventListener("click", clearCalculator);


document.querySelector('[data-action="delete"]')
    .addEventListener("click", deleteNumber);


document.querySelector('[data-action="percent"]')
    .addEventListener("click", percentage);


document.querySelector('[data-action="equals"]')
    .addEventListener("click", () => {

        if (previousNumber === "" || currentNumber === "") {
            return;
        }

        calculate();

        operator = null;

        updateDisplay();
    });


/* =========================
   CALCULATE
========================= */

function calculate() {

    const first = Number(previousNumber);
    const second = Number(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":

            if (second === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operator = null;
                return;
            }

            result = first / second;
            break;

        default:
            return;
    }

    currentNumber = String(result);
    previousNumber = "";
}


/* =========================
   CLEAR
========================= */

function clearCalculator() {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    updateDisplay();
}


/* =========================
   DELETE
========================= */

function deleteNumber() {

    if (currentNumber === "Error") {
        clearCalculator();
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


/* =========================
   PERCENTAGE
========================= */

function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber = String(Number(currentNumber) / 100);

    updateDisplay();
}


/* =========================
   UPDATE DISPLAY
========================= */

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    if (operator && previousNumber !== "") {

        let symbol = operator;

        if (operator === "*") symbol = "×";
        if (operator === "/") symbol = "÷";
        if (operator === "-") symbol = "−";

        previousDisplay.textContent =
            `${previousNumber} ${symbol}`;

    } else {

        previousDisplay.textContent = "";
    }
}


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", event => {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {
        addKeyboardNumber(key);
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        addKeyboardOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        document
            .querySelector('[data-action="equals"]')
            .click();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "Escape") {
        clearCalculator();
    }

    else if (key === "%") {
        percentage();
    }

});


function addKeyboardNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;

    updateDisplay();
}


function addKeyboardOperator(symbol) {

    if (currentNumber === "") {
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    operator = symbol;

    previousNumber = currentNumber;

    currentNumber = "";

    updateDisplay();
}