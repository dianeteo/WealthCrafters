import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stats from "./mainscreens/financial-planner/stats";
import Filter from "./mainscreens/financial-planner/filter";


const Stack = createNativeStackNavigator()

export default function Navigator() {
    return (
            <Stack.Navigator 
                initialRouteName="Stats"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='Stats' component={Stats} />
                <Stack.Screen name='Filter' component={Filter}  />
            </Stack.Navigator>
    )
}