import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity,SafeAreaView,PixelRatio} from 'react-native';
import React,{useState} from 'react';
import { View,Box,Flex,Center,Button,Text,Spacer,Modal, FormControl, Input, WarningOutlineIcon } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Donut from './stats/DonutChart';
import RenderStats from './stats/piechart';
import { useNavigation } from '@react-navigation/native';

//for donut graph(to fit with data later)
const data = [{
    percentage: 8,
    color: 'tomato',
    max: 10
}]

//dummy data
const dummy_data = [{
    label:'50%',
    count:12,
    category:'food',
    y:120.00
},
{
    label:'20%',
    count:13,
    category:'clothing',
    y:230.00
}]


//creating toggle option
const Tab= createMaterialTopTabNavigator()

//income page
const IncomeStats = () =>{

    return(<>
    <RenderStats 
        data={dummy_data}
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
        data={dummy_data}
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
    <Flex direction='column'style={{alignItems:'center',bottom:50}}>
    <Box style={styles.goal}>
        {data.map((p, i) => {
          return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/> 
        })}
    </Box>
    <Spacer h='50%'/>
    {/* text to indicate goal */}
    <Text style={{alignSelf:'center'}}>You are ${goal} away from your monthly goal!</Text>
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
    const navigation = useNavigation()
    const [inputValue,setInputValue] = useState('')
    return (
            <>
            <Flex>
            <Center style={styles.header} _text={{fontFamily:'PoppinsSemi',fontSize:20}}>Daily</Center>
            <TouchableOpacity style={styles.filterbutton} onPress={()=>{navigation.navigate('Filter')}}>
                <Text>Filter</Text>
            </TouchableOpacity>
            </Flex>
            <Tab.Navigator
                initialRouteName='GoalsStats'
                sceneContainerStyle={{ flex: 1 }}
                screenOptions={{
                tabBarActiveTintColor: '#fbd1a2',
                tabBarLabelStyle: { fontSize: 12, fontFamily: 'Poppins' },
                tabBarStyle: {
                    backgroundColor: '#1d4e89',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    width:350,
                    alignSelf:'center'
                },
                tabBarIndicatorStyle: {
                    height: 4,
                    backgroundColor: '#fbd1a2',
                },
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
        alignSelf:'center',
        top:25
    },
    goal:{
        alignItems:'center',
        top:250
    },
    filterbutton:{
        width:70,
        height:45,
        justifyContent:'center',
        borderRadius:10,
        alignItems:'center',
        alignSelf:'flex-end',
        backgroundColor:'#d2d2d2',
        bottom:10,
        right:10

    }

});
