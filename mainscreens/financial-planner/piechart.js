import React from 'react';
import { VictoryPie } from 'victory-native';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';

//data catagory filter option
const processCategoryDataToDisplay = ({data}) =>{
    let chartData=data.map((item)=>{
        var total=item.amount.reduce((a,b)=> a+(b.total || 0),0)

        return {
            description: item.description,
            y:total,
            expenseCount: item.amount.length,
            color: item.color,
            date:item.created_at
        }
    })
    //filter those without any expenses
    let filterChartData=chartData.filter(a=>a.y>0)

    //calculate total
    let totalExpense=filterChartData.reduce((a,b)=> a+(b.y || 0),0)

    //calculate percentage and repopulate chart data
    let finalChartData=filterChartData.map((item)=>{
        let percentage =(item.y/totalExpense*100).toFixed(0)
        return{
            label:`${percentage}%`,
            y:Number(item.y),
            expenseCount:item.expenseCount,
            color:item.color,
            description:item.description

        }
    })

    return finalChartData
}

const renderChart = ({data}) => {

    let chartData=processCategoryDataToDisplay(data)
    

    return(
        <View>
            <VictoryPie
                data={data}

                />
        </View>
    )
}