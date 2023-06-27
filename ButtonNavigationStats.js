import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Stats from "./mainscreens/financial-planner/stats";
import NavigatorFilter from "./ButtonNavigationFilter";


const Stack = createNativeStackNavigator()

export default function Navigator() {
    return (
            <Stack.Navigator 
                initialRouteName="BaseStats"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='BaseStats' component={Stats} />
                <Stack.Screen name='StackedFilter' component={NavigatorFilter}  />
            </Stack.Navigator>
    )
}