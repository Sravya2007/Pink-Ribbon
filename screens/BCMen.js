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
                        <Text style = {styles.heading}>BREAST CANCER IN MEN</Text>
                        <Image source={require('../assets/anatomy/BCMen1.png')} style={styles.image} />
                        <Text style = {styles.text}>Although it is rare, men can get breast cancer. Breast cancer is most often found in women, but men can get breast cancer too.</Text>
                        <Text style = {styles.text}>The most common kinds of breast cancer in men are the same kinds in women—</Text>
                        <View>
                        <Text style={styles.text}>● Invasive ductal carcinoma: The cancer cells begin in the ducts and then grow outside the ducts into other parts of the breast tissue. Invasive cancer cells can also spread, or metastasize, to other parts of the body.</Text>
                        <Text style={styles.text}>● Invasive lobular carcinoma: Cancer cells begin in the lobules and then spread from the lobules to the breast tissues that are close by. These invasive cancer cells can also spread to other parts of the body.</Text>
                        <Text style={styles.text}>● Ductal carcinoma in situ (DCIS): It is a breast disease that may lead to invasive breast cancer. The cancer cells are only in the lining of the ducts, and have not spread to other tissues in the breast.</Text>
                        </View>
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
    },
    image: {
        width: RFValue(300),
        height: RFValue(200)
    }
})