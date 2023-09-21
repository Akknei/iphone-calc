import React from 'react';
import { Text, View } from "react-native";
import { styles } from "../theme/appTheme";
import { CalcButton } from "../components/CalcButton";
import GestureRecognizer from "react-native-swipe-gestures";
import { useCalculator } from "../hook/useCalculator";
import { ActionTypes } from "../enums/calculator/ActionTypes";


export const CalculatorScreen = () => {

  const { calc, ACTIONS, backgroundColor, lastNumber, swipeConfig, number, operation, generateNumber } = useCalculator();

  return (
    <View style={styles.calcContainer}>
      <Text
        style={styles.miniResult}
      >
        {lastNumber}</Text>
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
                <CalcButton key={index} operation={operation} action={ACTIONS[ button as ActionTypes ] || (() => generateNumber(button))} flag={index === 0 && indexArray === 4} text={button} backgroundColor={backgroundColor(button)}  />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};
