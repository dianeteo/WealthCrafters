import { StyleSheet, TouchableOpacity,SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Modal, Flex, Text, View, Box, HStack, VStack, Spacer, Spinner } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SwipeView from './financial-planner/SwipeView';
import { firebase_auth } from '../config/firebase.js';
import { db } from '../config/firebase.js';
import { doc, collection, onSnapshot, query, limit, getDocs } from '@firebase/firestore';

const dummy = [{
  id: 3,
  description: 'ramen',
  category:'food',
  amount: 10.00,
  created_at: new Date(),
  created_by: 3,
},{
  id:5,
  description:'hor fun',
  category:'food',
  amount:5.00,
  created_at:new Date(),
  created_by:3,
}]
const FinancialPlanner = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredIncomeData, setFilteredIncomeData] = useState([]);
  const [filteredExpenseData, setFilteredExpenseData] = useState([]);
  const [loading, setLoading] = useState(true); // New state variable

  const user = firebase_auth.currentUser;
  const userEmail = user.email;

  // set of constants for income
  const [incomes, setIncomes] = useState([]);
  const usersCollectionRef = collection(db, 'users');
  const userDocRef = doc(usersCollectionRef, userEmail);
  const userIncomesRef = collection(userDocRef, 'income');

  // set of constants for expenses
  const [expenses, setExpenses] = useState([]);
  const userExpensesRef = collection(userDocRef, 'expenses');

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const querySnapshot = await getDocs(query(userIncomesRef, limit(20)));
        const incomeData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setIncomes(incomeData);
      } catch (error) {
        console.error('Error fetching income data:', error);
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


  const filterData = (selectedDate, data) => {
    const filteredData = [];
    if (selectedDate && data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].created_at === selectedDate) {
          console.log(data[i]);
          filteredData.push(data[i]);
        }
      }
    }
    return filteredData;
  };

  const handleDateSelection = (date) => {
    const convertDateString = (string) => {

      const [year, month, day] = string.split("-"); // Split the string into year, month, and day
    
      const formattedMonth = parseInt(month, 10).toString(); // Remove leading zero from the month
    
      return `${day}/${formattedMonth}/${year}`;
    }
    setSelectedDate(convertDateString(date.dateString));
    setModalVisible(true)
  };

  useEffect(() => {
    if (selectedDate) {
      setFilteredIncomeData(filterData(selectedDate, incomes));
      setFilteredExpenseData(filterData(selectedDate, expenses));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (modalVisible) {
      setLoading(false);
    }
    else {
      setLoading(true)
    }
  }, [modalVisible]);



  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ margin: 15, borderRadius: 10 }}>
        <Calendar
          current={new Date().toDateString()}
          hideExtraDays={true}
          theme={{
            'stylesheet.calendar.header': {
              week: {
                marginTop: 4,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
              },
            }
          }}
          style={[styles.calendar, { height: 200 }]}
          dayComponent={({ date }) => {
            const income_amt = () => {
              let sumIncome = 0;
              for (let i = 0; i < incomes.length; i++) {
                if (incomes[i].created_at == date.day + '/' + date.month + '/' + date.year) {
                  sumIncome += incomes[i].amount;
                } else {
                  sumIncome += 0;
                }
              }
              return parseFloat(sumIncome).toFixed(2);
            };

            const expense_amt = () => {
              let sumExpense = 0;
              for (let i = 0; i < expenses.length; i++) {
                if (expenses[i].created_at == date.day + '/' + date.month + '/' + date.year) {
                  sumExpense += expenses[i].amount;
                } else {
                  sumExpense += 0;
                }
              }
              return parseFloat(sumExpense).toFixed(2);
            };

            return (
              <>
                <TouchableOpacity onPress={() => handleDateSelection(date)}>
                  <Box style={[styles.main]}>
                    <Text style={{ marginVertical: 7.5, color: '#171717', fontFamily: 'LatoBold' }}>{date.day}</Text>
                    <Text style={{ fontSize: 10, color: 'red', left: 10, fontFamily: 'Lato' }}>{income_amt()}</Text>
                    <Text style={{ fontSize: 10, color: 'blue', top: 2, left: 10, fontFamily: 'Lato' }}>{expense_amt()}</Text>
                    <Text style={{ fontSize: 10, color: 'green', top: 4, left: 10, fontFamily: 'Lato' }}>{parseFloat(income_amt() - expense_amt()).toFixed(2)}</Text>
                  </Box>
                </TouchableOpacity>
              </>
            );
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('NewEntry')}>
          <Ionicons name='add-circle' size={55} color='#e32f45' style={{ bottom: 90, alignSelf: 'flex-end', right: 35, zIndex: 999 }} />
        </TouchableOpacity>
        <Modal isOpen={modalVisible} onClose={() => { setModalVisible(false) }} style={styles.modal} size='xl'>
          <Modal.Content h='600'>
            <Modal.Header alignSelf='center'>Total:</Modal.Header>
            <Modal.CloseButton />
            <Flex justifyContent='space-evenly' direction='row'>
              <Flex direction='column'>
                <Spacer h='4%' />
                <Box justifyContent='center'>
                  <Text style={{ fontFamily: 'Poppins', color: 'blue', fontSize: 18, alignSelf: 'center' }}>Income (+)</Text>
                </Box>
                <Spacer h="3%" />
                <Box style={{ width: 170, minHeight: 400 }}>
                  {loading ? (
                    <Spinner size='lg' style={{top:100}}/> // Show the loading screen while SwipeView is rendering
                  ) : (
                      <SwipeView
                        data={filteredIncomeData}
                        style={{
                          minHeight: 400,
                          width: 200,
                          borderTopWidth: 0.5,
                          borderBottomWidth: 0.5,
                        }}
                      />
                    )}
                </Box>
              </Flex>
              <Flex flexDirection='column'>
                <Spacer h='4%' />
                <Box alignItems='center' justifyContent='center'>
                  <Text style={{ fontFamily: 'Poppins', color: 'red', fontSize: 18 }}>Expenses (-)</Text>
                </Box>
                <Spacer h="3%" />
                <Box style={{ width: 170, minHeight: 400 }}>
                  {loading ? (
                    <Spinner size='lg' style={{top:100}}/> // Show the loading screen while SwipeView is rendering
                  ) : (
                      <SwipeView
                        data={filteredExpenseData}
                        style={{
                          minHeight: 400,
                          width: 200,
                          borderTopWidth: 0.5,
                          borderBottomWidth: 0.5,
                        }}
                      />
                    )}
                </Box>
              </Flex>
            </Flex>
          </Modal.Content>
        </Modal>
      </Box>
    </SafeAreaView>
  );
}

export default FinancialPlanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    height: 89
  },

  calendar: {
    flex: 1,
    width: 405,
    padding: 10,
    borderRadius: 10
  },
});