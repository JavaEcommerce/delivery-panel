import { StyleSheet, FlatList ,ActivityIndicator} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { OrderHistoryContext } from "../../Context/OrderContext";
import color from "../../Contants/color";
import { ScrollView } from "react-native-gesture-handler";
import HomeRecentOrder from "../../Components/HomeRecentOrder";
import { Box } from "native-base";
const OrderHistory = () => {
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

    const renderOrderItem = ({ item }) => {
        return <HomeRecentOrder item={item} />;
    };


    return (
        <Box py={2} bg={'white'}>
            <FlatList
                data={orderItems}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id}
                style={styles.flatList}
                onEndReached={loadMore}
                onEndReachedThreshold={0.8}
                scrollEventThrottle={20}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <ActivityIndicator style={styles.loader} color={color.primary} size={'large'} />
                    ) : null
                }
            />

        </Box>
    );


}






export default OrderHistory

const styles = StyleSheet.create({})