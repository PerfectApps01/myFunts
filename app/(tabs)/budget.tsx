import {StyleSheet, Image, Platform, View, Text, Button, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from "react";
import CategoryPrompt from "@/components/modal/modal";
import CategoryItem from "@/components/categoryItem/CategoryItem";
import {icons} from "@/constants/CategoryIcons";
import categories from "@/constants/CategoriesData.json";
import {useAppSelector} from "@/hooks/redux";

export default function Budget() {
    const {balanceData, isLoading} = useAppSelector(state => state.balanceReducer);
    const {balance, totals} = balanceData

    const [visible, setVisible] = useState(false);
    const handleCategory = async (input: number) => {
    };

    const categoryHandler = useCallback((name: string) => {
        setVisible(true);
    }, []);


    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.header}>
            </View>
            <View style={styles.main}>
                {categories.categories.map((category, index) => (
                    <View style={[styles.budgetItem, {backgroundColor: category.bgColor}]} key={index}>
                        <View style={styles.iconContainer}>
                            <CategoryItem
                                key={category.id}
                                name={category.name}
                                icon={icons[category.name]}
                                categoryColor={category.bgIconColor}
                                handler={categoryHandler}
                                total={totals[index] ? totals[index].total : '0'}
                                isHome={false}
                            />
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </View>
                        <View style={styles.amount}>
                            <Text style={styles.amountText}>100$</Text>
                        </View>
                    </View>
                ))}
            </View>
            <CategoryPrompt
                visible={visible}
                onSubmit={handleCategory}
                onClose={() => setVisible(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#f5eaec',
    },
    header: {
        height: '15%',
        backgroundColor: '#f5eaec',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    main: {
        height: '85%',
        backgroundColor: '#f5eaec',
        //#2C2C2E
    },
    budgetItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        width: '100%',
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '30%',
        paddingLeft: 15,
    },
    amount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100%',
        minWidth: '30%',
        paddingRight: 15,
    },
    category: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        padding: 15,
        marginBottom: 5,
        borderRadius: 50,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10
    },
    categoryName: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
