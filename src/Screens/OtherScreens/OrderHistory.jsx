import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useCallback, useState } from "react";
import { OrderHistoryContext } from "../../Context/OrderContext";
import color from "../../Contants/color";
import HomeRecentOrder from "../../Components/HomeRecentOrder";
import { Box } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from "react-native-gesture-handler";

const OrderHistory = () => {
    const [refreshing, setRefreshing] = useState(false)
    const {
        orderItems,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,


    } = useContext(OrderHistoryContext);

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    useFocusEffect(
        useCallback(() => {
            refetch()
        }, [orderItems])
    );

    const renderOrderItem = ({ item }) => {
        return <HomeRecentOrder item={item} />;
    };

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
            refetch()
            setRefreshing(false)
        }, 500)
    }


    return (
        <Box py={2} bg={'white'}>
            <FlatList
                data={orderItems}
                renderItem={renderOrderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatList}
                onEndReached={loadMore}
                onEndReachedThreshold={0.8}
                scrollEventThrottle={20}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <ActivityIndicator style={styles.loader} color={color.primary} size={'large'} />
                    ) : null
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[color.primary]} />
                }
            />

        </Box>
    );


}






export default OrderHistory

const styles = StyleSheet.create({})