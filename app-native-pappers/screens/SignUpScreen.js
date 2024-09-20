import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://localhost:3003'; // Utilisez cette URL pour l'émulateur Android

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(async () => {
    if (!name || !email || !password) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Erreur',
        'Votre mot de passe doit contenir au moins 8 caractères, des majuscules, des minuscules, des chiffres et un caractère spécial.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        name,
        email,
        password
      });

      if (response.status === 201) {
        Alert.alert(
          'Succès',
          'Votre compte a été créé avec succès. Veuillez vous connecter.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);

      if (error.response && error.response.data) {
        Alert.alert('Erreur', error.response.data.error || 'Une erreur est survenue lors de l\'inscription.');
      } else {
        Alert.alert('Erreur', 'Impossible de contacter le serveur. Veuillez vérifier votre connexion.');
      }
    } finally {
      setLoading(false);
    }
  }, [name, email, password, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Inscription à Pappers</Text>

        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
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

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Inscription...' : 'Inscription'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>J'ai déjà un compte</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 56,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  passwordRequirements: {
    fontSize: 12,
    marginBottom: 20,
    color: '#888',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SignUpScreen;