import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import * as d3Shape from 'd3-shape';

const size = 140;
const radius = size / 2;
const gap = 2; // Зазор между секторами в градусах

interface DataItem {
    category: string;
    total: number;
    color: string;
}

interface DonutChartProps {
    data: DataItem[];
    spent: number;
    budget: number;
    isLoading: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, spent, budget, isLoading }) => {
    const pieData = d3Shape.pie<DataItem>()
        .value(d => d.total)
        .sort(null)(data);

    const arcGenerator = d3Shape.arc<d3Shape.PieArcDatum<DataItem>>()
        .outerRadius(radius / 1.2)
        .innerRadius(radius / 1.05);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G x={size / 2} y={size / 2}>
                    {pieData.map((slice, index) => {
                        const path = arcGenerator({
                            ...slice,
                            startAngle: slice.startAngle + (gap * Math.PI / 180),
                            endAngle: slice.endAngle - (gap * Math.PI / 180),
                        }) || '';

                        return (
                            <Path
                                key={`slice-${index}`}
                                d={path}
                                fill={slice.data.color}
                            />
                        );
                    })}
                </G>
            </Svg>

            <View style={StyleSheet.absoluteFillObject}>
                <View style={styles.centerTextWrapper}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerTextWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        color: '#555',
    },
    spent: {
        fontSize: 20,
        color: '#FF5A5F',
        fontWeight: 'bold',
    },
    budget: {
        fontSize: 18,
        color: '#50C7C7',
        fontWeight: 'bold',
    },
});

export default DonutChart;
