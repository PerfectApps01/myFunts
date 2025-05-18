import React, {useState} from "react";
import {Modal, View, Text, TextInput, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback} from "react-native";


interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: (amount: number, action: "add" | "subtract" | "set") => void;
}

export default function UpdateBalanceModal({visible, onClose, onSubmit}: Props) {
    const [amount, setAmount] = useState("");

    const handleAction = (action: "add" | "subtract" | "set") => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && amount !== '0') {
            onSubmit(numericAmount, action);
            setAmount("");
            onClose();
        }
    };

    const CloseHandle = () => {
        setAmount('')
        onClose();

    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>Изменение стартового баланса</Text>
                        <TextInput
                            importantForAccessibility="yes"
                            accessible={true}
                            style={styles.input}
                            placeholder="Введите сумму"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <View style={styles.buttons}>
                            <Pressable style={[styles.button, {backgroundColor: 'green'}]}
                                       onPress={() => handleAction("add")}>
                                <Text style={styles.buttonText}>Добавить</Text>
                            </Pressable>
                            <Pressable style={[styles.button, {backgroundColor: 'green'}]}
                                       onPress={() => handleAction("subtract")}>
                                <Text style={styles.buttonText}>Вычесть</Text>
                            </Pressable>
                            <Pressable style={[styles.button, {backgroundColor: 'green'}]}
                                       onPress={() => handleAction("set")}>
                                <Text style={styles.buttonText}>Установить</Text>
                            </Pressable>
                            <Pressable style={[styles.button, {backgroundColor: 'red'}]} onPress={CloseHandle}>
                                <Text style={styles.buttonText}>Отмена</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modal: {
        width: '60%',
        padding: 20,
        //backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        marginTop: -40,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 19,
    },
    input: {
        width: '100%',
        height: 48,
        borderColor: '#ccc',
        borderWidth: 3,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        marginBottom: 16,

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.7,
        shadowRadius: 4,
        // Android shadow
        elevation: 5,
    },
    buttons: {
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 11,

        shadowColor: '#000',
        shadowOffset: {width: 0, height: 6},
        shadowOpacity: 0.7,
        shadowRadius: 4,
        // Android shadow
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
