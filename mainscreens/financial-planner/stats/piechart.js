import React, { useState } from 'react';
import { VictoryPie } from 'victory-native';
import { View,Text,FlatList, Spacer } from 'native-base';
import { TouchableOpacity } from 'react-native';

// //data catagory filter option
// const processCategoryDataToDisplay = ({data}) =>{
//     let chartData=data.map((item)=>{
//         var total=data.reduce((a,b)=> a+(b.amount || 0),0)

//         return {
//             description: item.description,
//             y:total,
//             date:item.created_at
//         }
//     })
//     //filter those without any expenses
//     let filterChartData=chartData.filter(a=>a.y>0)

//     //calculate total
//     let totalExpense=filterChartData.reduce((a,b)=> a+(b.y || 0),0)

//     //calculate percentage and repopulate chart data
//     let finalChartData=filterChartData.map((item)=>{
//         let percentage =(item.y/totalExpense*100).toFixed(0)
//         return{
//             label:`${percentage}%`,
//             y:Number(item.y),
//             description:item.description,
//             date:item.created_at

//         }
//     })

//     return finalChartData
// }


const RenderStats = ({data,type}) => {
    const [selectedCategory,setSelectedCategory]=useState(null)
    const setSelectedCategoryByName = ({name})=>{
        let categoryy=data.filter(a=>a.category==name)
        setSelectedCategory(categoryy[0])
    }
    //remove when connecting backend
    let chartData=data
    // let chartData=processCategoryDataToDisplay(data)
    let largestTotal=chartData.reduce((a,b)=> a+ (b.y || 0),0)

    return(
        <View style={{alignItems:'center',justifyContent:'center',top:270}}>
            <VictoryPie
                data={chartData}
                colorScale='warm'
                labels={(datum) => `${datum.y}`}
                radius={({datum}) => (selectedCategory && selectedCategory.category===datum.category) ? 140 : 120}
                innerRadius={60}
                labelRadius={({innerRadius})=>(140+innerRadius)/2.5}
                width={280}
                height={280}
                style={{
                    top:40,
                    labels:{fill:'#fff',
                    // fontFamily:'Poppins'
                },
                    parent:{
                        shadowColor:'#0f0e0d',
                        shadowOffset:{
                          width:2,
                          height:2
                        },
                        shadowOpacity:0.25,
                        shadowRadius:1,                
                    }
                }}
                events={[{
                    target:'data',
                    eventHandlers:{
                        onPress: ()=>{
                            return [{
                                target:'labels',
                                mutation: (props) => {
                                    let categoryName=chartData[props.index].category
                                    setSelectedCategoryByName(categoryName)
                                }
                            },
                        ]
                        }
                    }
                }]}
                />
            <View style={{position:'relative',bottom:155}}>
                <Text style={{textAlign:'center',fontFamily:'LatoBold',fontSize:22}}>{largestTotal}</Text>
                <Text style={{textAlign:'center',fontFamily:'Lato'}}>{type}</Text>
            </View>
            
            <View>
                <FlatList
                    contentContainerStyle={{justifyContent:'flex-end',}}
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    height:30,
                                    paddingHorizontal:60,
                                    borderRadius:10,
                                    borderColor:'#242424',
                                    borderWidth:0.5,                                

                                }}>
                                <View style={{alignItems:'center',justifyContent:'center'}}>                    
                                    <Text style={{fontFamily:'PoppinsSemi'}}>{item.category}</Text>
                                </View>
                                <Spacer w='20%'/>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontFamily:'Poppins'}}>${item.y} - {item.label}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(item,index) => String(index)}

                />
            </View>

        </View>
    )
}

export default RenderStats;