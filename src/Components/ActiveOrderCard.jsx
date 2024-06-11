import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../Contants/color';
import { Box } from 'native-base';
import routes from '../Contants/routes';

export default function ActiveOrderCard({item,navigation}) {
    const parseDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return { date, time };
      };
  
      const { date: orderDate } = parseDateTime(item?.orderDate);
      const { date: assignmentDate } = parseDateTime(item?.assignmentTime);
    return (
        <View>
            <Box style={styles.orderContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(routes.ORDER_DETAIL, { item })}>
                    <Box style={styles.orderContent}>
                        <Box style={styles.orderHeader}>
                            <Box style={styles.orderId}>
                                <Text style={styles.orderIdText}>#{item?.orderId}</Text>
                            </Box>
                            <Box style={styles.orderStatus}>
                                <Text style={styles.orderStatusText}>{item?.status}</Text>
                            </Box>
                        </Box>
                        <Box style={styles.orderDetails}>
                            <Text style={styles.orderAddress} numberOfLines={4}>
                                🏠 : {item?.customerAddress?.houseNo ? `H-${item?.customerAddress?.houseNo}` : ''}
                                {item?.customerAddress?.flatNo ? `, F-${item?.customerAddress?.flatNo},` : ''}
                                {item?.customerAddress?.addressLine1}
                            </Text>
                            <Text style={styles.orderDate}>🗓️ : {orderDate}</Text>
                            <Text style={styles.orderPhone}>📱 : {item?.customerAddress?.pocPhoneNo}</Text>
                        </Box>
                        <Box style={styles.orderAmountContainer}>
                            <Text style={styles.orderAmountLabel}> Total Amount :</Text>
                            <Box style={styles.orderAmount}>
                                <Text style={styles.orderAmountText}>$ {item?.totalAmount}</Text>
                            </Box>
                        </Box>
                    </Box>
                </TouchableOpacity>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    
    
    orderContainer: {
      backgroundColor: 'white',
      borderWidth: 0.17,
      borderColor: color.primary,
      width: '90%',
      marginBottom: 15,
      borderRadius: 20,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    orderContent: {
      padding: 10,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    orderId: {
      backgroundColor: color.primary,
      padding: 5,
      width: '30%',
      borderRadius: 15,
    },
    orderIdText: {
      color: 'white',
      textAlign: 'center',
      fontweight: 'bold',
    },
   
    
    orderDetails: {
      gap: 10,
      marginTop: 10,
    },

    
    
    orderAmountContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 20,
    },
    orderAmountLabel: {
      fontSize: 18,
      color: 'black',
      textAlign: 'center',
      fontweight: 'bold',
    },
    orderAmount: {
      width: '40%',
      alignSelf: 'center',
      backgroundColor: color.primary,
      padding: 15,
      borderRadius: 20,
    },
    orderAmountText: {
      color: 'white',
      textAlign: 'center',
      fontweight: 'bold',
    },
    loader: {
      marginVertical: 10,
    },
  });
  