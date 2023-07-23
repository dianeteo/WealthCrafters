import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewEntry from "../../mainscreens/financial-planner/entry";

import MyTabs from "./BottomTabNavigator";

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