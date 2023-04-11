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

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ width: '100%' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Testimonials')}
                    >
                        <Text style={styles.buttonText}>Testimonials</Text>
                        <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('AboutBC')}
                    >
                        <Text style={styles.buttonText}>About Breast Cancer</Text>
                        <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Prevention')}
                    >
                        <Text style={styles.buttonText}>Preventive Care</Text>
                        <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Lifestyle')}
                    >
                        <Text style={styles.buttonText}>Healthy lifestyle</Text>
                        <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('BCMen')}
                    >
                        <Text style={styles.buttonText}>Breast Cancer in Men</Text>
                        <FontAwesome name="angle-right" size={24} color="white" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8acc6'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: RFValue(100),
        backgroundColor: '#eb4a8b',
        margin: 10,
        paddingHorizontal: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: RFValue(18),
        fontWeight: 'bold',
    }
});