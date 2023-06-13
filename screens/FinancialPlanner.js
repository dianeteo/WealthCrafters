import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Entry from './financial-planner/entry.js';
import {Calendar} from 'react-native-calendars';
import {NativeBaseProvider,Modal,Flex,Text, View,Box, FlatList, HStack, VStack, Spacer} from 'native-base';

const expense_data = [{
  id: 3,
  description: 'ramen',
  category:'food',
  amount: 10.00,
  created_at: new Date(),
  created_by: 3,
},]
const income_data = [{
  id: 3,
  description: 'barista job',
  category:'salary',
  amount: 1000.00,
  created_at: new Date(),
  created_by: 3,
},]



class FinancialPlanner extends React.Component {
  
  state = {
    isModalVisible: false,
  };


  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });
  

    render() {

        return(
            <SafeAreaView style={styles.container}>
              <Box style={{
                margin:15,
                borderRadius:10
              }}>
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
                        <Box style={[styles.main]}>
                          <Text style={{ marginVertical: 7.5, color: '#171717', fontFamily:'LatoBold'}}>{date.day}</Text>
                          <Text style={{ fontSize: 10, color: 'red', left: 10, fontFamily:'Lato'}}>100</Text>
                          <Text style={{ fontSize: 10, color: 'blue', top: 2, left: 10, fontFamily:'Lato'}}>200</Text>
                          <Text style={{ fontSize: 10, color: 'green', top: 4, left: 10, fontFamily:'Lato' }}>300</Text>
                        </Box>
                      </TouchableOpacity></>
                          
                           );
                          }}
                />
                <Modal isOpen={this.state.isModalVisible} onClose={this.hideModal} style={styles.modal} size='xl' >
                  <Modal.Content h='600'>
                    <Modal.Header alignSelf='center'>Total:</Modal.Header>
                    <Modal.CloseButton />
                    <Flex justifyContent='space-evenly' direction='row'>
                        {/* income side */}
                        <Flex direction='column'>
                          <Spacer h='7%'/>
                          <Box alignItems='center'>
                            <Text style={styles.header}>Income ()</Text>
                          </Box>
                          <Spacer h='3%'/>
                          <Box>
                            <FlatList minH='400' w='175' data={income_data} borderTopWidth='0.5' borderBottomWidth='0.5' borderColor='muted.800'renderItem={({item})=>
                          <Box borderTopWidth='0.5' borderBottomWidth='0.3' borderColor='muted.800' >
                            <HStack>
                              <VStack alignItems='center'>
                                <Text style={styles.item}>{item.category}</Text>
                                <Text italic style={styles.description}>{item.description}</Text>
                              </VStack>
                              <Spacer />
                              <Text style={{top:10}} fontFamily="Lato" fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                                {item.amount.toFixed(2)}
                              </Text>
                            </HStack>
                          </Box>} keyExtractor={item => item.id}>
                          </FlatList>
                          </Box>
                        </Flex>
                        {/* expenses side */}
                        <Flex direction='column'>
                        <Spacer h='7%'/>
                          <Box alignItems='center'>
                            <Text>Expenses ()</Text>
                          </Box>
                          <Spacer h='4%'/>
                          <Box>
                            <FlatList w='175'minH='400'data={expense_data} borderTopWidth='0.5' borderBottomWidth='0.5' borderColor='muted.800' renderItem={({item})=>
                          <Box borderTopWidth='0.5' borderBottomWidth='0.3' borderColor='muted.800' >
                            <HStack>
                              <VStack alignItems='center' justifyContent='space-evenly'>
                                <Text style={styles.item}>{item.category}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                              </VStack>
                              <Spacer />
                              <Text style={{top:10}} fontFamily='Lato' fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                                {item.amount.toFixed(2)}
                              </Text>
                            </HStack>
                          </Box>} keyExtractor={item => item.id}></FlatList>
                          </Box>
                        </Flex>
                    </Flex>
                    </Modal.Content>
                </Modal>
                </Box>
                </SafeAreaView>
          
        )
    }
  }

export default FinancialPlanner;

const styles = StyleSheet.create({
  //for calendar
  container: {
    flex:1,
    backgroundColor: '#7dcfb6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    justifyContent:'center',
    height:89
  },

  calendar:{
    flex:1,
    width:405,
    padding:10,
    borderRadius:10
  },
  //for modal
  item:{
    fontSize:16,
    fontFamily:'PoppinsSemi'
  },
  description:{
    fontSize:10,
    fontFamily:'Poppins',
  
    
  }
});