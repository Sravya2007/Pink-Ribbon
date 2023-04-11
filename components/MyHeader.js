import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome } from '@expo/vector-icons';

export default class MyHeader extends React.Component {
    render() {
        return(
            <Header
            leftComponent={<FontAwesome name='bars' color='#fff' size={RFValue(30)}
            onPress={() => this.props.navigation.toggleDrawer()}
            />}
            backgroundColor="#a60545"
            centerComponent={{ text: "Pink Ribbon", style: {color: '#ffffff', fontSize: RFValue(30), fontWeight:"bold"} }}/>
        )
    }
}