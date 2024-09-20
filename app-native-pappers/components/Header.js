import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        {/* Bouton du menu */}


        {/* Logo de l'application */}
        <Image
          source={require('../assets/Pappers.png')} // Chemin vers votre logo
          style={styles.logo}
        />

        {/* Titre de l'application */}
        <Text style={styles.headerTitle}>Pappers App</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  menuText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  logo: {
    width: 40, // Largeur du logo
    height: 40, // Hauteur du logo
    marginRight: 10, // Espace entre le logo et le titre
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginRight: 'auto',
  },
});

export default Header;
