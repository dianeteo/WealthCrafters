import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorResults from "./ButtonNavigationResults";
import Filter from "./mainscreens/financial-planner/filter";


const Stack = createNativeStackNavigator()

export default function NavigatorFilter({route: {params}}) {
    return (
            <Stack.Navigator 
                initialRouteName="Filter"
                screenOptions={{
                    headerShown:false
                }}> 
                <Stack.Screen name='Filter' component={Filter} initialParams={params} />
                <Stack.Screen name='StackedResults' component={NavigatorResults}  />
            </Stack.Navigator>
    )
}