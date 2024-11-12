import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Details from "./screens/Details";

const Stack = createNativeStackNavigator();

console.log('Routes been called')

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                name="Home"
                component={Home}
                options={{ title: 'Home' }}
                />
                <Stack.Screen
                name="Details"
                component={Details}
                options={{ title: 'Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>        

    )
}
