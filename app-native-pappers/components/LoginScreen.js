import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logique pour gérer la connexion
    console.log('Connexion avec', email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion à Pappers</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Pas encore inscrit ? Inscription</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 55,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F2F2', // Couleur de fond moderne
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333', // Couleur du texte du titre
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF', // Fond des champs de texte
    elevation: 1, // Ombre pour un effet de profondeur
  },
  button: {
    backgroundColor: '#007BFF', // Couleur de fond du bouton
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Ombre pour le bouton
  },
  buttonText: {
    color: '#FFFFFF', // Couleur du texte du bouton
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#007BFF', // Couleur du lien
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
