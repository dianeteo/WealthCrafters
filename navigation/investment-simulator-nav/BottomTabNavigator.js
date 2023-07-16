import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens/components here
import InvestmentSimulator from '../../mainscreens/InvestmentSimulator';
import Research from '../../mainscreens/investment-simulator/Research';
import Trade from '../../mainscreens/investment-simulator/Trade';
import News from '../../mainscreens/investment-simulator/News';

//Screen Names
const Portfolio='Portfolio'
const research_tab='Research'
const trade_tab='Trade'
const news_tab='News'
// const entryName='Entry'


const Tab = createBottomTabNavigator();

const InvestmentSimulator_Tabs = () => {

  return (
    
      <Tab.Navigator

        initialRouteName={InvestmentSimulator}
        screenOptions={
            ({route})=>({
            tabBarStyle:{
                
            },
            headerShown:false,
            tabBarIcon: ({focused,color,size})=>{
                let iconName;
                let rn=route.name;

                if (rn===Portfolio) {
                    iconName = focused ? 'wallet' : 'wallet-outline';
                } else if (rn===research_tab) {
                    iconName=focused ? 'analytics':'analytics-outline';
                } else if (rn==trade_tab) {
                    iconName=focused ? 'card':'card-outline';
                } else if (rn==news_tab) {
                    iconName=focused ? 'newspaper':'newspaper-outline';
                }

                return <Ionicons name={iconName} size={size} color={color}/>
            }
            
        })}
        >
        <Tab.Screen name={Portfolio} component={InvestmentSimulator} />
        <Tab.Screen name={research_tab} component={Research} />
        <Tab.Screen name={news_tab} component={News} />
        <Tab.Screen name={trade_tab} component={Trade} />
      </Tab.Navigator>
    
  );
};

export default InvestmentSimulator_Tabs;


