import React, { useState } from 'react';
import { Text, View } from "react-native";
import { styles } from "../theme/appTheme";
import { CalcButton } from "../components/CalcButton";
import GestureRecognizer from "react-native-swipe-gestures";

const calc = {
  '0': [ 'AC', '+/-', '%', '/' ],
  '1': [ '7', '8', '9', 'X' ],
  '2': [ '4', '5', '6', '-' ],
  '3': [ '1', '2', '3', '+' ],
  '4': [ '0', '.', '=' ],
};

enum ActionTypes {
  AC = 'AC',
  sign = '+/-',
  del = '%',
}

export const CalculatorScreen = () => {

  const [ number, setNumber ] = useState('100');

  const clean = () => {
    setNumber('0');
  };

  const generateNumber = (textNumber: string) => {
    if (number.includes('.') && textNumber === '.') return;
    if (isNaN(Number(textNumber)) && textNumber !== '.') return;
    setNumber(number === '0' && textNumber !== '.' ? textNumber : number + textNumber);

  };

  const changeSign = () => {
    if (number !== '0') {
      setNumber(number.includes('-') ? number.replace('-', '') : '-' + number);
    }
  };

  const deleteNumber = () => {
    let newNumber = number.slice(0, -1);
    setNumber(isNaN(Number(newNumber)) || newNumber === '' || newNumber === '-0' ? '0' : newNumber);
  };

  const ACTIONS: Record<ActionTypes, () => void> = {
    [ ActionTypes.AC ]: () => clean(),
    [ ActionTypes.sign ]: () => changeSign(),
    [ ActionTypes.del ]: () => deleteNumber(),
  };

  const swipeConfig = {
    onSwipeLeft: deleteNumber,
  }

  return (
    <View style={styles.calcContainer}>
      <Text
        style={styles.miniResult}
      >
        1,500.00</Text>
        <GestureRecognizer {...swipeConfig}>
            <Text
              style={styles.result}
            >
              {number}</Text>
        </GestureRecognizer>

      {Object.values(calc).map((array, indexArray) => {
        return (
          <View style={styles.row} key={indexArray}>
            {array.map((button, index) => {
              return (
                <CalcButton key={index} action={ACTIONS[ button as ActionTypes ] || (() => generateNumber(button))} flag={index === 0 && indexArray === 4} text={button} backgroundColor={index === array.length - 1 ? '#FF9427' : '#2D2D2D'} />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
