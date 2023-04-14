import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { Input } from '@rneui/base';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { RFValue } from 'react-native-responsive-fontsize';
import { FontAwesome } from '@expo/vector-icons';

export default class Prevention extends React.Component {

    render() {
        return (
            <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#eb4a8b" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <ScrollView style = {{width: '100%', marginTop: 80}}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {styles.heading}>HEALTHY LIFESTYLE</Text>
                        <Text style = {styles.text}>● Healthy lifestyle choices are linked to a lower risk of some cancers and other health conditions such as heart disease, diabetes and osteoporosis.</Text>
                        <Text style = {styles.text}>● Being physically active, achieving and maintaining a healthy weight, limiting alcohol and to a lesser degree, eating fruits and vegetables and not smoking are linked to a lower risk of breast cancer.</Text>
                        <Text style = {styles.text}>● Research shows organic foods are no more nutritious or better for you than foods farmed by conventional methods. Some people prefer to eat organic foods. However, people who eat organic meat, dairy, fruits and vegetables do not appear to have a lower risk of breast cancer than people who don’t eat organic foods.</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8acc6'
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: RFValue(20),
        left: 0,
        margin: RFValue(16)
    },
    backText: {
        marginLeft: RFValue(8),
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: '#eb4a8b'
    },
    heading: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: '#ed127c'
    },
    text: {
        fontSize: RFValue(18),
        marginTop: RFValue(10),
        color: '#a60545'
    }
})