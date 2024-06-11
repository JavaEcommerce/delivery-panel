import { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { Box} from 'native-base';
import color from '../Contants/color';
import { apiBaseUrl,updateNewOrdersStatus } from '../Contants/api';
import routes from '../Contants/routes';
export default function NewOrderCard({ item,navigation,refetch}) {
    const handleRejectOrder = async (id) => {
        const payload = { status: 'DeliveryPersonRejected' };
        try {
          const response = await fetch(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if (!response.ok) {
            throw new Error('Failed to update status');
          }
          refetch();
        } catch (error) {
          console.error('Error updating status:', error.message);
        }
      };
    
      const handleAcceptOrder = async (id) => {
        const payload = { status: 'Assigned' };
        try {
          const response = await fetch(`${apiBaseUrl}${updateNewOrdersStatus}${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          navigation.navigate(routes?.ASSIGN_ORDERS, { item: id });
          if (!response.ok) {
            throw new Error('Failed to update status');
          }
          refetch();
        } catch (error) {
          console.error('Error updating status:', error.message);
        }
      };



    const parseDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime?.toLocaleDateString();
        const time = dateTime?.toLocaleTimeString();
        return { date, time };
      };
      const { date: orderDate, time: orderTime } = parseDateTime(item?.order?.orderDate);
      const { date: assignmentDate, time: assignmentTime } = parseDateTime(item?.assignmentTime);
  
      return (
        <Box style={styles.orderBox}>
          <Box style={styles.orderBoxContent}>
            <Box style={styles.orderHeader}>
              <Box style={styles.orderIdBox}>
                <Text style={styles.orderIdText}>Order #{item?.order?.orderId}</Text>
              </Box>
              <Box style={styles.orderDateBox}>
                <Text style={styles.orderDateText}>{orderDate}</Text>
              </Box>
            </Box>
            <Box style={styles.orderDetails}>
              <Box style={styles.orderAddress}>
                <Text style={styles.orderAddressText} numberOfLines={4}>
                  🏠 : {item?.order?.customerAddress?.houseNo ? `H-${item?.order?.customerAddress?.houseNo}` : ''}
                  {item?.order?.customerAddress?.flatNo ? `, F-${item?.order?.customerAddress?.flatNo},` : ''}
                  {item?.order?.customerAddress?.addressLine1}
                </Text>
                <Text style={styles.orderLocationText}>📍 : {item?.order?.customerAddress?.city?.cityName.toUpperCase()} , {item?.order?.customerAddress?.city?.countryId?.countryName.toUpperCase()}</Text>
                <Text style={styles.orderTimeText}>🕧 : {orderTime}</Text>
              </Box>
              <Box style={styles.orderActions}>
                <TouchableOpacity style={styles.rejectButton} onPress={() => handleRejectOrder(item?.orderAssignmentId)}>
                  <Box style={styles.rejectButtonBox}>
                    <Text style={styles.rejectButtonText}>Reject</Text>
                  </Box>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptOrder(item.orderAssignmentId)}>
                  <Box style={styles.acceptButtonBox}>
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      );
}

const styles = StyleSheet.create({
    orderBox: {
      backgroundColor: 'white',
      borderWidth: 0.17,
      borderColor: color.primary,
      width: '90%',
      marginBottom: 15,
      borderRadius: 20,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    orderBoxContent: {
      padding: 10,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    orderIdBox: {
      backgroundColor: color.primary,
      padding: 5,
      width: '30%',
      borderRadius: 15,
    },
    orderIdText: {
      color: 'white',
      fontWeight: 'bold',
      paddingLeft: 5,
    },
    orderDateBox: {
      padding: 5,
    },
    orderDateText: {
      color: 'black',
      fontWeight: 'bold',
    },
    orderDetails: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      marginTop: 20,
    },
    orderAddress: {
      justifyContent: 'space-around',
      width: '100%',
      gap: 10,
    },
    orderAddressText: {
      color: 'black',
      fontWeight: 'bold',
      width: '95%',
    },
    orderLocationText: {
      color: 'black',
      fontWeight: 'bold',
    },
    orderTimeText: {
      color: 'black',
      fontWeight: 'bold',
    },
    orderActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20,
      width: '100%',
    },
    rejectButton: {
      width: '40%',
    },
    rejectButtonBox: {
      backgroundColor: 'rgba(249, 84, 74, 1)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
      borderRadius: 20,
    },
    rejectButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    acceptButton: {
      width: '40%',
    },
    acceptButtonBox: {
      backgroundColor: color.primary,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10,
      borderRadius: 20,
    },
    acceptButtonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  