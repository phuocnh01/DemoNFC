import React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Read from "../screen/Read";
import Write from "../screen/Write";
import Info from "../screen/Info";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    const [data, setData] = React.useState<any>({})


    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name='Read' component={Read} />
                <Tab.Screen name='Write' component={Write} />
                <Tab.Screen name='Info' component={Info} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}