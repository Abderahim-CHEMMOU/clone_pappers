// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import LoginScreen from './components/LoginScreen'; // Assurez-vous que le chemin est correct
// import SignUpScreen from './components/SignUpScreen'; // Assurez-vous que le chemin est correct

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator
//         initialRouteName="Login"
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: '#007BFF', // Couleur d'arrière-plan de l'en-tête
//           },
//           headerTintColor: '#fff', // Couleur du texte de l'en-tête
//           headerTitleStyle: {
//             fontWeight: 'bold',
//           },
//         }}
//       >
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// App.js
// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FileUploader from './components/FileUpload';
import Header from './components/Header'; // Assurez-vous que le chemin est correct

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header />
        <FileUploader/>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default App;
