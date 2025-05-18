import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {useColorScheme} from '@/hooks/useColorScheme';
import {IconSymbol} from "@/components/IconSymbol";
import {Entypo} from "@expo/vector-icons";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Главная',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="transactions"
                options={{
                    title: 'Расходы',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="list-alt.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="budget"
                options={{
                    title: 'Бюджет',
                    tabBarIcon: ({color}) => <Entypo name="briefcase" size={24} color={color}/>,
                }}
            />
        </Tabs>
    );
}

