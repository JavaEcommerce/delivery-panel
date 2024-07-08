import React, { useState, useRef } from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import { Button, Image, FlatList, View, Text, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import ROUTES from '../../Contants/routes';
import color from '../../Contants/color';
const onboardingData = [
    {
        key: '1',
        title: `Let's Work Together`,
        description: 'Join us in delivering happiness. Together, we’ll make every delivery a success.',
        image: require('../../Assets/onboarding2.png'),
    },
    {
        key: '2',
        title: 'Navigate Like a Pro',
        description: 'Master the routes and ensure timely deliveries. Your journey to excellence starts here.',
        image: require('../../Assets/onboarding1.png'),
    },
    {
        key: '3',
        title: 'Customer Satisfaction',
        description: 'Prioritize customer satisfaction by accurate deliveries. Happy customers, happy you!',
        image: require('../../Assets/onboarding7.png'),
    },
    {
        key: '4',
        title: 'Earn Rewards',
        description: 'Earn rewards and incentives for your exceptional delivery performance. The more you deliver, the more you earn.',
        image: require('../../Assets/onboarding6.png'),
    },
];


const { width } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const renderIndicators = () => (
        <View style={styles.indicatorContainer}>
            {onboardingData.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.indicator,
                        index === currentIndex ? styles.activeIndicator : styles.inactiveIndicator,
                    ]}
                />
            ))}
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image
                h={400}
                alt='img'
                source={item.image}
                resizeMode='contain'
                style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <>
        <LinearGradient
            colors={['#9ACA00', '#C2DF66', '#ffff']}
            style={styles.container}
        >
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                onScroll={(e) => {
                    const index = Math.floor(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />
            {renderIndicators()}
            <View justifyContent={'space-between'}  m={10} flexDir={'row'} borderRadius={15} borderWidth={1} borderColor={color.primary}>
                <Pressable p={2} justifyContent={'center'} alignItems={'center'} onPress={() => navigation.navigate(ROUTES.REGISTER)} w={'40%'} borderRadius={15} bg={color.primary}>
                    <Text fontSize={18} fontWeight={'semibold'} color={'white'}>Sign Up</Text>
                </Pressable>
                <Pressable justifyContent={'center'} alignItems={'center'} onPress={() => navigation.navigate(ROUTES.LOGIN)} w={'40%'} borderRadius={15}>
                    <Text fontSize={18} fontWeight={'semibold'} color={color.primary}>Log In</Text>
                </Pressable>
            </View>
        </LinearGradient></>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    itemContainer: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        paddingTop: 20,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#6B8D00',
    },
    description: {
        color: '#666666',
        fontWeight:'500',
        width:'80%',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeIndicator: {
        backgroundColor: color.primary,
    },
    inactiveIndicator: {
        backgroundColor: '#b2b2b2',
    },
});

export default Onboarding;
