import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {Box, Pressable,Spacer,HStack,VStack,Icon,Text} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons'


export default function SwipeView({data}) {
    const [listData, setListData] = useState(data);

    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
  
    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    };
  
  
    const renderItem = ({
      item
    }) => <Box>
        <Pressable  _dark={{
        bg: 'coolGray.800'
      }} _light={{
        bg: 'white'
      }}>
            <Box pl="4" pr="5" py="2" >
                <HStack>
                    <VStack alignItems='center'>
                      <Text style={styles.item}>{item.category}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                    </VStack>
                    <Spacer />
                    <Text style={{top:10}} fontFamily="Lato" fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                      {item.amount.toFixed(2)}
                    </Text>
                </HStack>
            </Box>
        </Pressable>
      </Box>;
  
    const renderHiddenItem = (data2, rowMap) => 
    <HStack flex="1" pl="2">
        <Pressable w="50" cursor="pointer" bg="red.500" justifyContent="center" style={{left:100}} onPress={() => deleteRow(rowMap, data2.item.key)} _pressed={{
        opacity: 0.5
      }}>
          <VStack alignItems="center" space={2}>
            <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>;
  
    return <>
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-63} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} 
        />
    </>
  }

const styles=StyleSheet.create({
      //for modal
  item:{
    fontSize:16,
    fontFamily:'PoppinsSemi'
  },
  description:{
    fontSize:10,
    fontFamily:'Poppins',
  
    
  }
})