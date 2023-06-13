import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CalculatorInput,CalculatorInputProps } from 'react-native-calculator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NativebaseProvider, Modal,FormControl,Button,Input,Box,Center,Text,Flex,Spacer,Select} from 'native-base';



const Entry = () => {
    // for modal appearing
    const [modalVisible, setModalVisible]=useState(false)
    // for calendar date
    const[date,setDate]=useState(new Date())
    //for Category List
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
        { label: 'Category 3', value: 'category3' },
    ]);
    //for adding Category
    const [newCategory, setNewCategory] = useState('');

    //for Amount Keying
    const [numValue, setNumValue] = useState();
    //for changing note
    const [text,setText]=useState('')


    const handleCategoryAdd = () => {
        setCategories([...categories,{label:newCategory,value:newCategory}]);
        setNewCategory('');
        }

    return (
        <Box style={{backgroundColor:'#445073',height:1000}}>
        <Flex style={styles.container} flexDirection='column' justifyContent='center'>
            <Center style={styles.header} _text={styles.headertext}>
                NEW ENTRY
            </Center>
            <Spacer h='7%' />
            <Flex flexDirection='row'>
                <Text style={styles.titledate}>Date:</Text>
                <DateTimePicker style={styles.picker} value={date} onChange={(event,date)=>{setDate(date);event='dismissed'}} />
            </Flex>
            <Spacer h='7%' />
            <Flex flexDirection='row'>
                <Text style={styles.titlecategory}>Category:</Text>
                <Box style={styles.select}>
                    <Select selectedValue={selectedCategory} 
                            minWidth="212" 
                            accessibilityLabel="Choose A Category" 
                            placeholder="Choose A Category"
                            onValueChange={itemValue => setSelectedCategory(itemValue)}
                            >
                    <Select.Item label='Food' value='food'></Select.Item>
                    <Select.Item label='Shopping' value='shopping'></Select.Item>  
                    <Select.Item label='Haircut' value='haircut'></Select.Item>
                    <Select.Item label='Transport' value='transport'></Select.Item>
                    </Select>
                    {/* <RNPickerSelect
                        style={{alignSelf:'center', width:60}}
                        value={selectedCategory}
                        onValueChange={(value) => setSelectedCategory(value)}
                        items={categories}
                        
                    /> */}
                </Box>
                <TouchableOpacity style={styles.add} onPress={() => { setModalVisible(true); } }>
                    <Ionicons name='add-outline' size={40} />
                </TouchableOpacity>
                <Modal
                    isOpen={modalVisible}
                    onClose={() => setModalVisible(false)}>
                    <Modal.Content maxWidth='400px'>
                        <Modal.CloseButton />
                        <Modal.Body>
                            <FormControl>
                                <FormControl.Label>Category</FormControl.Label>
                                <Input value={newCategory} onChange={(text)=>{setNewCategory(text)}} />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => { setModalVisible(false); setNewCategory('') } }>
                                    Cancel
                                </Button>
                                <Button onPress={()=>{setModalVisible(false)}}>
                                    Save
                                </Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </Flex>
            <Spacer height='7%' />
            <Flex flexDirection='row'>
                <Text style={styles.titleamt}>Amount:</Text>
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
                    value={numValue} />
            </Flex>
            <Spacer height='7%' />
            <Flex flexDirection='row' justifyContent='unset'>
                <Text style={styles.titlenote}>Note:</Text>
                <Input position='unset' left='53' bottom='1' w='60%' maxW='300' value={text} onChangeText={setText} blurOnSubmit={true} placeholder='Add a Short Note!' variant='outline' />
            </Flex>
            <Spacer h='12%' />
            <Button style={styles.button} variant={'solid'} >
                Submit
            </Button>
        </Flex>
    </Box>
    )
}

export default Entry;


const styles = StyleSheet.create({
    container:{
        top:45,
        borderRadius:10
        
    },
    //header entry
    header:{
        bottom:25,
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        padding:5,
        backgroundColor:'#00154f',
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
        fontWeight:'bold',
        color:'#f2bc94',
        shadowColor:'#96765f',
        shadowOffset:{
          width:3,
          height:3
        },
        shadowOpacity:0.2,
        shadowRadius:4,
        // fontFamily:'helvetica-neue'
    },
    //Titles
    titledate:{
        fontSize:20,
        left:44,
        color:'#c0904d',
        fontWeight:'bold',
        shadowColor:'#916e3c',
        shadowOffset:{
          width:2,
          height:2
        },
        shadowOpacity:0.25,
        shadowRadius:1,
    },
    titlecategory:{
        fontSize:20,
        left:5,
        color:'#c0904d',
        fontWeight:'bold',
        shadowColor:'#916e3c',
        shadowOffset:{
          width:2,
          height:2
        },
        shadowOpacity:0.25,
        shadowRadius:1,
    },
    titleamt:{
        fontSize:20,
        left:18,
        color:'#c0904d',
        fontWeight:'bold',
        shadowColor:'#916e3c',
        shadowOffset:{
          width:2,
          height:2
        },
        shadowOpacity:0.25,
        shadowRadius:1,
    },
    titlenote:{
        fontSize:20,
        left:44,
        color:'#c0904d',
        fontWeight:'bold',
        shadowColor:'#916e3c',
        shadowOffset:{
          width:2,
          height:2
        },
        shadowOpacity:0.25,
        shadowRadius:1,
    },
    //button
    add:{
        backgroundColor:'#6077c0',
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
        left:40,

    },
    select:{
        bottom:5,
        left:13,
        // borderColor:'#d3d3d3',
        // borderWidth:1,
        // minWidth:10
        
    },
    calculator:{
        left:14,
        bottom:15,
        width:90,
        borderColor:'gray',
        borderWidth:1,
        borderRadius:7,
        height:30
    },
    input:{
        left:70,
    },
    //submit button
    button:{
        width:250,
        borderRadius:100,
        alignSelf:'center',
        backgroundColor:'#6077c0'

    },
    })