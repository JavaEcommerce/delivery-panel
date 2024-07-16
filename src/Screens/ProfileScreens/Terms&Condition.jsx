import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, Box, Accordion, Text, Button, ScrollView } from 'native-base';
import color from '../../Contants/color';
import typography from '../../Contants/fonts';

const TermsAndCondition = () => {

    const dataArray = [
        { title: "Introduction", content: "Welcome to the Delivery Boy Panel. By using our app, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this application. If you disagree with any part of these terms and conditions, please do not use our application." },
        { title: "Definitions", content: "Company: Refers to the company operating the delivery services.\nDelivery Boy: Refers to the individual using this application to perform delivery tasks." },
        { title: "Use of the Application", content: "The application is intended for use by authorized delivery personnel only. Unauthorized use is strictly prohibited and may result in suspension or termination of access." },
        { title: "Responsibilities", content: "As a delivery boy, you are responsible for the timely and safe delivery of goods as assigned. You must comply with all applicable laws and company policies while performing your duties." },
        { title: "Payment", content: "Payment for deliveries will be processed as per the company's payment schedule. Any disputes regarding payment must be raised with the company immediately." },
        { title: "Termination", content: "The company reserves the right to terminate your access to the application at any time, with or without cause, and without notice." },
        { title: "Amendments", content: "The company may amend these terms and conditions at any time. Any changes will be posted within the application, and continued use of the application constitutes acceptance of the amended terms." }
    ];

    return (
        <>
            <ScrollView>
                <Box py={5} alignItems={"center"} flex={1} bg={'white'}>
                    <Box w={'90%'}>
                        <Accordion index={[0]} allowMultiple>
                            {dataArray.map((item, index) => (
                                <Accordion.Item key={index}>
                                    <Accordion.Summary style={{ backgroundColor: color.primary }}>
                                        <Text fontWeight={typography.bold.fontWeight} fontSize={typography.mainHeading.fontSize} color={'white'}>{item.title}</Text>
                                    </Accordion.Summary>
                                    <Accordion.Details>
                                        <Text py={2}>{item.content}</Text>
                                    </Accordion.Details>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Box>
                </Box>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        alignSelf: 'center',
        marginTop: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 10,
    }
});

export default TermsAndCondition;
