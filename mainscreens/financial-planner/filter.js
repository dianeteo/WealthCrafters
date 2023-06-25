import React,{useState} from "react";
import {Box,Form,FormControl,Text,Select,View,Flex, HStack,Spacer} from 'native-base';
import { SafeAreaView, StyleSheet } from "react-native";
import moment from 'moment';
import DateRangePicker from 'rn-select-date-range';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    //date range
    const [selectedRange,setSelectedRange]=useState({});
    //type
    const [selectedValue, setSelectedValue] = useState('');

    const [selectedCategory,setSelectedCategory]=useState('')

    const navigation=useNavigation()

    //for submit button
    const handleFilterSubmit = () => {
        navigation.navigate('stackedResults', {
                range:{...selectedRange},
                type:selectedValue,
                catgeory:selectedCategory


        });
      };

    return (
        <SafeAreaView>
            <Flex direction="column">
            <View style={styles.rangepicker}>
                <DateRangePicker
                onSelectDateRange={(range) => {
                    setSelectedRange(range);
                }}
                responseFormat="YYYY-MM-DD"
                selectedDateContainerStyle={styles.selectedDateContainerStyle}
                selectedDateStyle={styles.selectedDateStyle}
                font='Poppins'
                confirmBtnTitle=""
                    />
            </View>
            <HStack style={{left:100}}>
                <Text style={{fontFamily:'PoppinsSemi',fontSize:15, top:2}}>Type:</Text>
                <Spacer w='2%'/>
                <FormControl isRequired>
                    <Select
                    selectedValue={selectedValue}
                    onValueChange={(value) => setSelectedValue(value)}
                    placeholder="Any specific Type?"
                    width={175}
                    >
                    <Select.Item label="Income" value="income" />
                    <Select.Item label="Expenses" value="expenses" />
                    <Select.Item label="Balance" value="Balance" />
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
                    {categories.map(category => (
                        <Select.Item
                        key={category.id}
                        label={category.name}
                        value={category.id}
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