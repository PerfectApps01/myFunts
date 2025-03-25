import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import React, {FC} from "react";

interface CategoryItemProps {
    name: string;
    id: string;
    icon: any;
    //make string types for name
    handler: (name: string) => void;
}

const CategoryItem: FC<CategoryItemProps> = ({name, id, icon, handler}) => {
    const buttonHandler = () => {
        handler(name)
    }

    return (
        <TouchableOpacity style={styles.main} onPress={buttonHandler}>
            <View style={styles.category}>
                {name && <Text style={styles.category_text}>{name}</Text>}
                <Image style={styles.icon} source={icon}/>
            </View>
            <View>
                <Text>45234</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    category: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        width: '80px',
        height: '60px',
        borderRadius: 30,
    },
    icon: {
        width: '30px',
        height: '30px'
    },
    category_text: {
        color: 'white'
    },
    main: {
        display: "flex",
        alignItems: 'center',

    },


});

export default CategoryItem;