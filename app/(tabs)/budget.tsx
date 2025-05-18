import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from "react";
import CategoryPrompt from "@/components/modal/modal";
import CategoryItem from "@/components/categoryItem/CategoryItem";
import {icons} from "@/constants/CategoryIcons";
import categories from "@/constants/CategoriesData.json";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {fetchBalance, updateBudget} from "@/store/reducers/ActionCreators";

export default function Budget() {
    const dispatch = useAppDispatch();
    const {balanceData, isLoading} = useAppSelector(state => state.balanceReducer);
    const {balance, totals} = balanceData

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    const [visible, setVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({name: '', budget: ''});

    const handleCategory = async (input: string) => {
        dispatch(updateBudget({category: currentCategory.name, amount: input, budget: currentCategory.budget}));
    };

    const buttonHandler = (id: string, budget: string) => {
        setVisible(true);
        setCurrentCategory({name: id, budget: budget});
    }


    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.header}>
                {isLoading ? (
                    <Text>Загрузка...</Text>
                ) : (
                    <>
                        <Text style={styles.startBalance}>
                            {balance.startBalance} €
                        </Text>
                        <Text style={styles.startBalance}>
                            {balance.currentBudget} €
                        </Text>
                    </>
                )}

            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 51 }} style={styles.main}>
                {categories.categories.map((category, index) => (
                    <TouchableOpacity onPress={() => {
                        buttonHandler(category.id, totals[index].budget);
                    }} style={[styles.budgetItem, {backgroundColor: category.bgColor}]} key={category.id}>
                        <View style={styles.iconContainer}>
                            <CategoryItem
                                key={category.id}
                                icon={icons[category.id]}
                                categoryColor={category.bgIconColor}
                                isHome={false}
                            />
                            <Text style={[styles.categoryName, {color: category.bgIconColor}]}>{category.name}</Text>
                        </View>
                        <View style={styles.amount}>
                            <Text style={styles.amountText}>{totals[index] ? totals[index].budget : '0'} €</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <CategoryPrompt
                visible={visible}
                onSubmit={handleCategory}
                onClose={() => setVisible(false)}
                isBudget={true}
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
        width: '40%',
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
        color: '#509b4f'
    },
    startBalance: {
        fontSize: 27,
        fontWeight: 'bold',
    },
});
