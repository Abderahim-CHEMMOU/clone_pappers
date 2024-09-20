import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import AdvancedSearch from './screens/AdvancedSearch';
import FileUpload from './screens/FileUpload';
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

// Composant d'enveloppe pour inclure Header et Footer
const ScreenWrapper = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // Désactive le header par défaut de React Navigation
        }}
      >
        <Stack.Screen name="Login">
          {(props) => (
            <ScreenWrapper>
              <LoginScreen {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => (
            <ScreenWrapper>
              <Home {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>
        <Stack.Screen name="FileUploader">
          {(props) => (
            <ScreenWrapper>
              <FileUpload {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props) => (
            <ScreenWrapper>
              <SignUpScreen {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>
        <Stack.Screen name="AdvancedSearch">
          {(props) => (
            <ScreenWrapper>
              <AdvancedSearch {...props} />
            </ScreenWrapper>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
