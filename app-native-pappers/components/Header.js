import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        {/* Supprimer l'image */}

        {/* Bouton du menu */}
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligne le bouton de menu à droite
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  // Retirer le style logo
  menuButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  menuText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default Header;
