import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'

// Import your screens/components here
import Settings from './screens/financial-planner/settings';
import Stats from './screens/financial-planner/stats';
import FinancialPlanner from './screens/FinancialPlanner';

const getCurrentDate=()=>{
  
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return String(year) + '-' + String(month) + '-' + String(date);//format: d-m-y;
  }
//Screen Names
const Home=getCurrentDate()
const statsName='Stats'
const settingsName='Settings'


const Tab = createBottomTabNavigator();

const MyTabs = () => {

  return (
    
      <Tab.Navigator
        initialRouteName={Home}
        screenOptions={
            ({route})=>({
            headerShown:false,
            tabBarIcon: ({focused,color,size})=>{
                let iconName;
                let rn=route.name;

                if (rn===Home) {
                    iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (rn===statsName) {
                    iconName=focused ? 'pie-chart':'pie-chart-outline';
                } else if (rn===settingsName) {
                    iconName=focused ? 'settings' : 'settings-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>
            }
            
        })}
        >
        <Tab.Screen name={Home} component={FinancialPlanner} />
        <Tab.Screen name={statsName} component={Stats} />
        <Tab.Screen name={settingsName} component={Settings} />
      </Tab.Navigator>
    
  );
};

export default MyTabs;


