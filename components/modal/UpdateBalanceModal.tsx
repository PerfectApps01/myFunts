import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: (amount: number, action: "add" | "subtract" | "set") => void;
}

export default function UpdateBalanceModal({ visible, onClose, onSubmit }: Props) {
    const [amount, setAmount] = useState("");

    const handleAction = (action: "add" | "subtract" | "set") => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount)) {
            onSubmit(numericAmount, action);
            setAmount("");
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Изменение стартового баланса</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите сумму"
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <View style={styles.buttons}>
                        <Button title="Добавить" onPress={() => handleAction("add")} />
                        <Button title="Вычесть" onPress={() => handleAction("subtract")} />
                        <Button title="Установить" onPress={() => handleAction("set")} />
                    </View>
                    <Button title="Отмена" onPress={onClose} />
                </View>
            </View>
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
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});
