import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, TouchableOpacity} from 'react-native';

// Import your screens/components here
import Entry from './screens/financial-planner/entry';
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
const entryName='Entry'


const Tab = createBottomTabNavigator();

const MyTabs = () => {

  return (
    
      <Tab.Navigator

        initialRouteName={Home}
        screenOptions={
            ({route})=>({
            tabBarStyle:{
                
            },
            headerShown:false,
            tabBarIcon: ({focused,color,size})=>{
                let iconName;
                let rn=route.name;

                if (rn===Home) {
                    iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (rn===statsName) {
                    iconName=focused ? 'pie-chart':'pie-chart-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>
            }
            
        })}
        >
        <Tab.Screen name={Home} component={FinancialPlanner} />
        <Tab.Screen name={entryName} component={Entry} options={({navigation})=>(
            {tabBarShowLabel:false},
            {tabBarButton: (props)=>(
                <TouchableOpacity onPress={()=> navigation.navigate('Entry')} {...props}>
                    <Ionicons name='add-circle' size={50} color='#e32f45' style={{bottom:2}}/>
                </TouchableOpacity>
            )})} />
        <Tab.Screen name={statsName} component={Stats} />
      </Tab.Navigator>
    
  );
};

export default MyTabs;


