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
import { WebView } from 'react-native-webview';

export default class Testimonials extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={24} color="#eb4a8b" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri:
                    'https://drive.google.com/file/d/1cObdreIgqTBRbLDjeA_xL2_t4qgDXnPj/preview',
                }}
              />
            </View>
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri:
                    'https://drive.google.com/file/d/1St3J9K5NPYWOLClYPhaBBifaej8FYka4/preview',
                }}
              />
            </View>
            <View style={styles.videoContainer}>
              <WebView
                source={{
                  uri:
                    'https://drive.google.com/file/d/1aB1u9VO825wC5oHm2LwXM62_puk0Lav3/preview',
                }}
              />
            </View>
          </ScrollView>
        </View>
      );
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
    scrollView: {
      width: '100%',
      marginTop: 100
    },
    videoContainer: {
      width: '100%',
      height: RFValue(200),
      marginTop: RFValue(16),
    },
  });