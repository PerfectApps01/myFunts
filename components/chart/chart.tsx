import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VictoryPie} from 'victory-pie';

interface dataType {
    label: string;
    amount: number;
    color: string;
}

interface DonutChartPropsType {
    spent: number | string;
    budget: number | null;
    data: dataType[];
    isLoading: boolean;
}

const DonutChart: FC<DonutChartPropsType> = ({spent, budget, data, isLoading}) => {
    return (
        <View style={styles.container}>
            <VictoryPie
                data={data}
                x="category"
                y="total"
                colorScale={data.map(item => item.color)}
                innerRadius={60}
                padAngle={3}
                width={200}
                height={200}
                labelComponent={null}
            />
            <View style={styles.centerContent}>
                {isLoading ? (
                    <Text>Загрузка...</Text>
                ) : (
                    <>
                        <Text style={styles.title}>Расходы</Text>
                        <Text style={styles.spent}>{spent} €</Text>
                        <Text style={styles.budget}>{budget} €</Text>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContent: {
        position: 'absolute',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#555',
    },
    spent: {
        fontSize: 18,
        color: '#FF5A5F',
        fontWeight: 'bold',
    },
    budget: {
        fontSize: 12,
        color: '#50C7C7',
    },
});

export default DonutChart;
