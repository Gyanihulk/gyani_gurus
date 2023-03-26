import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegistrationScreen from './screens/RegistrationScreen';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Login from './screens/Login';
import {ApolloClient, InMemoryCache, createHttpLink,ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo/client';
import { useApollo } from './lib/apollo/useApollo';



const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#382f4b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="RegisterForm"
        component={RegistrationScreen}
        options={{title: 'Register User'}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{title: 'Login Screen'}}
      />
    </Stack.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    text: 'black',
  },
};

export default function App() {
  const apolloClient=useApollo()
  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </ApolloProvider>
    </PaperProvider>
  );
}
