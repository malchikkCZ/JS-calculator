const lcd = document.getElementById("display");
const numbers = document.querySelectorAll("#numbers button");
const operators = document.querySelectorAll("#operators button");
const operation = document.getElementById("operation");

var cache = [];
var result = 0;

for (var number of numbers) {
    number.addEventListener("click", function () {appendNumber(this)});
}

for (var operator of operators) {
    operator.addEventListener("click", function () {queueOperation(this)});
}

document.getElementById("ac").addEventListener("click", clearDisplay);


function appendNumber(number) {
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
            cache = [];
        } else {
            result = result / number;
        }
    } else {
        result = number;
    }
    lcd.innerHTML = result;
    clearAll();
}

function clearDisplay() {
    if (cache.length === 0) {
        clearAll();
    }
    cache = [];
    lcd.innerHTML = "0";
}

function clearAll() {
    result = 0;
    operation.innerHTML = "";
}