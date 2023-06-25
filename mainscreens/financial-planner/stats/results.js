import React from 'react';
import RenderStats from './piechart';
import { Text} from 'native-base';
import {  useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

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





const Results = () =>{
    // const route = useRoute()
    //to retrieve search results to filter data
    const navigation = useNavigation();
    return(
        <>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('StackedStats')}}>
            <Text color="#fff">Back</Text>
        </TouchableOpacity>

        <RenderStats
            data={dummy_data}
            type='type'
            />
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
    }
})