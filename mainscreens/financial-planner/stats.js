
import { StyleSheet, TouchableOpacity} from 'react-native';
import React,{useEffect, useState} from 'react';
import { View,Box,Flex,Center,Button,Text,Spacer,Modal, FormControl, Input, WarningOutlineIcon,HStack } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Donut from './stats/DonutChart';
import RenderStats from './stats/piechart';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import { firebase_auth } from '../../config/firebase';
import { collection,doc,getDoc,setDoc,updateDoc,getDocs } from '@firebase/firestore';
import {db} from '../../config/firebase.js';


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
const IncomeStats = ({income}) =>{
    return(<>
    <RenderStats 
        data={income}
        type='Income'
        />
    </>

    )
}
//expense page
const ExpensesStats = ({expense}) => {
    const data=expense
    return(<>
    <RenderStats
        type='Expenses'
        data={data}
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
const GoalsStats = ({balance}) => {
    const percentage=balance/goal*100
    const new_data=[{
        label: `${percentage}%`,
        color:'orange',
        max:goal
    }]
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
        {new_data.map((p, i) => {
          return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/> 
        })}
    </Box>
    <Spacer h='50%'/>
   {/* Conditional rendering of the goal text */}
   {hasGoal ? (
          <Text style={{ alignSelf: 'center' }}>You are ${goal-balance} away from your monthly goal!</Text>
        ) : (
          <Text style={{ alignSelf: 'center' }}>You do not have a monthly goal right now! Set it up now!</Text>
        )}
    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',top:50,borderRadius:20,backgroundColor:'#e32f45',width:175,height:40,alignSelf:'center'}}onPress={()=> setModalVisible(true)}>
        <Text style={{fontFamily:'Poppins',color:'#fff'}}>Change Target?</Text>
    </TouchableOpacity>
    {/* replace once backend connected */}
    {balance > goal && (
           <WarningMessage /> 
    )}
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
    const [filteredExpenseCategories, setFilteredExpenseCategories] = useState([]);
    const [filteredIncomeCategories,setFilteredIncomeCategories]=useState([]);
    const [balance,setBalance]=useState(0);

    //for backend
        //for user recognition
        const user = firebase_auth.currentUser;
        const userEmail = user.email;
    
        //references
        const usersCollectionRef=collection(db,'users');
        const userDocRef=doc(usersCollectionRef,userEmail)
        const userIncomesRef = collection(userDocRef, 'income');
        const userExpensesRef=collection(userDocRef,'expenses')
        //income
        const [incomes, setIncomes] = useState([]);
        //expenses
        const [expenses, setExpenses] = useState([]);
        const fetchIncomeData = async () => {
        try {
            const querySnapshot = await getDocs(userIncomesRef);
            const incomeData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setIncomes(incomeData);
        } catch (error) {
            console.error('Error fetching income data:', error);
        }
        };

        const fetchExpenseData = async () => {
            try {
                const querySnapshot = await getDocs(userExpensesRef);
                const expenseData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setExpenses(expenseData);
            } catch (error) {
                console.error('Error fetching expense data:', error);
            }
        }

        const filterDataByMonth= (data) => {
            const convertMonth=(str)=>{
                const parts=str.split('/')
                console.log(parseInt(parts[1]))
                return parseInt(parts[1])
            }
            const currentMonth=new Date().getMonth() +1;
            const filteredData=[];
            if (data){
                for (let i=0; i<data.length;i++){
                    if (convertMonth(data[i].created_at)===currentMonth) {
                        console.log(data[i])
                        filteredData.push(data[i])
                    }
                }
            }
            return filteredData
        }

        const filterDatabyCategories = (monthData) =>{
            const newData = monthData.reduce((result, data) => {
                const existingData = result.find(item => item.category === data.category);
              
                if (existingData) {
                  existingData.total += data.amount;
                } else {
                  result.push({ category: data.category, total: data.amount });
                }
              
                return result;
              }, []);
            const totalAmount=newData.reduce((sum,data)=> sum+data.total,0)
    
            let finalData=newData.map((item)=>{
                let percentage=(item.total/totalAmount*100).toFixed(1)
                return {
                    label:`${percentage}%`,
                    total:Number(item.total),
                    category:item.category
    
                }
            })
            return finalData
        }
        const findingTotal = (data) =>{
            return data.reduce((a,b)=> a+(b.total || 0),0)
        }
        useEffect(() => {
            const fetchAndFilterData = () => {
              fetchExpenseData();
              fetchIncomeData();
              // Filter the data by month
              const filteredExpenseData = filterDataByMonth(expenses);
              const filteredIncomeData = filterDataByMonth(incomes);

              // Filter the data by categories
              const ExpenseCategories = filterDatabyCategories(filteredExpenseData);
              const IncomeCategories = filterDatabyCategories(filteredIncomeData);
              setFilteredExpenseCategories(ExpenseCategories);
              setFilteredIncomeCategories(IncomeCategories);
              setBalance(findingTotal(filteredIncomeData)-findingTotal(filteredExpenseData))
            
            };
        
            fetchAndFilterData();
          }, []);


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
                    name="IncomeStats"
                    options={{
                        tabBarLabel: 'Income',
                    }}
                    >
                    {() => <IncomeStats income={filteredIncomeCategories} />}
                    </Tab.Screen>
                    <Tab.Screen
                    name="GoalsStats"
                    options={{
                        tabBarLabel: 'Goal',
                    }}
                    >
                    {() => <GoalsStats balance={balance} />}
                    </Tab.Screen>
                    <Tab.Screen
                    name="ExpensesStats"
                    options={{
                        tabBarLabel: 'Expenses',
                    }}
                    >
                    {() => <ExpensesStats expense={filteredExpenseCategories} />}
                    </Tab.Screen>
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
