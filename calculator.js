const display = document.getElementById("display");

let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;

function appendNumber(number) {
    if (display.value === "Error") {
        clearDisplay();
    }

    if (number === "." && display.value.includes(".") && !waitingForSecondNumber) {
        return;
    }

    if (waitingForSecondNumber) {
        display.value = number === "." ? "0." : number;
        waitingForSecondNumber = false;
        return;
    }

    if (number === "." && display.value === "0") {
        display.value = "0.";
    } else {
        display.value = display.value === "0" && number !== "."
            ? number
            : display.value + number;
    }
}

function chooseOperator(operator) {
    if (display.value === "Error") return;

    const inputValue = Number(display.value);

    if (currentOperator && !waitingForSecondNumber) {
        const result = performCalculation(firstNumber, inputValue, currentOperator);

        if (!Number.isFinite(result)) {
            showError();
            return;
        }

        display.value = String(Number(result.toPrecision(10)));
        firstNumber = result;
    } else {
        firstNumber = inputValue;
    }

    currentOperator = operator;
    waitingForSecondNumber = true;
}

function calculate() {
    if (currentOperator === null || waitingForSecondNumber) return;

    const secondNumber = Number(display.value);
    const result = performCalculation(firstNumber, secondNumber, currentOperator);

    if (!Number.isFinite(result)) {
        showError();
        return;
    }

    display.value = String(Number(result.toPrecision(10)));
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = true;
}

function performCalculation(first, second, operator) {
    switch (operator) {
        case "+": return first + second;
        case "-": return first - second;
        case "*": return first * second;
        case "/": return second === 0 ? NaN : first / second;
        default: return second;
    }
}

function clearDisplay() {
    display.value = "0";
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
}

function deleteLast() {
    if (display.value === "Error" || waitingForSecondNumber) {
        display.value = "0";
        waitingForSecondNumber = false;
        return;
    }

    display.value = display.value.length > 1
        ? display.value.slice(0, -1)
        : "0";
}

function showError() {
    display.value = "Error";
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = true;
}

function logout() {
    window.location.href = "./index.html";
}