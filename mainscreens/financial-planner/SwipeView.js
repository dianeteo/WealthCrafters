import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import {Box, Pressable,Spacer,HStack,VStack,Icon} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons'
const expense_data = [{
    id: 3,
    description: 'ramen',
    category:'food',
    amount: 10.00,
    created_at: new Date(),
    created_by: 3,
  },]
export default function SwipeView() {
    const [listData, setListData] = useState(expense_data);

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
  
    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };
  
    const renderItem = ({
      item
    }) => <Box>
        <Pressable onPress={() => console.log('You touched me')} _dark={{
        bg: 'coolGray.800'
      }} _light={{
        bg: 'white'
      }}>
            <Box borderTopWidth='0.5' borderBottomWidth='0.3' borderColor='muted.800' >
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
  
    const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
        <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
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
  
    return <Box bg="white" safeArea flex="1">
        <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
      </Box>;
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