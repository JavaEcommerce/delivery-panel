import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { Box } from 'native-base'
import color from '../Contants/color'

const HomeRecentOrder = ({item}) => {
    let statusColor = '';
    switch (item.status) {
      case 'Delivered':
        statusColor = color.primary;
        break;
      case 'Pending':
        statusColor = '#fab005';
        break;
      case 'Cancelled':
        statusColor = 'red';
        break;
      default:
        statusColor = 'black';
    }
  return (
    <>
    <Box
        style={{
            backgroundColor: 'white',
            borderWidth: 0.17,
            borderColor: color.primary,
            width: '90%',
            marginBottom: 15,
            borderRadius: 20,
            justifyContent: 'center',
            alignSelf: 'center'
        }}
    >
        <TouchableOpacity>
            <Box style={{ height: 180, padding: 10, width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box style={{ backgroundColor: color.primary, padding: 5, width: '30%', borderRadius: 15 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>#{item.id}</Text>
                    </Box>
                    <Box style={{ padding: 5 }}>
                        <Text style={{ color: statusColor, textAlign: 'center', fontWeight: '900' }}>{item.status}</Text>
                    </Box>
                </Box>
                <Box style={{ gap: 10, marginTop: 10 }}>
                    <Text style={{ color: 'black', fontWeight: '700' }}>Address : {item.address}</Text>
                    <Text style={{ color: 'black', fontWeight: '700' }}>Time: {item.timestamp}</Text>
                </Box>
                {item.status !== 'Cancelled' ? (
                    <Box style={{ width: '100%', alignSelf: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 20 }}>
                        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>Payment : {item.paymentMethod}</Text>
                    </Box>
                ) : (<Box style={{ width: '100%', alignSelf: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 20 }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '900' }}>Cancelled</Text>
                </Box>)}
            </Box>
        </TouchableOpacity>
    </Box>
</>
  )
}

export default HomeRecentOrder