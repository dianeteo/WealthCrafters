import { StatusBar } from 'expo-status-bar';
import { Animated,StyleSheet,TouchableOpacity,View} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalculatorInput,CalculatorInputProps } from 'react-native-calculator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativebaseProvider, Modal,FormControl,Button,Input,Box,Center,Text,Flex,Spacer,Select} from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { firebase_auth } from '../../config/firebase.js';
import { db } from '../../config/firebase.js';
import { doc, collection, addDoc } from '@firebase/firestore';

const Tab = createMaterialTopTabNavigator();

const EntryIncome = () => {

    // for modal appearing
    const [modalVisible, setModalVisible]=useState(false)
    // for calendar date
    const[date1,setDate]=useState(new Date())
    //for Category List
    const [selectedCategory1, setSelectedCategory] = useState('');
    const [categories1, setCategories] = useState([
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
        { label: 'Category 3', value: 'category3' },
    ]);
    //for adding Category
    const [newCategory1, setNewCategory] = useState('');

    //for Amount Keying
    const [numValue1, setNumValue] = useState(0);
    //for changing note
    const [text1,setText]=useState('')

    const handleCategoryAdd = () => {
        setCategories([...categories1,{label:newCategory1,value:newCategory1}]);
        setNewCategory('');
        }

    const user = firebase_auth.currentUser;
    
    const userEmail = user.email

    const submitIncome = async () => {
        const userCollectionRef = doc(db, 'users', userEmail);
        const incomeCollectionRef = collection(userCollectionRef, 'income');
        try {
            await addDoc(incomeCollectionRef, {
                    amount: numValue1,
                    category: selectedCategory1,
                    created_at: date1,
                    description: text1
                });
                alert('Successfully submitted!');
            } catch (error) {
                console.log(error);
                alert('Submission failed: ' + error.message);
            } finally {
                setLoading(false);
            }
            };

    return (
        <Box alignSelf="center">
            <Flex direction='column'><Flex flexDirection='row'>
            <Text style={styles.titledate}>DATE:</Text>
            <DateTimePicker themeVariant='dark' style={styles.picker} value={date1} onChange={(event, date) => { setDate(date); event = 'dismissed'; } } />
            </Flex>
            <Spacer h='7%' /><Flex flexDirection='row'>
                <Text style={styles.titlecategory}>CATEGORY:</Text>
                <Box style={styles.select}>
                    <Select selectedValue={selectedCategory1}
                        minWidth="212"
                        accessibilityLabel="Choose a category"
                        placeholder="Choose a category"
                        placeholderTextColor='black'
                        // backgroundColor='#78b0a3'
                        color='white'
                        borderRadius={5}
                        margin={0}
                        padding={0}
                        onValueChange={itemValue => setSelectedCategory(itemValue)}
                    >
                        <Select.Item label='Income' value='income'></Select.Item>
                        <Select.Item label='Shopping' value='shopping'></Select.Item>
                        <Select.Item label='Haircut' value='haircut'></Select.Item>
                        <Select.Item label='Transport' value='transport'></Select.Item>
                    </Select>
                </Box>
                <TouchableOpacity style={styles.add} onPress={() => { setModalVisible(true); } }>
                    <Ionicons name='add-outline' size={40} color='white' />
                </TouchableOpacity>
                <Modal
                    isOpen={modalVisible}
                    onClose={() => setModalVisible(false)}>
                    <Modal.Content maxWidth='400px'>
                        <Modal.CloseButton />
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Category</FormControl.Label>
                                <Input value={newCategory1} onChange={(text) => { setNewCategory(text); } } />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => { setModalVisible(false); setNewCategory(''); } }>
                                    Cancel
                                </Button>
                                <Button onPress={() => { setModalVisible(false); } }>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Flex><Spacer height='7%' /><Flex flexDirection='row'>
                <Text style={styles.titleamt}>AMOUNT:</Text>
                <CalculatorInput
                    fieldContainerStyle={styles.calculator}
                    fieldTextStyle={{ alignSelf: 'center' }}
                    displayTextAlign='right'
                    height={400}
                    displayHeight={60}
                    numericButtonColor='black'
                    calcButtonBackgroundColor='#ff6531'
                    acceptButtonBackgroundColor='#ff6531'
                    borderColor='#d3d3d3'
                    fontSize={25}
                    roundTo={2}
                    onBeforeChange={setNumValue}
                    value={numValue1.toFixed(2)} />
            </Flex><Spacer height='7%' /><Flex flexDirection='row' justifyContent='unset'>
                <Text style={styles.titlenote} marginRight={5}>NOTE:</Text>
                <Input style={{borderRadius: 5,
                    //  backgroundColor: '#78b0a3', 
                     borderWidth: 0 }} position='unset' left='62' bottom='1' w='60%' maxW='300' value={text1} onChangeText={setText} blurOnSubmit={true} placeholder='Add a short note!' placeholderTextColor='black' variant='outline' />
            </Flex><Spacer h='30%' /><TouchableOpacity style={styles.button} onPress={submitIncome}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
            </Flex>
        </Box>
    )
}

