import React from "react";
import { v4 as uuid } from "uuid"

import Button from "./button"

import "./App.css"

function App() {
    const [visorText, setVisorText] = React.useState("");
    const [firstNumber, setFirstNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [isResult, setIsResult] = React.useState(false);

    const buttonLabels = [
        "DEL", "C", "^", "%",
        "7", "8", "9", "X",
        "4", "5", "6", "/",
        "1", "2", "3", "+",
        "0", ".", "=", "-"
    ];

    function handleEquals() {
        if (firstNumber.length <= 0 || visorText.length <= 0)
            return;
        const n1 = parseFloat(firstNumber);
        const n2 = parseFloat(visorText);
        if (isNaN(n1) || isNaN(n2)) return;
        let result = 0;
        switch (operation) {
            case "+":
                result = n1 + n2;
                break;
            case "-":
                result = n1 - n2;
                break;
            case "X":
                result = n1 * n2;
                break;
            case "/":
                result = n2 === 0 ? "ERROR!" : n1 / n2;
                break;
            case "^":
                result = (n1 === n2 && n1 === 0) ? "ERROR!" : Math.pow(n1, n2);
                break;
            case "%":
                result = n1 * n2 / 100;
                break;
            default:
                result = "ERROR!";
        }
        setVisorText(result.toString());
        setIsResult(true);
        setFirstNumber("");
    }

    function handleOperation(operator) {
        const n1 = parseFloat(visorText);
        if (operator === "DEL") {
            setVisorText(previousVisorText => isNaN(n1) ? "" : previousVisorText.slice(0, previousVisorText.length - 1));
            return;
        }
        if (operator === "C") {
            setVisorText("");
            setFirstNumber(0);
            setOperation("");
            setIsResult(false);
            return;
        }
        if (operator === "=") {
            handleEquals();
            return;
        }
        if (visorText.endsWith(".")) return;
        if (isNaN(n1)) return;
        setFirstNumber(parseFloat(visorText));
        setVisorText("");
        setOperation(operator);
    }

    function appendDigit(label) {
        if (label === "." && visorText.includes(".")) return;
        if (isResult) {
            setVisorText("");
            setIsResult(false);
        }
        setVisorText(previousVisorText => `${previousVisorText}${label}`);
    }

    function handleClick(label, isOperator) {
        isOperator ? handleOperation(label) : appendDigit(label);
    }

    const buttons = buttonLabels.map(label => <Button
        key={uuid()}
        label={label}
        clickHandler={handleClick}
    />);

    return (
        <main id="main-container">
            <div id="calculator-container">
                <section id="calculator-visor" type="text">{visorText}</section>
                <div id="buttons-container">
                    {buttons}
                </div>
            </div>
        </main>
    );
}

export default App;