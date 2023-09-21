import { useState } from "react";
import { ActionTypes } from "../enums/calculator/ActionTypes";

const calc = {
    '0': [ 'AC', '+/-', '%', '/' ],
    '1': [ '7', '8', '9', 'X' ],
    '2': [ '4', '5', '6', '-' ],
    '3': [ '1', '2', '3', '+' ],
    '4': [ '0', '.', '=' ],
};

const color = {
    '#2D2D2D': [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.' ],
    '#FF9450': [ '+', '-', 'X', '/', '=' ],
    '#9B9B9B': [ 'AC', '+/-', '%' ],
};

export const useCalculator = () => {
    const [ number, setNumber ] = useState('0');
    const [ lastNumber, setLastNumber ] = useState('');
    const [ operation, setOperation ] = useState<string | null>();
    const [ isOver, setIsOver ] = useState(false);

    const backgroundColor = (text: string): string => {
        let colorButton = '#2D2D2D';
        Object.entries(color).forEach(([ key, value ]) => {
            if (value.includes(text)) {
                colorButton = key;
            }
        });
        return colorButton;
    };

    const clean = () => {
        setNumber('0');
        setLastNumber('');
        setOperation(null);
    };

    const generateNumber = (textNumber: string) => {
        if (number.length > 9) return;
        if (number.includes('.') && textNumber === '.') return;
        if (isNaN(parseFloat(textNumber)) && textNumber !== '.') return;
        if (isOver) {
            setNumber(textNumber === '.' ? '0.' : textNumber);
            setIsOver(false);
        } else {
            setNumber(number === '0' && textNumber !== '.' ? textNumber : number + textNumber);
        }
    };

    const changeSign = () => {
        if (number !== '0') {
            setNumber(number.includes('-') ? number.replace('-', '') : '-' + number);
        }
    };

    const deleteNumber = () => {
        let newNumber = number.slice(0, -1);
        setNumber(isNaN(parseFloat(newNumber)) || newNumber === '' || newNumber === '-0' ? '0' : newNumber);
    };

    const ACTIONS: Record<ActionTypes, () => void> = {
        [ ActionTypes.AC ]: () => clean(),
        [ ActionTypes.sign ]: () => changeSign(),
        [ ActionTypes.add ]: () => operate(ActionTypes.add),
        [ ActionTypes.substract ]: () => operate(ActionTypes.substract),
        [ ActionTypes.multiply ]: () => operate(ActionTypes.multiply),
        [ ActionTypes.divide ]: () => operate(ActionTypes.divide),
        [ ActionTypes.equals ]: () => calculate(ActionTypes.equals)
    };

    const swipeConfig = {
        onSwipeLeft: deleteNumber,
    };

    const changeNumber = () => {
        if (number.endsWith('.')) {
            setLastNumber(number.slice(0, -1));
        } else {
            setLastNumber(number);
        }

        setNumber('0');
    };

    const operate = (operator: string) => {
        if (operation) {
            calculate(operation);
        } else {
            changeNumber();
        }

        setOperation(operator);
    };

    const calculate = (key: string) => {
        const num1 = parseFloat(lastNumber);
        let num2 = parseFloat(number);
        if (isNaN(num2)) num2 = 0;
        let result;

        switch (operation) {
            case ActionTypes.add:
                result = (`${ num1 + num2 }`);
                console.log(result);
                break;
            case ActionTypes.substract:
                result = (`${ num1 - num2 }`);
                break;
            case ActionTypes.multiply:
                result = (`${ num1 * num2 }`);
                break;
            case ActionTypes.divide:
                result = (`${ num1 / num2 }`);
                break;
            default:
                result = '0';
                clean();
                break;
        }

        if (key !== ActionTypes.equals) {
            setNumber('0');
            setLastNumber(result);
        } else {
            setNumber(result);
            setLastNumber('');
            setOperation(null);
            setIsOver(true);
        }
    };
    
    return {
        number,
        lastNumber,
        operation,
        calc,
        ACTIONS,
        backgroundColor,
        generateNumber,
        swipeConfig,
        calculate,
        deleteNumber,
        changeSign,
        clean,
        operate,
        changeNumber,
    }
};
