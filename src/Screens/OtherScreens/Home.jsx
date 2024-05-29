import React, { useContext } from 'react';
import { StyleSheet ,ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ActiveStatus from '../../Components/ActiveStatus';
import HomeProfileCard from '../../Components/HomeProfileCard';
import HomeRecentOrder from '../../Components/HomeRecentOrder';
import { useProfile } from '../../Context/ProfileContext';
import { ScrollView, Skeleton, Text, View, FlatList} from 'native-base';
import { OrderHistoryContext } from '../../Context/OrderContext';
import color from '../../Contants/color';

export default function Home({ navigation }) {
  const { profileData, loading,error } = useProfile();
  const {orderItems} = useContext(OrderHistoryContext);

  const renderOrderItem = ({ item }) => {
    return <HomeRecentOrder item={item} />;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (loading) {
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

  if (profileData) {
    const displayedOrderItems = orderItems.slice(0, 5)
    return (
      <SafeAreaView style={styles.container}>
        <ActiveStatus profile={profileData} />
        <HomeProfileCard navigation={navigation} profileData={profileData} isHomeNavigated={true} />
        <Text style={styles.recentOrdersTitle}>Recent Orders</Text>
        <FlatList
          data={displayedOrderItems}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          style={styles.flatList}/>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  flatList: {
    width: '100%',
    height: '100%',
    marginBottom: -20
  },
  recentOrdersTitle: {
    fontWeight: '700',
    paddingTop: 30,
    marginBottom: 10,
    fontSize: 24,
    textAlign: 'left',
    width: '90%'
  },
});
