import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,SafeAreaView,TouchableOpacity,Image,Modal,Pressable} from 'react-native';
import React, {useState} from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { CalculatorInput,CalculatorInputProps } from 'react-native-calculator';
import Ionicons from 'react-native-vector-icons/Ionicons';import SQLite from 'expo-sqlite'; 

const Entry = () => {
    // for modal appearing
    const [modalVisible, setModalVisible]=useState(true)
    //for Amount Keying
    const [inputValue, setInputValue] = useState();
    
    // for category picking
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      ])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontSize:30}}>New Entry</Text>
            </View>
            <View style={styles.date}>
                <Text style={styles.datetext}>Date:</Text>
                <DateTimePicker value={new Date()} />
            </View>
            <View style={styles.category}>

                <Text style={{fontSize:20}}>Category:</Text>
                    <DropDownPicker 
                dropDownContainerStyle={{
                    width:200,
                    left:10
                }}
                placeholder='Select One'
                placeholderStyle={{alignSelf:'center'}}
                style={styles.dropDownPicker}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                />
                <TouchableOpacity style={styles.add} >
                    <Ionicons name='add-outline' size={45}/>
                </TouchableOpacity>
                <Modal
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <Pressable style={styles.outsideModal}
                    onPress={(event) => { if (event.target == event.currentTarget) { 
                        setModalVisible(false); } }} >
                    <View style={styles.modal}>
                        <View style={styles.modalHeader}>
                        <View style={styles.modalHeaderContent}>
                            <Text>Other header content</Text></View>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalHeaderCloseText}>X</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                        <Text>
                            Popup content.
                        </Text>
                        </View>
                    </View>
                    </Pressable>
                </Modal>
                {//insert category choice here
                }
            </View>
            <View style={styles.amount}>
                <Text style={{fontSize:20}}>Amount:</Text>
                <CalculatorInput 
                fieldContainerStyle={styles.calculator} 
                fieldTextStyle={{alignSelf:'center'}}
                displayTextAlign='right'
                height={400}
                displayHeight={60}
                numericButtonColor='black'
                calcButtonBackgroundColor='#ff6531'
                acceptButtonBackgroundColor='#ff6531'
                borderColor='#d3d3d3'
                fontSize={25}
                roundTo={2}
                onBeforeChange={setInputValue}
                value={inputValue}
                />
            </View>
        <View style={styles.note}>
            <Text style={{fontSize:20}}>Note:</Text>
            <TextInput style={styles.noteinp}/>
        </View>
        <TouchableOpacity style={styles.button} >
            <Text>Submit</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Entry;


const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    header:{
        alignItems:'center',
        justifyContent:'center',
    },
    date:{
        top:50,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    datetext:{
        fontSize:20
    },
    category:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        left:70,
        zIndex:999
    },
    add:{
        backgroundColor:'#bebebe',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        right:200
    },
    dropDownPicker:{
        left:10,
        width:200
    },
    amount:{
        
        flexDirection:'row',
        alignItems:'center'
    },
    calculator:{
        left:10,
        width:70,
        borderColor:'gray',
        borderWidth:2,
        borderRadius:10,
        height:25
    },
    note:{
        flexDirection:'row',

    },
    noteinp:{
        height:20,
        width:80,
        backgroundColor:'white',
        borderRadius:20,
        borderColor:'black'
    },
    button:{
        top:10,
        backgroundColor:'#add8e6',
        borderRadius:20,
        width:100,
        height:50,
        alignItems:'center',
        justifyContent:'center'

    },
    //for the modal
    modal: {
        flex: 1,
        margin: 50,
        padding: 5,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      /* The content of the modal takes all the vertical space not used by the header. */
      modalContent: {
        flex: 1,
        borderWidth: 1,
        borderColor: "black"
      },
      modalHeader: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "black"
      },
      /* The header takes up all the vertical space not used by the close button. */
      modalHeaderContent: {
        flexGrow: 1,
      },
      modalHeaderCloseText: {
        textAlign: "center",
        paddingLeft: 5,
        paddingRight: 5
      },
      outsideModal: {
        backgroundColor: "rgba(1, 1, 1, 0.2)",
        flex: 1,
        }
    })