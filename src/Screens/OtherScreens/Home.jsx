import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActiveStatus from '../../Components/ActiveStatus';
import HomeProfileCard from '../../Components/HomeProfileCard';
import HomeRecentOrder from '../../Components/HomeRecentOrder';
import axios from 'axios';
import { useProfile } from '../../Context/ProfileContext';
import { ScrollView, Skeleton,Text,View, FlatList } from 'native-base';
import { apiBaseUrl, getProfileById } from '../../Contants/api';
export default function Home({ navigation }) {
  const { profileData, loading, error } = useProfile();

  const recentOrders = [
    {
      id: '1',
      status: 'Delivered',
      address: '123 Main Street',
      timestamp: '10:00 AM',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      status: 'Pending',
      address: '456 Elm Street',
      timestamp: '11:30 AM',
      paymentMethod: 'Cash On Delivery'
    },
    {
      id: '3',
      status: 'Cancelled',
      address: '789 Oak Street',
      timestamp: '1:00 PM',
      paymentMethod: 'PayPal'
    },
    {
      id: '4',
      status: 'Delivered',
      address: '101 Maple Avenue',
      timestamp: '2:30 PM',
      paymentMethod: 'Credit Card'
    },
  ];

  // const fetchProfileData = async () => {
  //   try {
  //     const response = await axios.get(`${apiBaseUrl}${getProfileById}3`);
  //     setProfileData(response.data);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchProfileData();
  // }, []);

  const renderOrderItem = ({ item }) => {
    return <HomeRecentOrder item={item} />;
  };






  if (error) {
    return (
      <View style={styles.container}>
        <Text> Error: {error}</Text>
      </View>   
    );
  }

  if (!loading) {
    return (
      <SafeAreaView style={styles.container}>
        {profileData && <ActiveStatus profile={profileData} />}
        {profileData && <HomeProfileCard navigation={navigation} profile={profileData} isHomeNavigated={true} />}
        <Text style={{ fontWeight: '700',paddingTop:30, marginBottom: 10, fontSize: 24, textAlign: 'left', width: '90%' }}>Recent Orders</Text>
        <FlatList
          data={recentOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          style={styles.flatList}
        />
      </SafeAreaView>
    );

  } else {
    return (
      <SafeAreaView style={{ alignItems: 'center', height: '100%', gap: 20, backgroundColor: 'white' }}>

        <View style={{ width: '90%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Skeleton height={50} width="30%" borderRadius={20} />
          <Skeleton height={50} width="30%" borderRadius={20} />
        </View>
        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row' }}>
          <Skeleton height={200} width="100%" borderRadius={20} />
        </View>
        <View style={{ width: '90%', gap: 20 }}>

          <Skeleton height={50} width="50%" borderRadius={20} />
          <ScrollView style={{ width: '100%', height: '100%' }}>
            <Skeleton h={20} width="100%" borderRadius={20} />
            <Skeleton h={20} width="100%" mt={3} borderRadius={20} />
            <Skeleton h={20} width="100%" mt={3} borderRadius={20} />
            <Skeleton h={20} width="100%" mt={3} borderRadius={20} />
            <Skeleton h={20} width="100%" mt={3} borderRadius={20} />

          </ScrollView>
        </View>

      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    // color:'red'
  },
  flatList: {
    width: '100%',
    height: '100%',
    marginBottom: -20
  },
  orderItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
