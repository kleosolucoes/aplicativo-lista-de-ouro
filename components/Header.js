import { Header, Title, Left, Body, Right, Fab, Button } from 'native-base'

import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native';

import { black, white, blue, } from '../helpers/colors'
import { Icon } from 'react-native-elements';

import React from 'react';

const HeaderComponent = ({ onPress, icon }) => (
    <Header style={styles.header} iosBarStyle="light-content">
        <Left style={{ flex: 0 }}>
            <TouchableOpacity
                style={{ backgroundColor: 'transparent', margin: 0, borderWidth: 0, paddingHorizontal: 8 }}
                onPress={onPress}>
                <Icon type="font-awesome" name={icon} color={white} />
            </TouchableOpacity>
        </Left>
        <Body style={{ flex: 1 }}>
            <Title style={styles.title}>CHURCH PRO</Title>
        </Body>
        <Right style={{ flex: 0 }}>
            <View style={{ width: 45 }} />
        </Right>
    </Header>
);

export default HeaderComponent;

const styles = StyleSheet.create({
    header: {
        backgroundColor: black, borderBottomWidth: 0,
        paddingTop: Platform.OS === 'ios' ? 10 : 0,
        paddingLeft: 10
    },
    title: {
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: "center",
        color: white,
        fontWeight: '200',
        fontSize: 16
    }
})



