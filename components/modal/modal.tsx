import React, {useState} from "react";
import {Modal, View, Text, TextInput, Button} from "react-native";

interface CategoryPromptProps {
    visible: boolean;
    onSubmit: (input: string) => void;
    onClose: () => void;
}

const CategoryPrompt = ({visible, onClose, onSubmit}: CategoryPromptProps) => {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (input.length !== 0) {
            onSubmit(input);
            setInput('')
            onClose();
        }
    }

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)"}}>
                <View style={{backgroundColor: "white", padding: 20, borderRadius: 10}}>
                    <Text>Введите категорию:</Text>
                    <TextInput
                        style={{borderBottomWidth: 1, marginBottom: 10}}
                        value={input}
                        onChangeText={setInput}
                    />
                    <Button title="OK" onPress={(event) => {
                        handleSubmit()
                    }}/>
                    <Button title="Close" onPress={onClose}/>
                </View>
            </View>
        </Modal>
    );
};

export default CategoryPrompt;