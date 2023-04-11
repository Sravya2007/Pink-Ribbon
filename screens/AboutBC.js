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

export default class AboutBC extends React.Component {

    render() {
        return (
            <View style = {styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#eb4a8b" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <ScrollView style = {{width: '100%', marginTop: 80}}>
                    <View style = {{alignItems: 'center'}}>
                        <Text style = {styles.heading}>WHAT IS BREAST CANCER?</Text>
                        <Text style = {styles.text}>Breast cancer is a disease in which cells in the breast grow out of control. It is the most common type of cancer worldwide.</Text>
                        <Text style = {styles.text}>Breast cancer can begin in different parts of the breast. A breast is made up of three main parts: lobules, ducts, and connective tissue. The lobules are the glands that produce milk. The ducts are tubes that carry milk to the nipple. The connective tissue (which consists of fibrous and fatty tissue) surrounds and holds everything together. Most breast cancers begin in the ducts or lobules. Breast cancer can spread outside the breast through lymph and blood vessels.</Text>
                        <Text style = {{...styles.heading, marginTop: RFValue(10)}}>WHAT ARE THE SYMPTOMS?</Text>
                        <View>
                        <Text style={styles.text}>● A breast lump/thickening that feels different from surrounding tissue.</Text>
                        <Text style={styles.text}>● Change in size, shape or appearance.</Text>
                        <Text style={styles.text}>● Changes to skin over the breast, such as dimpling.</Text>
                        <Text style={styles.text}>● A newly inverted nipple.</Text>
                        <Text style={styles.text}>● Peeling, scaling, crusting or flaking of the pigmented area of skin surrounding the nipple (areola) or breast skin.</Text>
                        <Text style={styles.text}>● Redness or pitting of skin over the breast, like the skin of an orange.</Text>
                        <Text style={styles.text}>● Secretion of a new fluid.</Text>
                        <Text style={styles.text}>● A new vein popping out.</Text>
                        </View>
                        <Text style = {styles.heading}>REMOVING FEAR</Text>
                        <Text style = {styles.text}>Thinking “breast cancer won’t happen to me” is a risk no woman should take. It is our life and no one can protect it better than us. Thus, it is important for every woman to be armed with basic knowledge of signs, symptoms, risk factors and screening for early diagnosis of disease.</Text>
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