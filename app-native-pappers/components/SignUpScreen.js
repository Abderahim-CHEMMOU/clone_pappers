import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Logique pour gérer l'inscription
    console.log('Inscription avec', { firstName, lastName, email, password });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Inscription à Pappers</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#888"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#888"
      />
      
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
      
      <Text style={styles.passwordRequirements}>
        Votre mot de passe doit contenir : 8 caractères minimum, minuscules, majuscules, chiffres, au moins 1 caractère spécial.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Inscription</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>J'ai déjà un compte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 56,
    flexGrow: 1,
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
  passwordRequirements: {
    fontSize: 12,
    marginBottom: 20,
    color: '#888',
    textAlign: 'center',
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

export default SignUpScreen;
