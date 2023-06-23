import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity,SafeAreaView,PixelRatio} from 'react-native';
import React, {useEffect, useState} from 'react';
import { View,Box,Flex,Center,Button,Text,Spacer,Modal, FormControl, Input, WarningOutlineIcon } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {VictoryPie} from 'victory-native';
import Donut from './stats/DonutChart';
import RenderStats from './stats/piechart';

//for donut graph(to fit with data later)
const data = [{
    percentage: 8,
    color: 'tomato',
    max: 10
}]

//dummy data

const expense_data = [{
    description: 'ramen',
    category:'food',
    amount: 10.00,
    created_at: new Date(),
  },{
    description:'hor fun',
    category:'food',
    amount:5.00,
    created_at:new Date(),
  }]

//creating toggle option
const Tab= createMaterialTopTabNavigator()

//income page
const IncomeStats = () =>{

    return(<>
    <RenderStats 
        type='Income'

        />
    </>

    )
}
//expense page
const ExpensesStats = () => {
    return(<>
    <RenderStats
        type='Expenses'
        />
    </>

    )
}


//Goal Page
const GoalsStats = () => {
    // for modal appearing
    const [modalVisible,setModalVisible]=useState(false)
    // for goal setting
    const [goalText,setGoalText]=useState('')
    const [inputError, setInputError] = useState('');
    const [goal,setGoal]=useState(0)
    return (<>
    <Flex direction='column'>
    <Box style={styles.goal}>
        {data.map((p, i) => {
          return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/> 
        })}
    </Box>
    <Spacer h='50%'/>
    {/* text to indicate goal */}
    <Text style={{alignSelf:'center'}}>You are $200 away from your monthly goal!</Text>
    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',top:50,borderRadius:20,backgroundColor:'#e32f45',width:175,height:40,alignSelf:'center'}}onPress={()=> setModalVisible(true)}>
        <Text style={{fontFamily:'Poppins',color:'#fff'}}>Change Target?</Text>
    </TouchableOpacity>
    </Flex>
    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
            <Modal.CloseButton onPress={()=>{setGoalText('');setModalVisible(false)}} />
            <Modal.Body>
            <FormControl isInvalid={inputError !== ''}>
                <FormControl.Label>New Target:</FormControl.Label>
                <Input
                value={goalText}
                onChangeText={(text) => {
                    if (/^\d*\.?\d*$/.test(text)) {
                    setGoalText(text);
                    setInputError('');
                    } else {
                    setGoalText(text);
                    setInputError('Input must be a number.');
                    }
                }}
                />
                {inputError !== '' && (
                <FormControl.ErrorMessage>
                    {inputError}
                </FormControl.ErrorMessage>
                )}
            </FormControl>
            </Modal.Body>
            <Modal.Footer>
            <Button.Group space={2}>
                <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                    setModalVisible(false);
                    setGoalText('');
                    setInputError('');
                }}
                >
                Cancel
                </Button>
                <Button
                onPress={() => {
                    if (inputError === '') {
                    setModalVisible(false);
                    setGoal(parseFloat(goalText).toFixed(2))
                    setGoalText('')
                    }
                }}
                >
                Confirm
                </Button>
            </Button.Group>
            </Modal.Footer>
        </Modal.Content>
    </Modal>

    </>
    );
  };

const Stats = () => {
    const [inputValue,setInputValue] = useState('')
    return (<>
            <Center style={styles.header}>Daily</Center>
            <Tab.Navigator
                initialRouteName='GoalsStats'
                sceneContainerStyle={{
                    position:'relative',
                    top:100,
                }}
                initialLayout={{
                    height:300
                }}

                screenOptions={{
                    // animationEnabled:false,
                    tabBarActiveTintColor: '#fbd1a2',
                    tabBarLabelStyle: { fontSize: 12, fontFamily:'Poppins' },
                    tabBarStyle: { 
                        position:'relative',
                        backgroundColor: '#1d4e89',
                        borderRadius:20,
                        width:350,
                        alignSelf:'center',
                        top:50
                        },
                    tabBarIndicator: () =>{
                        null
                    }
                    
                  }}>
                <Tab.Screen 
                    name='IncomeStats'
                    component={IncomeStats}
                    options={{
                        tabBarLabel:'Income',
                        lazy:true

                    }}/>
                <Tab.Screen 
                    name='GoalsStats'
                    component={GoalsStats}
                    
                    options={{
                        tabBarLabel:'Goal',
                        lazy:true
                        

                    }}/>
                <Tab.Screen
                    name='ExpensesStats'
                    component={ExpensesStats}
                    options={{
                        tabBarLabel:'Expenses',
                        lazy:true
                    }} />
            </Tab.Navigator>
    </>
    )
};
export default Stats;

const styles = StyleSheet.create({
    container: {

    },
    header:{

    },
    goal:{
        alignItems:'center',
        top:250
    }

});
