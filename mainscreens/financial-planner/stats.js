
import { StyleSheet, TouchableOpacity} from 'react-native';
import React,{useEffect, useState} from 'react';
import { View,Box,Flex,Center,Button,Text,Spacer,Modal, FormControl, Input, WarningOutlineIcon,HStack } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Donut from './stats/DonutChart';
import RenderStats from './stats/piechart';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import { firebase_auth } from '../../config/firebase';
import { collection,doc,getDoc,setDoc,updateDoc } from '@firebase/firestore';
import {db} from '../../config/firebase.js';

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
},
{
    label:'10%',
    count:14,
    category:'education',
    y:1000.00
}


]


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

const WarningMessage = (showComponent,diff) =>{
    if (showComponent) {
        return (
            <HStack alignSelf='center'>
            <WarningOutlineIcon />
            <Text style={{fontFamily:'Poppins'}}>You have exceeded your savings today by ${diff}!</Text>
        </HStack>
        );
    }
    return null 

};

//Goal Page
const GoalsStats = () => {
    // for modal appearing
    const [modalVisible,setModalVisible]=useState(false)
    // for goal setting
    const [goalText,setGoalText]=useState('')
    const [inputError, setInputError] = useState('');
    const [goal,setGoal]=useState(0);
    const [hasGoal, setHasGoal] = useState(false);

    //for user recognition
    const user = firebase_auth.currentUser;
    const userEmail = user.email;

    //references
    const usersCollectionRef=collection(db,'users');
    const userDocRef=doc(usersCollectionRef,userEmail)
    
    //to submit goal
    const submitGoal = async () => {
        try {
          const userDocSnapshot = await getDoc(userDocRef);
          
          if (userDocSnapshot.exists()) {
            // User's document exists
            const userData = userDocSnapshot.data();
            if (userData.hasOwnProperty('goal')) {
              // 'goal' field exists in the document, update it
              await updateDoc(userDocRef, { goal: goal });
            } else {
              // 'goal' field does not exist, create it
              await setDoc(userDocRef, { goal: goal }, { merge: true });
            }
          }
        } catch (error) {
          // Handle the error
          console.error('Error submitting goal:', error);
        }
      };
    
    
    
    
    
    //to retrieve goal
      const retrieveGoal = async () => {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // User's document exists
            const userData = userDocSnapshot.data();
          
            if (userData.hasOwnProperty('goal')) {
              // 'goal' field exists in the document
              setGoal(userData.goal);
              setHasGoal(true)
            }
        
        }
      }         
      
      //upon rendering page
      useEffect(()=>{
        //to recognise user
        retrieveGoal()
      },[]);
      
    return (<>
    <Flex direction='column'style={{alignItems:'center',bottom:50}}>
    <Box style={styles.goal}>
        {data.map((p, i) => {
          return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/> 
        })}
    </Box>
    <Spacer h='50%'/>
   {/* Conditional rendering of the goal text */}
   {hasGoal ? (
          <Text style={{ alignSelf: 'center' }}>You are ${goal} away from your monthly goal!</Text>
        ) : (
          <Text style={{ alignSelf: 'center' }}>You do not have a monthly goal right now! Set it up now!</Text>
        )}
    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',top:50,borderRadius:20,backgroundColor:'#e32f45',width:175,height:40,alignSelf:'center'}}onPress={()=> setModalVisible(true)}>
        <Text style={{fontFamily:'Poppins',color:'#fff'}}>Change Target?</Text>
    </TouchableOpacity>
    {/* replace once backend connected */}
    {/* {expenses > savingsGoal && (
           <WarningMessage /> 
    )} */}
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
                    submitGoal()
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
            <Center style={styles.header} _text={{fontFamily:'PoppinsSemi',fontSize:20}}>Stats</Center>
            <TouchableOpacity style={styles.filterbutton} onPress={()=>{navigation.navigate('StackedFilter')}}>
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

                    }}/>
                <Tab.Screen 
                    name='GoalsStats'
                    component={GoalsStats}
                    
                    options={{
                        tabBarLabel:'Goal',
                        

                    }}/>
                <Tab.Screen
                    name='ExpensesStats'
                    component={ExpensesStats}
                    options={{
                        tabBarLabel:'Expenses'
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
