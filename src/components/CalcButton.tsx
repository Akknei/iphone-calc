import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../theme/appTheme";

interface Props {
    text: string;
    backgroundColor: string;
    flag?: boolean;
    action?: (textNumber: string) => void;
    operation?: string | null;
}

export const CalcButton = ({ flag = false, text, backgroundColor, action, operation }: Props) => {
    return (
        <TouchableOpacity
            onPress={() => action && action(text)}
        >
            <View style={{
                ...styles.button,
                backgroundColor: operation === text ? 'gray' : backgroundColor,
                width: flag ? 170 : 80
            }}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};
