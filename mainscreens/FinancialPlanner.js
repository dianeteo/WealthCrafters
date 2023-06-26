import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity,SafeAreaView, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import {Calendar} from 'react-native-calendars';
import {NativeBaseProvider,Modal,Flex,Text, View,Box, FlatList, HStack, VStack, Spacer, ScrollView} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SwipeView from './financial-planner/SwipeView';
import { firebase_auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { doc, collection, onSnapshot, query, limit, getDocs } from '@firebase/firestore';

// const expense_data = [{
//   id: 3,
//   description: 'ramen',
//   category:'food',
//   amount: 10.00,
//   created_at: new Date(),
//   created_by: 3,
// },{
//   id:5,
//   description:'hor fun',
//   category:'food',
//   amount:5.00,
//   created_at:new Date(),
//   created_by:3,
// }]
// const income_data = [{
//   id: 3,
//   description: 'barista job',
//   category:'salary',
//   amount: 1000.00,
//   //created_at: new Date(),
//   created_by: 3,
// },]


const FinancialPlanner = () =>{
  const navigation = useNavigation();
  const [modalVisible,setModalVisible]=useState(false);

  const user = firebase_auth.currentUser;
  const userEmail = user.email;

  //set of constants for income
  const [incomes, setIncomes] = useState([]);
  const usersCollectionRef = collection(db, 'users');
  const userDocRef = doc(usersCollectionRef, userEmail);
  const userIncomesRef = collection(userDocRef, 'income');

  //set of constants for expenses
  const [expenses, setExpenses] = useState([]);
  const userExpensesRef = collection(userDocRef, 'expenses');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const querySnapshot = await getDocs(query(userIncomesRef, limit(20)));
        const incomeData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setIncomes(incomeData);
      } catch (error) {
        console.error('Error fetching income data:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    const fetchExpenseData = async () => {
      try {
        const querySnapshot = await getDocs(query(userExpensesRef, limit(20)));
        const expenseData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setExpenses(expenseData);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchIncomeData();
    fetchExpenseData();
  }, []);

  const expense_data = expenses;
  const income_data = incomes;
  
  return(
    <SafeAreaView style={styles.container}>
    <Box style={{
      margin:15,
      borderRadius:10
    }}>
      <Calendar
        current={new Date().toDateString()}
        hideExtraDays={true}
        //do you wanna show the extra days
        theme={{'stylesheet.calendar.header': {
          week: {
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems:'center'
            }, 
          }
        }}
        
        //to be edited later, to just show the entry screen for now without animation
        style={[styles.calendar, {height: 200}]}
        dayComponent={({date}) => {

          const income_amt = () => {
              let sumIncome = 0;
              for (let i = 0; i < incomes.length; i++) {
                  if (incomes[i].created_at == date.day + '/' + date.month + '/' + date.year)
                  {
                      sumIncome += incomes[i].amount
                  }
                  else {
                      sumIncome += 0
                  };
              };
              return sumIncome;
          };

          const expense_amt = () => {
              let sumExpense = 0;
              for (let i = 0; i < expenses.length; i++) {
                  if (expenses[i].created_at == date.day + '/' + date.month + '/' + date.year)
                  {
                      sumExpense += expenses[i].amount
                  }
                  else {
                      sumExpense += 0
                  };
              };
              return sumExpense;
          };

          return (
            <><TouchableOpacity onPress={()=>{setModalVisible(true)}}>
              {//need to store date somewhere so that modal will have currentdate
              }
              <Box style={[styles.main]}>
                <Text style={{ marginVertical: 7.5, color: '#171717', fontFamily:'LatoBold'}}>{date.day}</Text>
                <Text style={{ fontSize: 10, color: 'red', left: 10, fontFamily:'Lato'}}>{income_amt()}</Text>
                <Text style={{ fontSize: 10, color: 'blue', top: 2, left: 10, fontFamily:'Lato'}}>{expense_amt()}</Text>
                <Text style={{ fontSize: 10, color: 'green', top: 4, left: 10, fontFamily:'Lato' }}>{income_amt()-expense_amt()}</Text>
              </Box>
            </TouchableOpacity></>
                
                 );
                }}
      />
      {/* button to navigate to entry page */}
      <TouchableOpacity onPress={()=> navigation.navigate('NewEntry')} >
        <Ionicons name='add-circle' size={55} color='#e32f45' style={{ bottom:90, alignSelf:'flex-end',right:35, zIndex:999}}/>
      </TouchableOpacity>
      <Modal isOpen={modalVisible} onClose={()=>{setModalVisible(false)}} style={styles.modal} size='xl' >
        <Modal.Content h='600'>
          <Modal.Header alignSelf='center'>Total:</Modal.Header>
          <Modal.CloseButton />
          <Flex justifyContent='space-evenly' direction='row'>
              {/* income side */}
              <Flex direction='column'>
                <Spacer h='4%'/>
                <Box justifyContent='center'>
                  <Text style={{fontFamily:'Poppins',color:'blue',fontSize:18,alignSelf:'center'}}>Income (+)</Text>
                </Box>
                <Spacer h="3%" />
                {loading ? (
                  <ActivityIndicator size="large" /> // Show a loading indicator while data is being fetched
                ) : (
                  <Box style={{ width: 170, minHeight: 400 }}>
                    <SwipeView
                      data={income_data}
                      style={{
                        minHeight: 400,
                        width: 200,
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                      }}
                    />
                  </Box>
                )}
              </Flex>
              {/* expenses side */}
              <Flex direction='column'>
              <Spacer h='4%'/>
                <Box alignItems='center' justifyContent='center'>
                  <Text style={{fontFamily:'Poppins',color:'red',fontSize:18}}>Expenses (-)</Text>
                </Box>
                <Spacer h="3%" />
                {loading ? (
                  <ActivityIndicator size="large" /> // Show a loading indicator while data is being fetched
                ) : (
                  <Box style={{ width: 170, minHeight: 400 }}>
                    <SwipeView
                      data={expense_data}
                      style={{
                        minHeight: 400,
                        width: 200,
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                      }}
                    />
                  </Box>
                )}
              </Flex>
          </Flex>
          </Modal.Content>
      </Modal>
      </Box>
      </SafeAreaView>
  )
}

export default FinancialPlanner;

const styles = StyleSheet.create({
  //for calendar
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    justifyContent:'center',
    height:89
  },

  calendar:{
    flex:1,
    width:405,
    padding:10,
    borderRadius:10
  },
});