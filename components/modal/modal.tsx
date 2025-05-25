import React, {useState} from "react";
import {Modal, View, Text, TextInput, StyleSheet, Pressable, Keyboard, TouchableWithoutFeedback} from "react-native";


interface CategoryPromptProps {
    visible: boolean;
    onSubmit: (input: string) => void;
    onClose: () => void;
    isBudget: boolean;
    currentCategory: string;
}

const CategoryPrompt = ({isBudget, visible, currentCategory, onClose, onSubmit}: CategoryPromptProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = () => {
        const isValidInput = input.length !== 0 && (!isBudget ? input !== '0' : true);

        if (isValidInput) {
            onSubmit(input);
            setInput('');
            onClose();
        }

    }

    const CloseHandle = () => {
        setInput('')
        onClose();

    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.main}>
                    <View style={styles.content}>
                        <Text style={styles.categoryText}>{currentCategory}</Text>
                        {!isBudget ? input === '0'
                            ? <Text style={styles.labelText}>Недостаточная сумма!</Text>
                            : <Text style={styles.labelText}>Добавление расхода</Text>
                        : <Text style={styles.labelText}>Добавление бюджета</Text>}
                        <TextInput
                            keyboardType="numeric"
                            placeholder="Введите сумму"
                            style={styles.inputStyle}
                            value={input}
                            onChangeText={setInput}
                        />
                        <View style={styles.buttonsBlock}>
                            <Pressable
                                style={[styles.button, {backgroundColor: 'green'}]}
                                onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Ввод</Text>
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
};

export default CategoryPrompt;

const styles = StyleSheet.create({
    inputStyle: {
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
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
        padding: 20,
        borderRadius: 10,
        width: '70%',
    },
    buttonsBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
    },
    buttonWrapper: {
        flex: 2,
        backgroundColor: "white",
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '48%',

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
    labelText: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 19,
    },
    categoryText: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 22,
    },
});