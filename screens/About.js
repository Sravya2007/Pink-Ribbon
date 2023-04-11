import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, Linking } from 'react-native';
import { Input } from '@rneui/base';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome } from '@expo/vector-icons';

export default class About extends React.Component {

    handleLinkPress = () => {
        Linking.openURL('http://www.indiancancersocietybangalore.org/');
      };

    render() {
        return (
            <View style = {styles.container}>
                <MyHeader navigation = {this.props.navigation}/>
                <Text style = {styles.text}>In Pink Ribbon, we empower women to foster collaborative thinking to further drive away the fear related to breast cancer. By closing the loop on any sexuality seen with breasts and by using our knowledge, we help women grow out of their fears, and nurture them instead, by bringing awareness about breast cancer.</Text>
                <Text style = {styles.text}>Thank you for supporting us by installing Pink Ribbon.</Text>
                <Text style = {{...styles.text, fontWeight:"bold"}}>Credits</Text>
                <Text style = {styles.text}>Thanks to all our team members and mentors for helping in developing this project.</Text>
                <Text style = {styles.text}>Special thanks to the Indian Cancer Society (<TouchableOpacity onPress = {() => {this.handleLinkPress()}}><Text style={styles.linkText}>http://www.indiancancersocietybangalore.org/</Text></TouchableOpacity>) for providing their valuable guidance and resources.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8acc6'
    },
    text: {
        marginTop: 30,
        fontSize: RFValue(18),
        color: '#a60545'
    },
    linkText: {
      color: 'blue',
      textDecorationLine: 'underline',
    }
})