import React,{useState, useEffect} from "react";
import {Box,Form,FormControl,Text,Select,View,Flex, HStack,Spacer} from 'native-base';
import { SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase_auth } from '../../config/firebase.js';
import { db } from '../../config/firebase.js';
import { doc, collection, onSnapshot, query, limit, getDocs } from '@firebase/firestore';

const categories=[{
    id:2,
    name:'Food'
},
{
    id:3,
    name:'Clothing'
},
{
    id:4,
    name:'Fishes'
}]


const Filter = () =>{
    //fetching of data
    const user = firebase_auth.currentUser;
    const userEmail = user.email;
    const usersCollectionRef = collection(db, 'users');
    const userDocRef = doc(usersCollectionRef, userEmail);
    const userIncomesRef = collection(userDocRef, 'income');
    const userExpensesRef = collection(userDocRef, 'expenses');
    const [incomes, setIncomes] = useState(null);
    const [expenses, setExpenses] = useState(null);

    //date range
    const [date1,setDate1]=useState(new Date());
    const [date2,setDate2]=useState(new Date());

    //type
    const [selectedType, setSelectedType] = useState('');

    //category
    const [selectedCategory,setSelectedCategory]=useState('');

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

    const filterByDate = (date1, date2) => {
        const secondFilter = (date1, date2, data) => {
            const filtData = [];
            const convertToDateObject = (string) => {
                const dateParts = string.split('/');
                const day = dateParts[0];
                const month = dateParts[1];
                const year = dateParts[2];
                return new Date(year+'-'+month+'-'+day);
            };
    
            if (date1 && date2 && data) {
                for (let i = 0; i < data.length; i++) {
                    if (convertToDateObject(data[i].created_at) >= date1 && convertToDateObject(data[i].created_at) <= date2) {
                        filtData.push(data[i])
                    }
                }
            }
            return filtData;
        };
    
        if (selectedType == "Income") {
            const data = incomes;
            return secondFilter(date1, date2, data);
        } else {
            const data = expenses;
            return secondFilter(date1, date2, data);
        }
    };
    

    const getCategories = (data) => {
        const categoriesList = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (!(data[i].category in categoriesList)) {
                    categoriesList.push(data[i].category)
                }
            }
        }
        
        return categoriesList;
    };
    

    const navigation=useNavigation()

    //for submit button
    const handleFilterSubmit = () => {
        navigation.navigate('StackedResults', 
        // {
        //         range:{...selectedRange},
        //         type:selectedValue,
        //         catgeory:selectedCategory
        // }
        );
      };

    return (
        <SafeAreaView>
            <Flex direction="column">
            <Spacer h='25%'/>
            <HStack alignSelf='center'>
                <Text style={{fontFamily:'PoppinsSemi',fontSize:15, top:2}}>Initial Date:</Text>
                <DateTimePicker themeVariant='dark' value={date1} onChange={(event, date) => { setDate1(date); event = 'dismissed'; } } />
            </HStack>
            <Spacer h='7%'/>
            <HStack alignSelf='center'>
                <Text style={{fontFamily:'PoppinsSemi',fontSize:15, top:2}}>Final Date:</Text>
                <DateTimePicker themeVariant='dark' value={date2} onChange={(event, date) => { setDate2(date); event = 'dismissed'; } } />
            </HStack>
            <Spacer h='7%'/>
            <HStack style={{left:100}}>
                <Text style={{fontFamily:'PoppinsSemi',fontSize:15, top:2}}>Type:</Text>
                <Spacer w='2%'/>
                <FormControl isRequired>
                    <Select
                    selectedType={selectedType}
                    onValueChange={(value) => setSelectedType(value)}
                    placeholder="Any specific Type?"
                    width={175}
                    >
                    <Select.Item label="Income" value="Income" />
                    <Select.Item label="Expenses" value="Expenses" />
                    </Select>
                </FormControl>
            </HStack>
            <Spacer h='8%'/>
            <HStack style={{left:65}}>
                <Text style={{fontFamily:'PoppinsSemi',fontSize:15, top:2}}>Category:</Text>
                <Spacer w='2%'/>
                <FormControl isRequired>
                    <Select
                    selectedValue={selectedCategory}
                    onValueChange={(value) => setSelectedCategory(value)}
                    placeholder="Any Specific Category?"
                    width={175}
                    >
                    {getCategories(filterByDate(date1, date2)).map(category => (
                        <Select.Item
                        key={category}
                        label={category}
                        value={category}
                        />
                    ))}
                    </Select>
                </FormControl>
            </HStack>
            <Spacer h='15%'/>
            <TouchableOpacity style={styles.button} onPress={handleFilterSubmit}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
            </Flex>
        </SafeAreaView>
    )
}

export default Filter

const styles=StyleSheet.create({
    rangepicker:{
        width:375,
        height:375,
        alignSelf:'center'
    },
    selectedDateContainerStyle:{
        height: 35,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00b2ca",
        
    },
    selectedDateStyle: {
        fontWeight: "bold",
        color: "white",
    },
    button:{
        width:250,
        height:45,
        justifyContent:'center',
        borderRadius:100,
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'#e32f45',

    },
    submit:{
        fontFamily:'MontserratSemi',
        fontSize:18,
        color:'#fff'
    }
})