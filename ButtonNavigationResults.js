import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Results from "./mainscreens/financial-planner/stats/results";
import Filter from "./mainscreens/financial-planner/filter";
import Navigator from "./ButtonNavigationStats";


const Stack = createNativeStackNavigator()

export default function NavigatorResults() {
    return (
            <Stack.Navigator 
                initialRouteName="Results"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='Results' component={Results} />
                <Stack.Screen name='StackedStats' component={Navigator}  />
            </Stack.Navigator>
    )
}