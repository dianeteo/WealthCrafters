import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewEntry from "./screens/financial-planner/entry";

import MyTabs from "./NavigationContainer";

const Stack = createNativeStackNavigator()

export default function Navigation() {
    return (
            <Stack.Navigator 
                initialRouteName="Calendar"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='Calendar' component={MyTabs} />
                <Stack.Screen name='NewEntry' component={NewEntry} />
            </Stack.Navigator>
    )
}