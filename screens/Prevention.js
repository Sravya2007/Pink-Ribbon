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
                        <Text style = {styles.heading}>PREVENTIVE CARE</Text>
                        <Text style = {styles.text}>If you're concerned about developing breast cancer, you might be wondering if there are steps you can take to help prevent breast cancer. Some risk factors, such as family history, can't be changed. However, there are lifestyle changes you can make to lower your risk.</Text>
                        <Text style = {styles.text}>Research shows that lifestyle changes can decrease the risk of breast cancer, even in women at high risk. To lower your risk:</Text>
                        <View>
                        <Text style={styles.text}>● Do regular Breast Self Examination (BSE): It is one of the clinically proven ways to detect breast cancer at an early stage. For women who have periods, it must be done on the seventh day of their period. For women who do not have periods, it must be done on a fixed day of each month. Otherwise you may get inaccurate results. Our app helps you to perform the breast self examination the right way and analyse your results! Please consult a doctor/gynecologist about BSE too.</Text>
                        <Text style={styles.text}>● Limit alcohol: The more alcohol you drink, the greater your risk of developing breast cancer. The general recommendation — based on research on the effect of alcohol on breast cancer risk — is to limit yourself to no more than one drink a day, as even small amounts increase risk.</Text>
                        <Text style={styles.text}>● Maintain a healthy weight: If your weight is healthy, work to maintain that weight. If you need to lose weight, ask your doctor about healthy strategies to accomplish this. Reduce the number of calories you eat each day and slowly increase the amount of exercise.</Text>
                        <Text style={styles.text}>● Be physically active: Physical activity can help you maintain a healthy weight, which helps prevent breast cancer. Most healthy adults should aim for at least 150 minutes a week of moderate aerobic activity or 75 minutes of vigorous aerobic activity weekly, plus strength training at least twice a week.</Text>
                        <Text style={styles.text}>● Breast-feed: Breast-feeding might play a role in breast cancer prevention. The longer you breast-feed, the greater the protective effect.</Text>
                        <Text style={styles.text}>● Limit postmenopausal hormone therapy: Combination hormone therapy may increase the risk of breast cancer. Talk with your doctor about the risks and benefits of hormone therapy. You might be able to manage your symptoms with non hormonal therapies and medications. If you decide that the benefits of short-term hormone therapy outweigh the risks, use the lowest dose that works for you and continue to have your doctor monitor the length of time you're taking hormones.</Text>
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
    }
})