const EntryExpenses = () => {

    // for modal appearing
    const [modalVisible, setModalVisible]=useState(false)
    // for calendar date
    const[date2,setDate]=useState(new Date())
    //for Category List
    const [selectedCategory2, setSelectedCategory] = useState('');
    const [categories2, setCategories] = useState([
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
        { label: 'Category 3', value: 'category3' },
    ]);
    //for adding Category
    const [newCategory2, setNewCategory] = useState('');

    //for Amount Keying
    const [numValue2, setNumValue] = useState(0);
    //for changing note
    const [text2,setText]=useState('')


    const handleCategoryAdd = () => {
        setCategories([...categories2,{label:newCategory2,value:newCategory2}]);
        setNewCategory('');
        }

    const user = firebase_auth.currentUser;
    
    const userEmail = user.email;

    const submitExpenses = async () => {
        const userCollectionRef = doc(db, 'users', userEmail);
        const expensesCollectionRef = collection(userCollectionRef, 'expenses');
        try {
            await addDoc(expensesCollectionRef, {
                    amount: numValue2,
                    category: selectedCategory2,
                    created_at: date2,
                    description: text2
                });
                alert('Successfully submitted!');
            } catch (error) {
                console.log(error);
                alert('Submission failed: ' + error.message);
            } finally {
                setLoading(false);
            }
            };

    return (
        <Box alignSelf="center">
            <Flex direction='column' style={{top:25}}>
            <Flex flexDirection='row'>
            <Text style={styles.titledate}>DATE:</Text>
            <DateTimePicker themeVariant='dark' style={styles.picker} value={date2} onChange={(event, date) => { setDate(date); event = 'dismissed'; } } />
        </Flex><Spacer h='7%' /><Flex flexDirection='row'>
                <Text style={styles.titlecategory}>CATEGORY:</Text>
                <Box style={styles.select}>
                    <Select selectedValue={selectedCategory2}
                        minWidth="212"
                        accessibilityLabel="Choose a category"
                        placeholder="Choose a category"
                        placeholderTextColor='black'
                        // backgroundColor='#78b0a3'
                        color='white'
                        borderRadius={5}
                        margin={0}
                        padding={0}
                        onValueChange={itemValue => setSelectedCategory(itemValue)}
                    >
                        <Select.Item label='Food' value='food'></Select.Item>
                        <Select.Item label='Shopping' value='shopping'></Select.Item>
                        <Select.Item label='Haircut' value='haircut'></Select.Item>
                        <Select.Item label='Transport' value='transport'></Select.Item>
                    </Select>
                </Box>
                <TouchableOpacity style={styles.add} onPress={() => { setModalVisible(true); } }>
                    <Ionicons name='add-outline' size={40} color='white' />
                </TouchableOpacity>
                <Modal
                    isOpen={modalVisible}
                    onClose={() => setModalVisible(false)}>
                    <Modal.Content maxWidth='400px'>
                        <Modal.CloseButton />
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Category</FormControl.Label>
                                <Input value={newCategory2} onChange={(text) => { setNewCategory(text); } } />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => { setModalVisible(false); setNewCategory(''); } }>
                                    Cancel
                                </Button>
                                <Button onPress={() => { setModalVisible(false); } }>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Flex><Spacer height='7%' /><Flex flexDirection='row'>
                <Text style={styles.titleamt}>AMOUNT:</Text>
                <CalculatorInput
                    fieldContainerStyle={styles.calculator}
                    fieldTextStyle={{ alignSelf: 'center' }}
                    displayTextAlign='right'
                    height={400}
                    displayHeight={60}
                    numericButtonColor='black'
                    calcButtonBackgroundColor='#ff6531'
                    acceptButtonBackgroundColor='#ff6531'
                    borderColor='#d3d3d3'
                    fontSize={25}
                    roundTo={2}
                    onBeforeChange={setNumValue}
                    value={numValue2.toFixed(2)} />
            </Flex><Spacer height='7%' /><Flex flexDirection='row' justifyContent='unset'>
                <Text style={styles.titlenote} marginRight={5}>NOTE:</Text>
                <Input style={{ borderRadius: 5, 
                    // backgroundColor: '#78b0a3', 
                    borderWidth: 0 }} position='unset' left='62' bottom='1' w='60%' maxW='300' value={text2} onChangeText={setText} blurOnSubmit={true} placeholder='Add a short note!' placeholderTextColor='black' variant='outline' />
            </Flex><Spacer h='30%' /><TouchableOpacity style={styles.button} onPress={submitExpenses}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </Flex>
    </Box>

    )
}

