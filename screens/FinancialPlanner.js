import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import React, {useState} from 'react';
import { Text, Button} from 'react-native-paper';
import Entry from './financial-planner/entry.js';
import {Calendar} from 'react-native-calendars';
import MyModal from './financial-planner/modal.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Entry" component={Entry} />
    </Stack.Navigator>
  );
}

class FinancialPlanner extends React.Component {

  
  state = {
    isModalVisible: false,
  };
  


  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });
  
  

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <Calendar
                  hideExtraDays={true}
                  //do you wanna show the extra days
                  theme={{'stylesheet.calendar.header': {
                    week: {
                      marginTop: 4,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems:'center'
                      }
                    }
                  }}
                  
                  //to be edited later, to just show the entry screen for now without animation

                  
                  
                  

                  style={[styles.calendar, {height: 200}]}
                  dayComponent={({date}) => {
                    return (
                            <><TouchableOpacity onPress={this.showModal}>
                        {//need to store date somewhere so that modal will have currentdate
                        }
                        <View style={[styles.main]}>
                          <Button style={{ marginVertical: 12, color: 'black', justifyContent: 'space-around', flexDirection: 'row', }}>{date.day}</Button>
                          <Text style={{ fontSize: 10, color: 'red', left: 10 }}>100</Text>
                          <Text style={{ fontSize: 10, color: 'blue', top: 2, left: 10 }}>200</Text>
                          <Text style={{ fontSize: 10, color: 'green', top: 4, left: 10 }}>300</Text>
                        </View>
                      </TouchableOpacity>
                      <View>
                          <MyModal visible={this.state.isModalVisible} dismiss={this.hideModal}>
                            <View style={styles.background}>
                              <View style={styles.header}>
                                <Text>Date</Text>
                              </View>
                              <View style={styles.body}>
                                <View style={styles.header2}>
                                  <Text style={styles.header2text}>Income</Text>
                                  <Text style={styles.header2text}>Expenses</Text>
                                </View>
                                <View style={styles.logs}>
                                  <ScrollView style={styles.scroll}>
                                    <Text>Income (80)</Text>
                                  </ScrollView>
                                  <ScrollView style={styles.scroll}>
                                    <Text>Food (5)</Text>
                                  </ScrollView>
                                </View>
                              </View>
                            </View>
                          </MyModal>
                        </View></>
                          
                           );
                          }}
                />
                </SafeAreaView>
          
        )
    }
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
    justifyContent:'center'
  },

  calendar:{
    flex:1,
    width:405
  },
  //for modal
  header:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'black'
  },
  button:{
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    left:100,
    borderRadius: 200,
    backgroundColor: '#add8e6',
    shadowColor:'black'
  },
  body:{
    flex:6,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    borderColor:'black'
  },
  buttontext:{
    fontWeight:'bold',
    fontSize:20,
    color:'#fff',
    alignSelf:'center',
    bottom:3
  },
  background:{
    flexDirection:'column',
    backgroundColor:'white',
    width:350,
    height:600,
    justifyContent:'center'
  },
  scroll:{
    alignSelf:'top',
    fontSize:18,
    left:20

  },
  logs:{
    flex:5,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center'
  },
  header2:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:'black',
    borderWidth:1,
    width:350
  },
  header2text:{
    alignSelf:'center',
    fontSize:40,
  }
});