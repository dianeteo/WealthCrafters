import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,SafeAreaView,TouchableOpacity,Image} from 'react-native';
import React, {useState} from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import MyModal from './modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { CalculatorInput,CalculatorInputProps } from 'react-native-calculator';
const Entry = () => {
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
                addCustomItem={true}
                searchable={true}
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
                setItems={setItems}/>
                <TouchableOpacity onPress={this.showModal} style={styles.button}/>
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
        <TouchableOpacity style={styles.button}>
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
        left:100,
        zIndex:999
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

    }
})