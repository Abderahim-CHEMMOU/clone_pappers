import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.content}>
        {/* Carte d'accueil */}
        <View style={styles.welcomeCard}>
          <Text style={styles.title}>Bienvenue sur Pappers App!</Text>
          <Text style={styles.subtitle}>
            Explorez notre base de données et téléversez vos fichiers CSV pour une recherche rapide et efficace.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate('FileUploader')}
        >
          <Text style={styles.buttonText}>Téléverser un fichier CSV</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1FAEE', // Arrière-plan doux et agréable
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeCard: {
    width: '90%',
    backgroundColor: '#ffffff', // Fond blanc pour la carte
    borderRadius: 10, // Bords arrondis
    padding: 20, // Espacement interne
    marginVertical: 20, // Espacement en haut et en bas
    shadowColor: '#000', // Ombre pour la carte
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Ombre pour Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D3557', // Couleur du texte harmonisée avec le thème
    textAlign: 'center', // Centrer le texte
    marginBottom: 10, // Espacement en dessous du titre
  },
  subtitle: {
    fontSize: 16,
    color: '#457B9D', // Couleur secondaire pour le sous-titre
    textAlign: 'center', // Centrer le texte
    lineHeight: 22, // Hauteur de ligne pour une meilleure lisibilité
  },
  uploadButton: {
    backgroundColor: '#1D3557', // Couleur principale
    paddingVertical: 15, // Espacement vertical
    paddingHorizontal: 30, // Espacement horizontal
    borderRadius: 25, // Bords arrondis pour un look moderne
    marginTop: 20, // Espacement en haut du bouton
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Ombre pour Android
  },
  buttonText: {
    color: '#F1FAEE', // Texte blanc
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Home;
