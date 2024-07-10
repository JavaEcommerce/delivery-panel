import React, { useContext, useCallback, useState,useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Box } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderHistoryContext } from "../../Context/OrderContext";
import color from "../../Contants/color";
import HomeRecentOrder from "../../Components/HomeRecentOrder";

const OrderHistory = () => {
    const [refreshing, setRefreshing] = useState(false);
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

    const saveData = async () => {
        try {
            const jsonValue = JSON.stringify(orderItems);
            await AsyncStorage.setItem('orderItems', jsonValue);
        } catch (e) {
            console.log("Error saving data to AsyncStorage:", e);
        }
    };

    
    const saveDataCallback = useCallback(saveData, [orderItems]);

    useEffect(() => {
        saveDataCallback();
    }, [orderItems, saveDataCallback]);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            refetch();
            setRefreshing(false);
        }, 500);
    };


    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };


    const renderOrderItem = ({ item }) => {
        return <HomeRecentOrder item={item} />;
    };

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    return (
        <Box py={2} bg={'white'} h={"100%"} >
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
};

export default OrderHistory;

const styles = StyleSheet.create({
    flatList: {
        // Your styles here
    },
    loader: {
        // Loader styles
    },
});
