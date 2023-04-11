import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing, Alert, Platform } from 'react-native';
import Constants from 'expo-constants';
import { Header, Icon } from 'react-native-elements';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question1Answer: null,
      question2Answer: null,
      question3Answer: null,
      currentQuestion: 1,
      slideAnimation: new Animated.Value(0),
      isDatePickerVisible: false,
      selectedDate: null,
      completedQuestionnaire: null
    };
  }

  handleQuestion1Answer = (answer) => {
    this.setState({ question1Answer: answer });
    if (answer === 'yes') {
      this.animateSlideOut(() => this.setState({ currentQuestion: 2 }));
    } else if (answer === 'no') {
      alert('You are not eligible for the breast self examination. You are being logged out.');
      firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('SignUp')
      })
      .catch((error) => {
        Alert.alert(error.message)
      });
    }
  }

  handleQuestion2Answer = (answer) => {
    const currentUser = firebase.auth().currentUser;
    this.animateSlideOut(() => this.setState({ question2Answer: answer, currentQuestion: 3 }));
    db.collection('users').doc(currentUser.uid).set({
      cancerHistory: answer
    }, { merge: true })
    .then(() => {
      console.log('Questionnaire data saved successfully!');
    })
    .catch((error) => {
      Alert.alert(error.message)
    });
  }

  handleQuestion3Answer = (answer) => {
    this.setState({ question3Answer: answer });
    if(answer === 'Regular') {
      Alert.alert('Alert', 'Breast self examination needs to be done exactly on the 7th day of your menses.')
    } else if(answer === 'Irregular') {
      Alert.alert('Alert', 'Breast self examination needs to be done on the 7th day of your next period.')
    } else if(answer === 'Stopped') {
      Alert.alert('Alert', "Breast self examination needs to be done on a fixed day of every month.")
    }
    this.animateSlideOut(() => this.setState({ currentQuestion: 'date' }));
  }

  handleBackButton = () => {
    const currentQuestion = this.state.currentQuestion;
    if (currentQuestion > 1) {
      this.animateSlideOut(() => this.setState({ currentQuestion: currentQuestion - 1 }));
    }
  }

  animateSlideOut = (callback) => {
    Animated.timing(this.state.slideAnimation, {
      toValue: -1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.state.slideAnimation.setValue(1);
      callback();
    });
  }

  handleConfirm = (date) => {
    const dateString = new Date(date);
    const day = dateString.getDate().toString().padStart(2, '0');
    const month = (dateString.getMonth() + 1).toString().padStart(2, '0');
    const year = dateString.getFullYear().toString();
    const fullThing =  `${day}/${month}/${year}`;
    this.setState({ isDatePickerVisible: false, selectedDate: fullThing });
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const userRef = db.collection("users").doc(currentUser.uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                    userRef.update({
                        selectedDate: fullThing,
                    }).catch((error) => {
                        Alert.alert(error.message);
                    });
                    this.props.navigation.navigate(('Drawer'))
            } else {
                Alert.alert("User not found");
            }
        }).catch((error) => {
            Alert.alert(error.message);
        });
    } else {
        Alert.alert("User not logged in");
    }
  };

  componentDidMount() {
    this.unsubscribeAuthStateChanged = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("users").doc(user.uid).get()
        .then((doc) => {
          const questionnaireData = doc.data();
          const hasCompletedQuestionnaire = questionnaireData.selectedDate && questionnaireData.cancerHistory !== null;
  
          if (hasCompletedQuestionnaire) {
            this.setState({ completedQuestionnaire: true });
            return this.props.navigation.navigate(('Drawer'))
          } else {
            this.setState({ completedQuestionnaire: false });
          }
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    }
  });
  }
  
  componentWillUnmount() {
    if (this.unsubscribeAuthStateChanged) {
      this.unsubscribeAuthStateChanged();
    }
  }

  render() {
    const { currentQuestion, slideAnimation, completedQuestionnaire } = this.state;

    const slideLeft = slideAnimation.interpolate({
      inputRange: [0, 5],
      outputRange: [0, RFValue(5)],
    });

    const slideRight = slideAnimation.interpolate({
      inputRange: [0, 5],
      outputRange: [0, RFValue(-5)],
    });
    if (completedQuestionnaire === false) {
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{
              text: "Pink Ribbon",
              style: {
                color: '#ffffff',
                fontSize: RFValue(30),
                fontWeight:"bold"
              }
            }}
            backgroundColor="#a60545"
          />
          {currentQuestion === 1 && (
          <Animated.View style={[styles.questionContainer, { transform: [{ translateX: slideLeft }] }]}>
            <Text style={styles.question}>Have you reached puberty?</Text>
            <View style = {{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'}}>
              <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion1Answer('yes')}>
              <Text style={styles.answerText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion1Answer('no')}>
                <Text style={styles.answerText}>No</Text>
              </TouchableOpacity>
            </View>
            
          </Animated.View>
        )}

      {currentQuestion === 2 && (
          <Animated.View style={[styles.questionContainer, { transform: [{ translateX: slideLeft }] }]}>
            <Text style={styles.question}>Does anyone in your family have a history of breast cancer?</Text>
            <View style = {{flex: 1,
                            justifyContent: 'center'}}>
            <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion2Answer('yes')}>
              <Text style={styles.answerText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion2Answer('no')}>
              <Text style={styles.answerText}>No</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => this.handleBackButton()}>
              <Ionicons name="chevron-back" size={24} color="black" style={styles.icon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {currentQuestion === 3 && (
          <Animated.View style={[styles.questionContainer, { transform: [{ translateX: slideRight }] }]}>
            <Text style={styles.question}>Is your period:</Text>
            <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion3Answer('Regular')}>
              <Text style={styles.answerText}>Regular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion3Answer('Irregular')}>
              <Text style={styles.answerText}>Irregular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerButton} onPress={() => this.handleQuestion3Answer('Stopped')}>
              <Text style={styles.answerText}>Stopped</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={() => this.handleBackButton()}>
              <Ionicons name="chevron-back" size={24} color="#a60545" style={styles.icon} />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </Animated.View>)}
          {currentQuestion === 'date' && (
            <View style={styles.questionContainer}>
            <Text style={styles.question}>Choose a date for your self examination</Text>
            <TouchableOpacity onPress={() => this.setState({ isDatePickerVisible: true })}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar" size={24} color="black" style={styles.icon} />
              <Text style={styles.dateText}>{this.state.selectedDate}</Text>
            </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              display="spinner"
              onConfirm={this.handleConfirm}
              onCancel={() => this.setState({ isDatePickerVisible: false })}
            />
          </View>)}
        </View>
      );
    }
      
        
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8acc6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    margin: 50,
  },
  question: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ed127c'
  },
  answerButton: {
    backgroundColor: '#eb4a8b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 10,
    minWidth: RFValue(150),
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  backButton: {
    backgroundColor: '#f8acc6',
    borderColor: '#a60545',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    minWidth: RFValue(150),
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  backButtonText: {
    color: '#a60545',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10
  },
  text: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 200
  },
  icon: {
    marginRight: 10,
    color: '#a60545'
  },
  dateText: {
    fontSize: 16,
    color: '#a60545'
  }
})

export default Questionnaire;