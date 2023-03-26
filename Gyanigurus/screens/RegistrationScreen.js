import React from 'react';
import {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {
  TextInput,
  Button,
  Appbar,
  Avatar,
  RadioButton,
  useTheme,
} from 'react-native-paper';
import {useSignupMutation} from '../lib/apollo/user/mutations';
const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [createUser, {loading, error}] = useSignupMutation();
  async function storeUser() {
    if (firstName === '' || email === '' || phone === '' || password === ''||lastName === '') {
      alert('Fill at your name ,email,phone,password!');
    } else {
      setIsLoading(true);
      const res = await createUser({
        variables: {
          name: firstName + lastName,
          firstName: firstName,
          lastName: lastName,
          email,
          password,
          termsAndCondition: true,
          type: 'user',
          phoneNumber: phone,
          emailOptIn:true
        },
      });
      console.log(res);
    }
  }
  return (
    <ImageBackground
      source={require('../assets/background.webp')}
      style={styles.background}>
      <View style={styles.container}>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
        />
        <TextInput
          label="last Name"
          value={lastName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={text => setPhone(text)}
          style={styles.input}
        />
        <View
          style={{
            borderRadius: 10,
            flexDirection: 'row',
            margin: 10,
            backgroundColor: theme.colors.surface,
            opacity: 50,
          }}>
          <RadioButton
            value="student"
            status={userType === 'student' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('student')}
          />
          <Text style={{padding: 5, fontSize: 18, color: theme.colors.text}}>
            Student
          </Text>
          <RadioButton
            value="teacher"
            status={userType === 'teacher' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('teacher')}
          />
          <Text style={{padding: 5, fontSize: 18, color: theme.colors.text}}>
            Teacher
          </Text>
          <RadioButton
            value="institute"
            status={userType === 'institute' ? 'checked' : 'unchecked'}
            onPress={() => setUserType('institute')}
          />
          <Text style={{padding: 5, fontSize: 18, color: theme.colors.text}}>
            Institute
          </Text>
        </View>
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          label="Retype Password"
          value={retypePassword}
          onChangeText={text => setRetypePassword(text)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={() => storeUser()}
          style={styles.button}>
          Register
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginBottom: 20,
  },
  input: {
    marginVertical: 10,
    width: '100%',
    borderRadius: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default RegisterScreen;
