import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assurez-vous d'avoir installé @expo/vector-icons

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Section d'information */}
      <Text style={styles.footerText}>© 2024 Pappers App. Tous droits réservés.</Text>

      {/* Liens de navigation */}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://pappers.com/about')}>
          <Text style={styles.linkText}>À propos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://pappers.com/contact')}>
          <Text style={styles.linkText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://pappers.com/privacy')}>
          <Text style={styles.linkText}>Confidentialité</Text>
        </TouchableOpacity>
      </View>

      {/* Réseaux sociaux */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
          <FontAwesome name="facebook" size={24} color="#ffffff" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
          <FontAwesome name="twitter" size={24} color="#ffffff" style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com')}>
          <FontAwesome name="linkedin" size={24} color="#ffffff" style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#1D3557', // Couleur de fond du footer
    paddingVertical: 20, // Espacement vertical
    paddingHorizontal: 10,
    alignItems: 'center', // Centrer le contenu horizontalement
  },
  footerText: {
    color: '#F1FAEE', // Couleur du texte du footer
    fontSize: 14,
    marginBottom: 10, // Espacement en bas du texte
    textAlign: 'center', // Centrer le texte
  },
  linkContainer: {
    flexDirection: 'row',
    marginBottom: 10, // Espacement en bas des liens
  },
  linkText: {
    color: '#A8DADC', // Couleur des liens
    fontSize: 14,
    marginHorizontal: 10, // Espacement horizontal entre les liens
    textDecorationLine: 'underline', // Soulignement des liens
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centrer les icônes de réseaux sociaux
  },
  socialIcon: {
    marginHorizontal: 10, // Espacement entre les icônes de réseaux sociaux
  },
});

export default Footer;
