import React from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input } from '@rneui/base';
import { FontAwesome } from '@expo/vector-icons';

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            name: '',
            DOB: '',
            isModalVisible:'false',
            isDatePickerVisible: false
        }
    }

    signUp = (email, password, confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("Your password does not match.\nPlease check your password.")
        } else {
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            db.collection(`users`).doc(user.uid).set({
              Name: this.state.name,
              DOB: this.state.DOB,
              email: this.state.email
            })
            Alert.alert('You successfully registered!')
            this.setState({ isModalVisible: 'false' });
          })
          .catch((error) => {
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
          }
    }

    login = (email, password) =>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.props.navigation.navigate('Questionnaire')
        })
        .catch((error)=> {
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    resetPassword = (email) =>{
      firebase.auth().sendPasswordResetEmail(email)
      .then(()=>{
        return  Alert.alert('Email sent to your inbox', 'If you did not receive it please check in spam or junk.');
      })
      .catch((error)=> {
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      })
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };
  
  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  } 

  handleDateConfirm = (date) => {
    date = date.toISOString()
    this.setState({
      DOB: this.formatDate(date),
      isDatePickerVisible: false,
    });
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      this.signUp(this.state.email, this.state.password, this.state.confirmPassword)
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  }

  validateForm = () => {
    const { name, DOB } = this.state;
    return name.trim() !== '' && DOB.trim() !== '';
  }

    showModal = () =>{
        return (
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.isModalVisible}>
                <ScrollView style = {{flex: 1, backgroundColor: '#d8c3d1'}}>
                <FontAwesome
                  name="times"
                  size={RFValue(30)}
                  color="#a60545"
                  style = {{marginLeft: 340, marginTop: 50}}
                  onPress = {() =>{
                    this.setState({
                      isModalVisible: false
                    })
                  }}/>

                    <Text style = {styles.title}>Sign Up</Text>
                    <Input
                    placeholder='Name'
                    placeholderTextColor='#a60545'
                    inputContainerStyle={{
                      borderWidth: 0,
                      borderBottomWidth: 0,
                      borderRadius: RFValue(10),
                      backgroundColor: '#f5eaf2',
                    }}
                    inputStyle={{
                      fontSize: RFValue(20),
                      color: '#a60545',
                      marginLeft: RFValue(5)
                    }}
                    onChangeText={(text) => {
                      this.setState({
                        name: text
                      })
                    }}
                  />
                  <Input
                  placeholder = 'email address'
                  placeholderTextColor = '#a60545'
                  inputContainerStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    borderRadius: RFValue(10),
                    backgroundColor: '#f5eaf2',
                  }}
                  inputStyle={{
                    fontSize: RFValue(20),
                    color: '#a60545',
                    marginLeft: RFValue(5)
                  }}
                  keyboardType = {"email-address"}
                  onChangeText = {(text)=>{
                    this.setState({
                      email: text
                    })
                  }}/>
                  <View>
                  <TextInput
                    placeholder="DOB"
                    placeholderTextColor="#a60545"
                    style={{
                      fontSize: RFValue(20),
                      color: "#a60545",
                      borderWidth: 1,
                      backgroundColor: "#fff",
                      paddingHorizontal: RFValue(10),
                      paddingVertical: RFValue(5),
                      margin: 10,
                      opacity: 0.5,
                      borderRadius: RFValue(10),
                      borderWidth: 0,
                      borderBottomWidth: 0,
                    }}
                    value={this.state.DOB}
                    editable={false}
                  />
                  <TouchableOpacity onPress={this.showDatePicker}
                  style={{
                    ...styles.button,
                    marginTop: 0,
                    marginBottom: 10
                  }}>
                    <Text style = {styles.buttonText}>Select DOB</Text>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={this.state.isDatePickerVisible}
                    mode="date"
                    onConfirm={this.handleDateConfirm}
                    onCancel={this.hideDatePicker}
                  />
                </View>
                  <Input
                  placeholder = 'Password'
                  placeholderTextColor = '#a60545'
                  inputContainerStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    borderRadius: RFValue(10),
                    backgroundColor: '#f5eaf2',
                  }}
                  inputStyle={{
                    fontSize: RFValue(20),
                    color: '#a60545',
                    marginLeft: RFValue(5)
                  }}
                  secureTextEntry = {true}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}/>
                  <Input
                  placeholder = 'Confirm Password'
                  placeholderTextColor = '#a60545'
                  inputContainerStyle={{
                    borderWidth: 0,
                    borderBottomWidth: 0,
                    borderRadius: RFValue(10),
                    backgroundColor: '#f5eaf2',
                  }}
                  inputStyle={{
                    fontSize: RFValue(20),
                    color: '#a60545',
                    marginLeft: RFValue(5)
                  }}
                  secureTextEntry = {true}
                  onChangeText = {(text)=>{
                    this.setState({
                      confirmPassword: text
                    })
                  }}/>
                  <TouchableOpacity
                  style = {styles.button}
                  onPress = {() =>{
                    this.handleSubmit()
                  }}>
                    <Text style = {styles.buttonText}>REGISTER</Text>
                  </TouchableOpacity>
                </ScrollView>
            </Modal>
          );
    }

    render() {
        return(
          <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView style = {{flex: 1, marginTop:45, backgroundColor: '#d8c3d1'}}>
              {this.showModal()}
              <Image
              source = {require('../assets/icon.png')}
              style = {styles.image}/>
              <Input
                  containerStyle = {{width: RFValue(350)}}
                  leftIcon = {<FontAwesome name='envelope-o' color='#a60545' size={RFValue(25)}/>}
                  inputStyle = {{fontSize: RFValue(23), color: '#a60545'}}
                  inputContainerStyle = {{borderColor: '#a60545', borderBottomWidth: 1.5}}
                  keyboardType="email-address"
                  label = 'email address'
                  labelStyle = {{fontSize: RFValue(20), color: '#a60545'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      email: text
                    })
                  }}
                />

                <Input
                  containerStyle = {{marginTop: 15, width: RFValue(350)}}
                  leftIcon = {<FontAwesome name='lock' color='#a60545' size={RFValue(30)}/>}
                  inputStyle = {{fontSize: RFValue(23), color: '#a60545'}}
                  inputContainerStyle = {{borderColor: '#a60545', borderBottomWidth: 1.5}}
                  secureTextEntry = {true}
                  label = 'Password'
                  labelStyle = {{fontSize: RFValue(20), color: '#a60545'}}
                  onChangeText = {(text)=>{
                    this.setState({
                      password: text
                    })
                  }}
                />
              

              <TouchableOpacity
              style = {styles.button}
              onPress = {() => {
                this.login(this.state.email, this.state.password)
              }}>
                <Text style = {styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style = {styles.button}
              onPress = {() => this.setState({
                isModalVisible: true
              })}>
                <Text style = {styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
                <TouchableOpacity
                onPress = {() => {
                  this.resetPassword(this.state.email)
                }}
                style = {{alignItems: 'center', marginTop: 20, color: '#000'}}>
                <Text style = {{
                  color: '#ed127c',
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  alignSelf: 'center'
                }}>I FORGOT MY PASSWORD</Text>
              </TouchableOpacity>
              </ScrollView>
              </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
  image: {
    width: RFValue(370),
    height: RFValue(270),
    alignSelf: 'center'
  },
  title: {
    fontSize: RFValue(40),
    color: '#a60545',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: RFValue(10)
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: RFValue(300),
    height: RFValue(50),
    backgroundColor: '#a60545',
    marginTop: RFValue(20),
    borderRadius: RFValue(25),
    shadowColor: '#000',
    shadowOffset: {
      width: RFValue(0),
      height: RFValue(3),
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: RFValue(18),
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})