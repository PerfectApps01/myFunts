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
    icon: React.FC<{ width?: number; height?: number }>;
    handler: (name: string, modalType: string) => void;
    total: string
}

const CategoryItem: FC<CategoryItemProps> = ({name, icon: IconComponent, handler, total}) => {
    const buttonHandler = () => {
        handler(name, 'setCategory')
    }
    return (
        <TouchableOpacity style={styles.main} onPress={buttonHandler}>
            <View style={styles.category}>
                {name && <Text style={styles.category_text}>{name}</Text>}
                <View style={{}}>
                <IconComponent width={40} height={40} />
                </View>
            </View>
            <View>
                <Text>{total.length !== 0 ? total : '0'} €</Text>
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
