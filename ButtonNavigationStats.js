import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stats from "./mainscreens/financial-planner/stats";


const Stack = createNativeStackNavigator()

export default function Navigation() {
    return (
            <Stack.Navigator 
                initialRouteName="Stats"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='Stats' component={Stats} />
                {/* <Stack.Screen name='Filter'  /> */}
            </Stack.Navigator>
    )
}