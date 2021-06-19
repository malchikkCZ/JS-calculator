const lcd = document.getElementById("display");
const numbers = document.querySelectorAll("#numbers button");
const operators = document.querySelectorAll("#operators button");
const operation = document.getElementById("operation");
const percIndicator = document.getElementById("percIndicator");

var cache = [];
var result = 0;

for (var number of numbers) {
    number.addEventListener("click", function () {appendNumber(this)});
}

for (var operator of operators) {
    operator.addEventListener("click", function () {queueOperation(this)});
}

document.getElementById("ac").addEventListener("click", clearDisplay);
document.getElementById("plusmin").addEventListener("click", plusMinus);
document.getElementById("perc").addEventListener("click", percentage);

function appendNumber(number) {
    percIndicator.innerHTML = "";
    if (number.name === "coma") {
        if (!(cache.includes("."))) {
            cache.push(".");
        }
    } else {
        cache.push(number.innerHTML);
    }
    lcd.innerHTML = cache.join("");
}

function queueOperation(operator) {
    percIndicator.innerHTML = "";
    if (operator.name === "result") {
        calculate();
    } else {
        if (operation.innerHTML != "") {
            calculate();
        }
        result = parseFloat(lcd.innerHTML);
        if (isNaN(result)) {
            result = 0;
        }
        cache = [];
        operation.innerHTML = operator.name;
    }
}

function plusMinus() {
    var display = lcd.innerHTML.toString().split("");
    if (display[0] == "-") {
        display.shift();
    } else {
        display.unshift("-");
    }
    lcd.innerHTML = display.join("");
}

function percentage() {
    var number = parseFloat(lcd.innerHTML);
    if (operation.innerHTML === "add") {
        result = result + (result / 100 * number);
    } else if (operation.innerHTML === "subtract") {
        result = result - (result / 100 * number);
    } else if (operation.innerHTML === "multiply") {
        result = result / 100 * number;
    } else if (operation.innerHTML === "divide") {
        if (number === 0) {
            result = 0;
        } else {
            result = (result / number) * 100;
        }
    } else {
        result = number;
    }
    lcd.innerHTML = result;
    percIndicator.innerHTML = "perc";
    clearAll();
}

function calculate() {
    var number = parseFloat(lcd.innerHTML);
    if (operation.innerHTML === "add") {
        result = result + number;
    } else if (operation.innerHTML === "subtract") {
        result = result - number;
    } else if (operation.innerHTML === "multiply") {
        result = result * number;
    } else if (operation.innerHTML === "divide") {
        if (number == 0) {
            result = "DIV ZERO ERR";
        } else {
            result = result / number;
        }
    } else {
        result = number;
    }
    lcd.innerHTML = result;
    cache = [];
    clearAll();
}

function clearDisplay() {
    if (cache.length === 0) {
        clearAll();
    }
    cache = [];
    lcd.innerHTML = "0";
    percIndicator.innerHTML = "";
}

function clearAll() {
    result = 0;
    operation.innerHTML = "";
}