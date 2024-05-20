import React from 'react';
import { NativeBaseProvider, Box, Accordion, Text } from 'native-base';
import color from '../../Contants/color';
export default TermsAndCondition = () => {

    const dataArray = [
        { title: "First Elements...??", content: "Lorem ipsum dolor sit amet" },
        { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
    ];

    return (
        <Box py={5} alignItems={"center"} flex={1} bg={'white'}>
            <Box w={'90%'}>
                <Accordion index={[0]} allowMultiple>
                    {dataArray.map((item, index) => (
                        <Accordion.Item key={index}>
                            <Accordion.Summary style={{ backgroundColor: color.primary }}>
                                <Text fontWeight={'bold'} fontSize="lg" color={'white'}>{item.title}</Text>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Text py={2}>{item.content}</Text>
                            </Accordion.Details>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Box>
        </Box>
    );
};

