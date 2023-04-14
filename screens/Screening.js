import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Linking, Text, Alert, TextInput, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import step1 from '../assets/screeningsteps/step1.png';
import step2 from '../assets/screeningsteps/step2.png';
import step3 from '../assets/screeningsteps/step3.png';
import step4 from '../assets/screeningsteps/step4.png';
import { RFValue } from 'react-native-responsive-fontsize';
import { RadioButton, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import db from '../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

const SCREENING_STEPS = [
  { image: step1, description: 'Step 1: Stand before a mirror. Compare both breasts for any difference in size, shape or colour.' },
  { image: step2, description: 'Step 2: Raise both hands and observe again for difference. Also see if nipples are at the same level.' },
  { image: step3, description: 'Step 3: Raise one arm. Using 3 fingers of the opposite hand\n a) Move fingers in circular motion beginning from the nipple. \n b) Feel for any unusual lump under the skin. Examine the armpit for any lump. \n c) Squeeze the nipple gently to check for discharge of any colour. \n d) Repeat on your other breast.' },
  { image: step4, description: 'Step 4: Lie flat on your back with a pillow under the left shoulder. Stretch left arm overhead. Examine breast using opposite hand. Repeat on the other breast.' },
];
const Screening = () => {
  const [stepIndex, setStepIndex] = useState(-1);
  const [showQuestion, setShowQuestion] = useState(false);
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState('option1');
  const [selectedNone, setSelectedNone] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigation = useNavigation();
  const [showMap, setShowMap] =  useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    if (isFocused) {
      setStepIndex(-1);
      setShowQuestion(false);
      setShowResult(false);
      setShowMap(false);
      setSearchQuery('');
    }
  }, [isFocused]);

  const handlePrevStep = () => {
    setStepIndex(Math.max(0, stepIndex - 1));
  };

  const handleNextStep = () => {
    if (stepIndex === SCREENING_STEPS.length - 1) {
      setShowQuestion(true);
    } else {
      setStepIndex(Math.min(SCREENING_STEPS.length - 1, stepIndex + 1));
    }
  };

  const handleStartPress = () => {
    setStepIndex(0);
  };

  const handleVideoPress = () => {
    Linking.openURL('https://youtu.be/be7rT_Q1a3c');
  };

  const handleSelect = (value) => {
    setSelected(value);
    setSelectedNone(value === 'none');
  };

  const searchMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=breast oncologists near ${searchQuery}`;
    Linking.openURL(url);
  };

  const getSelectedDate = () => {
    const currentUser = firebase.auth().currentUser;
    db.collection('users').doc(currentUser.uid).get().then((doc) => {
      if (doc.exists) {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            const finalDate = date.toLocaleDateString('en-GB');
            setSelectedDate(finalDate)
            db.collection('users').doc(currentUser.uid)
            .update({
              selectedDate: finalDate
            })
      } else {
          console.log("No such document!");
      }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
  }

  return (
    <View style={styles.container}>
      {stepIndex === -1 && !showQuestion && (
        <View style = {styles.videoButton}>
        <WebView
        javaScriptEnabled={true}
        source={{uri: 'https://www.youtube.com/embed/be7rT_Q1a3c'}}
      />
        </View>
      )}
      {stepIndex === -1 && !showQuestion && (
        <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
          <Text style={styles.startButtonText}>Start step-by-step Breast Self Examination</Text>
        </TouchableOpacity>
      )}
      {stepIndex >= 0 && !showQuestion && (
        <View style={styles.stepContainer}>
          <Image source={SCREENING_STEPS[stepIndex].image} style={styles.stepImage} />
          <Text style={styles.stepDescription}>{SCREENING_STEPS[stepIndex].description}</Text>
          <View style={styles.arrowContainer}>
            {stepIndex > 0 && (
              <TouchableOpacity onPress={handlePrevStep}>
                <MaterialCommunityIcons name="chevron-left" size={50} color="#a60545" />
              </TouchableOpacity>
            )}
            {stepIndex < SCREENING_STEPS.length - 1 && (
              <TouchableOpacity onPress={handleNextStep}>
                <MaterialCommunityIcons name="chevron-right" size={50} color="#a60545" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      {stepIndex === SCREENING_STEPS.length - 1 && !showQuestion && (
        <TouchableOpacity style={styles.startButton} onPress={handleNextStep}>
          <Text style={styles.startButtonText}>Next</Text>
        </TouchableOpacity>
      )}
      {showQuestion && !showResult && (
        <ScrollView style = {{width: '100%'}}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>After examining your breasts what do you observe ?</Text>
          <View style={styles.radioGroupContainer}>
          <RadioButton.Group onValueChange={value => handleSelect(value)} value={selected}>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 1" value="option1" color="#a60545"/>
            <Text style={styles.radioButtonText}>A hard lump or knot near your underarm</Text>
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 2" value="option2" color="#a60545"/>
            <Text style={styles.radioButtonText}>Changes in the way your breasts look or feel, including thickening or prominent fullness that is different from the surrounding tissue</Text>  
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 3" value="option3" color="#a60545"/>
            <Text style={styles.radioButtonText}>Dimples, puckers, bulges or ridges on the skin of your breast</Text>
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 4" value="option4" color="#a60545"/>
            <Text style={styles.radioButtonText}>A recent change in a nipple to become pushed in instead of sticking out</Text>
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 5" value="option5" color="#a60545"/>
            <Text style={styles.radioButtonText}>Nipple discharge</Text>
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 6" value="option6" color="#a60545"/>
            <Text style={styles.radioButtonText}>Redness, warmth, swelling or pain</Text>
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="Option 7" value="option7" color="#a60545"/>
            <Text style={styles.radioButtonText}>Itching, scales, sores or rashes</Text>
          </View>
          <View style={styles.radioButtonView}>
            <RadioButton.Android label="None" value="none" color="#a60545"/>
            <Text style={styles.radioButtonText}>None</Text>
          </View>
      </RadioButton.Group>
          </View>
          <TouchableOpacity style={styles.startButton} onPress={() => {setShowResult(true); getSelectedDate();} }>
            <Text style={styles.startButtonText}>Done</Text>
          </TouchableOpacity>
          </View>
          </ScrollView>
      )}

{showResult && selected !== 'none' ? !showMap && (
  <View style={styles.resultContainer}>
    <Text style={styles.resultText}>What do you want to do next?</Text>
    <View>
      <TouchableOpacity style={styles.startButton} onPress={() => setShowMap(true)}>
        <Text style={styles.startButtonText}>Visit nearest breast oncologist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startButton} onPress={() => setSelected('none')}>
        <Text style={styles.startButtonText}>Wait till next breast self examination</Text>
      </TouchableOpacity>
    </View>
  </View>
) : showResult && selected === 'none' && !showMap && (
  Alert.alert(
    `You have successfully completed the breast self examination.\n Your next examination is scheduled on ${selectedDate}`,
    '',
    [{ text: 'OK', onPress: () => { setShowResult(false); navigation.navigate('Home' ) } }],
    { cancelable: false }
  )
)}


{showMap && (
  <View>
  <TextInput
    placeholderTextColor="#f686a2"
    style={{
      fontSize: RFValue(20),
      color: "#a60545",
      borderWidth: 1,
      backgroundColor: "#fff",
      paddingHorizontal: RFValue(10),
      paddingVertical: RFValue(5),
      margin: 10,
      width: RFValue(300)
    }}
    onChangeText={(text) => setSearchQuery(text)}
    value={searchQuery}
    placeholder="Search for an oncologist near..."
  />
  <Button title="Search" onPress={searchMap} color="#ef2594"/>
      <TouchableOpacity
      style={{
        ...styles.startButton,
        marginTop: RFValue(40),
        width: RFValue(100),
        alignSelf: 'center'
        }}
      onPress={() => 
        Alert.alert(
          `You have successfully completed the breast self examination.\n Your next examination is scheduled on ${selectedDate}`,
          '',
          [{ text: 'OK', onPress: () => { setShowResult(false); navigation.navigate('Home' ); setSearchQuery('')} }],
          { cancelable: false }
        )
      }>
        <Text style={styles.startButtonText}>Done</Text>
      </TouchableOpacity>
</View>
)}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8acc6'
    },
    videoButton: {
      width: '100%',
      height: RFValue(200),
      marginBottom: RFValue(16),
    },
    videoButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    stepContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    stepImage: {
      height: 300,
      resizeMode: 'contain',
    },
    stepDescription: {
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 40,
      fontSize: RFValue(16),
      fontWeight: 'bold',
      color: '#ed127c'
    },
    arrowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    arrow: {
      fontSize: RFValue(50),
      color: '#fc4ebb',
    },
    startButton: {
      backgroundColor: '#ed127c',
      padding: RFValue(10),
      borderRadius: RFValue(10),
      marginBottom: RFValue(20),
      shadowColor: '#000',
      shadowOffset: {
        width: RFValue(0),
        height: RFValue(3),
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
  
      elevation: 6,
    },
    startButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: RFValue(16)
    },
    questionContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingTop: 50,
    },
    questionText: {
      fontSize: RFValue(20),
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#ed127c'
    },
    radioButtonView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      width: '90%'
    },
    radioButtonText: {
      fontSize: RFValue(16),
      marginLeft: 8,
      color: '#f24e83',
      fontWeight: 'bold'
    },
    radioGroupContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: 10,
      marginBottom: 10,
    },
    resultContainer: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    resultText: {
      fontSize: RFValue(20),
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#ed127c'
    },
  });
   export default Screening;
