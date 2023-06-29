import React from 'react';
import RenderStats from './piechart';
import { Text} from 'native-base';
import {  useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory-native';

const dummy_data = [
{
    Day: 1,
    Expense: 100,
}, 
{
    Day: 2,
    Expense: 450,
}, 
{
    Day: 3,
    Expense: 200,
}]


const Results = () =>{
    // const route = useRoute()
    //to retrieve search results to filter data
    const navigation = useNavigation();
    return(
        <>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('StackedStats')}}>
            <Text color="#fff">Back</Text>
        </TouchableOpacity>
        <View style={styles.container}>
            <VictoryChart theme={VictoryTheme.material}>
                <VictoryBar animate data={dummy_data} x="Day" y="Expense"/>
            </VictoryChart>
        </View>
        </>
    )
}

export default Results

const styles=StyleSheet.create ({
    button:{
        width:50,
        height:30,
        justifyContent:'center',
        borderRadius:10,
        alignItems:'center',
        alignSelf:'flex-start',
        backgroundColor:'#00b2ca',
        top:10,
        left:10
    },
    
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }

})