const NewEntry = () =>{
    return (<>
    <Center style={styles.header} _text={styles.headertext}>NEW ENTRY</Center>
            <Tab.Navigator
                initialRouteName='EntryIncome'
                sceneContainerStyle={{
                    position:'relative',
                    top:100,
                }}
                initialLayout={{
                    height:300
                }}
                screenOptions={{
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
                    name='EntryIncome'
                    component={EntryIncome}
                    options={{
                        tabBarLabel:'Income'

                    }}/>
                <Tab.Screen
                    name='EntryExpenses'
                    component={EntryExpenses}
                    options={{tabBarLabel:'Expenses'}} />
            </Tab.Navigator>
            
            </>
    )
}


export default NewEntry;


const styles = StyleSheet.create({
    container:{
        top:45,
        borderRadius:10
    },
    //header entry
    header:{
        top:10,
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        padding:5,
        backgroundColor:'#f79256',
        borderRadius:20,
        shadowColor:'#7F5DF0',
        shadowOffset:{
          width:3,
          height:3
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        
    },
    headertext:{
        fontSize:35,
        color:'#fbd1a2',
        shadowColor:'#96765f',
        shadowOffset:{
          width:3,
          height:3
        },
        shadowOpacity:0.2,
        shadowRadius:4,
        fontFamily:'PoppinsSemi'
    },
    //Titles
    titledate:{
        fontSize:20,
        alignItems:'center',
        justifyContent:'center',
        left:63,
        top:3,
        color:'#cf9a4e',
        fontFamily:'PoppinsSemi',
    },
    titlecategory:{
        fontSize:20,
        alignItems:'center',
        justifyContent:'center',
        left:5,
        color:'#cf9a4e',
        fontFamily:'PoppinsSemi',

    },
    titleamt:{
        fontSize:20,
        alignItems:'center',
        justifyContent:'center',
        left:24,
        color:'#cf9a4e',
        fontFamily:'PoppinsSemi',

    },
    titlenote:{
        fontSize:20,
        alignItems:'center',
        justifyContent:'center',
        left:56,
        color:'#cf9a4e',
        fontFamily:'PoppinsSemi',

    },
    //button
    add:{
        backgroundColor:'#e32f45',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center',
        left:50,
        bottom:10,
        shadowColor:'#394875',
        shadowOffset:{
          width:3,
          height:3
        },
        shadowOpacity:0.25,
        shadowRadius:5,

    },
    //respective features
    picker:{
        bottom:6,
        left:60,
        borderColor:'black',
        borderRadius:1,
        shadowColor:'#0f0e0d',
        shadowOffset:{
          width:2,
          height:2
        },
        shadowOpacity:0.25,
        shadowRadius:1,

    },
    select:{
        bottom:5,
        left:13,
      
    },
    calculator:{
        left:24,
        bottom:15,
        width:90,
        // backgroundColor:'#78b0a3',
        borderRadius:7,
        height:30
    },
    input:{
        left:84,
    },
    //submit button
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