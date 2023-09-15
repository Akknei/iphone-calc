import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
        paddingHorizontal: 20,
    },
    calcContainer:{ // Estilo para ios
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
    },
    result: {
        color: 'white',
        fontSize: 60,
        textAlign: 'right',
    },
    miniResult: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 30,
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18,
        paddingHorizontal: 10,
        gap: 10
    },
    button: {
        height: 80,
        borderRadius: 100,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        color: 'black',
        fontWeight: '300',
    }
})