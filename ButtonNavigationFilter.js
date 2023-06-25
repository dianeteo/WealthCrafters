import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorResults from "./ButtonNavigationResults";
import Filter from "./mainscreens/financial-planner/filter";


const Stack = createNativeStackNavigator()

export default function NavigatorFilter() {
    return (
            <Stack.Navigator 
                initialRouteName="Filter"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='Filter' component={Filter} />
                <Stack.Screen name='stackedResults' component={NavigatorResults}  />
            </Stack.Navigator>
    )
}