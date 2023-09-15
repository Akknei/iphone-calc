import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../theme/appTheme";

interface Props {
    text: string;
    backgroundColor: string;
    flag?: boolean;
    action?: (textNumber: string)=> void;
}

export const CalcButton = ({ flag = false, text, backgroundColor, action}: Props) => {
    return (
        <TouchableOpacity
            onPress={() => action && action(text)}
        >
            <View style={{
                    ...styles.button, 
                    backgroundColor, 
                    width: flag ? 170 : 80
                }}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};
