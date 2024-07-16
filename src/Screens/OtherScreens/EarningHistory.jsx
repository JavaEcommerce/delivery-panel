import {  Text,FlatList, } from 'react-native'
import React,{useState} from 'react'
import {Box,View} from 'native-base'
import typography from '../../Contants/fonts';
import COLORS from '../../Contants/color';
import { Platform } from 'react-native';


export default function EarningHistory() {
  

 
  const earnings
   = [
    {
        time: '10:00 AM',
        date: '15 July 2024 ',
        amount: 100.00,
        paymentStatus: 'Paid',
        orderId: 'ORD001'
    },
    {
        time: '11:30 AM',
        date: '15 July 2024',
        amount: 150.50,
        paymentStatus: 'Pending',
        orderId: 'ORD002'
    },
    {
        time: '01:00 PM',
        date: '15 July 2024',
        amount: 200.75,
        paymentStatus: 'Paid',
        orderId: 'ORD003'
    },
    {
        time: '02:45 PM',
        date: '15 July 2024',
        amount: 50.25,
        paymentStatus: 'Admin Pandings',
        orderId: 'ORD004'
    },
    {
        time: '02:45 PM',
        date: '15 July 2024',
        amount: 50.25,
        paymentStatus: 'Admin Pandings',
        orderId: 'ORD004'
    }
];
const [allEarning,setAllEarnings] = useState(earnings)

console.log(allEarning);
const renderItems =({item})=>{

    let statusColor = '';
    
    switch (item.paymentStatus) {
        case 'Paid':
            statusColor = 'green';
            break;
        case 'Admin Pandings':
            statusColor = '#a77c18';
            break;
        case 'Pending':
            statusColor = '#ecbf58';
            break;
        default:
            statusColor = 'black';
    }
  
    if(item.status=='Paid'){
      statusColor = 'green';
    }
    console.log(statusColor);
  return(
    <View key={item.orderId} style={{ backgroundColor: 'white', padding: 10, marginBottom: 10, width:'100%',borderRadius:Platform=='IOS'?20:10,gap:10,borderWidth:1, }} borderColor={'gray.300'} >
      <View style={{flexDirection:'row'}} justifyContent={'space-between'} alignItems={'center'} >
        <Text style={{ padding:4,backgroundColor:COLORS.primary,color:'white',borderRadius:Platform=='IOS'?15:8,fontWeight:typography.h1.fontWeight,fontSize:typography.small.fontSize}}>#{item.orderId}</Text>
        <Text style={{color:statusColor,fontSize:typography.small.fontSize,fontWeight:typography.bold.fontWeight}}>{item.paymentStatus}</Text>
      </View>
     <View style={{flexDirection:'row'}} justifyContent={'space-between'}>
     <View  style={{flexDirection:'row' , alignItems:'center'}} justifyContent={'center'} >
      <Text style={{fontSize:typography.subtitle.fontSize,color:'gray'}}>{item.date} at </Text>
      <Text style={{fontSize:typography.subtitle.fontSize,color:'gray'}}>{item.time} </Text>
     </View>
        <Text style={{fontWeight:typography.bold.fontWeight, fontSize:typography.mainHeading.fontSize}}>${item.amount}</Text>
     </View>
      
    </View>
  )
}

// }
  return (
   
      <View style={{ padding: 10, height: '100%', width: '100%', justifyContent:'center',alignItems:'center',backgroundColor:'white' }}>
          <FlatList
            data={earnings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            style={{width: '90%', }}
            marginTop={20}

          />
                    
                         
                         
                        
      </View>
   
  )
}