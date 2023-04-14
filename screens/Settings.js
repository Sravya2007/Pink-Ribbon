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
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      Name: '',
      DOB: '',
      email: firebase.auth().currentUser.email,
      isDatePickerVisible: false
    }
  }

getUserDetails = () =>{
  var email = this.state.email;
  const currentUser = firebase.auth().currentUser;
  db.collection('users').doc(currentUser.uid).get().then((doc) => {
    if (doc.exists) {
        this.setState({
            email: doc.data().email,
            Name: doc.data().Name,
            DOB: doc.data().DOB
          })
    } else {
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

save = () =>{
const currentUser = firebase.auth().currentUser;
  db.collection('users').doc(currentUser.uid)
  .update({
    "Name": this.state.Name,
    "DOB": this.state.DOB,
    "email": this.state.email
  })
  Alert.alert("Your profile was updated successfully!")
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

componentDidMount() {
  this.getUserDetails();
}

render() {
  return(
    <View style = {styles.container}>
      <MyHeader navigation = {this.props.navigation}/>
      <Input
      leftIcon = {<FontAwesome name='user' color='#a60545' size={RFValue(25)} style = {{marginLeft: RFValue(5)}}/>}
      containerStyle = {{marginTop: 15}}
      placeholder = 'Name'
      placeholderTextColor = '#a60545'
      label = 'Name'
      labelStyle = {{fontSize: RFValue(20), color: '#a60545'}}
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
      onChangeText = {(text)=>{
      this.setState({
        Name: text
      })
      }}
      value = {this.state.Name}
      />
      <Text style={styles.label}>DOB</Text>
      <TextInput
        placeholder="DOB"
        placeholderTextColor="#000"
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
        <Text style = {styles.buttonText}>Change DOB</Text>
        </TouchableOpacity>
        <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible}
        mode="date"
        onConfirm={this.handleDateConfirm}
        onCancel={this.hideDatePicker}
        />
      <Input
      leftIcon = {<FontAwesome name='envelope-o' color='#a60545' size={RFValue(25)} style = {{marginLeft: RFValue(5)}}/>}
      containerStyle = {{marginTop: 15}}
      placeholder = 'email'
      placeholderTextColor = '#a60545'
      label = 'email address'
      labelStyle = {{fontSize: RFValue(20), color: '#a60545'}}
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
      onChangeText = {(text)=>{
      this.setState({
        email: text
      })
      }}
      value = {this.state.email}
      />
      <TouchableOpacity
      style = {styles.button}
      onPress = {() => {
        this.save()
      }}>
        <Text style = {styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress = {() => {
        firebase.auth().signOut().then(() => {
            this.props.navigation.navigate('SignUp')
          }).catch((error) => {
            console.log(error)
          });
      }}
      style = {styles.button}>
        <Text style = {styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f8acc6'
},
buttonText: {
  color: '#fff',
  fontSize: RFValue(18),
  fontWeight: 'bold',
  alignSelf: 'center'
},
button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
    height: 50,
    backgroundColor: '#eb4a8b',
    marginTop: 20,
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
label: {
  fontSize: RFValue(20),
  fontWeight: 'bold',
  marginLeft: RFValue(10),
  color: '#a60545'
}
})
