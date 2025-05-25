import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import React, {FC} from "react";
import BudgetIcon from "@/components/Common/BudgetIcon";

interface CategoryItemProps {
    name?: string;
    id?: string;
    icon?: React.FC<{ width?: number; height?: number }>;
    handler?: (id: string, modalType: string) => void;
    total?: string,
    budget?: string,
    categoryColor: string,
    isHome: boolean,
}

const CategoryItem: FC<CategoryItemProps> = ({name, id, icon: IconComponent, handler, total, categoryColor, isHome, budget}) => {

    const buttonHandler = () => {
        if (handler) {
            handler(id, 'setCategory')
        }
    }

    return (
        <TouchableOpacity style={styles.main} onPress={buttonHandler}>
            {isHome && name && <Text style={styles.category_text}>{name}</Text>}
            <View style={styles.budgetContainer}>
                {isHome && <BudgetIcon width={17} height={18} fill={categoryColor}/>}
                {isHome && <Text style={[styles.startBudget_text, {color: categoryColor}]}>{budget && budget.length !== 0 ? budget : '0'} €</Text>}
            </View>
            <View style={[styles.category, {backgroundColor: categoryColor, marginBottom: isHome ? 5 : 0}]}>
                <View>
                    <IconComponent width={isHome ? 30 : 17} height={isHome ? 30 : 17}/>
                </View>
            </View>
            {isHome && <View>
                <Text style={[styles.total_text, {color: categoryColor}]}>{total && total.length !== 0 ? total : '0'} €</Text>
            </View>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    category: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        padding: 15,
        marginBottom: 5,
        borderRadius: 50,
    },
    category_text: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 2,
        fontSize: 15
    },
    total_text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 17
    },
    startBudget_text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18
    },
    main: {
        width: "30%",
        display: "flex",
        alignItems: 'center',
        margin: 5
    },
    budgetContainer: {
        display: "flex",
        flexDirection: "row"
    },


});

export default CategoryItem;
