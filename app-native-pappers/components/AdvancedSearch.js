import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

const AdvancedSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.length < 3) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:5001/entreprises');
        const data = response.data;

        const filteredResults = data.filter(item => {
          const term = searchTerm.toLowerCase();
          return item.numero_entreprise.toLowerCase().startsWith(term) ||
                 item.nom_entreprise.toLowerCase().startsWith(term) ||
                 item.activite.group.toLowerCase().startsWith(term) ||
                 item.adresse.code_postal.slice(0, 2).toLowerCase() === term;
        });

        setSearchResults(filteredResults);
      } catch (err) {
        setError('Une erreur est survenue. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchTerm]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.searchTitle}>Recherche</Text>
        <TextInput
          style={styles.input}
          placeholder="Rechercher par numéro, nom, activité, ou code postal..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {loading && <Text style={styles.loading}>Chargement...</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
        {selectedItem ? (
          <View style={styles.details}>
            <Text style={styles.detailsTitle}>Détails de l'entreprise</Text>
            <Text style={styles.detailsText}>Nom: {selectedItem.nom_entreprise}</Text>
            <Text style={styles.detailsText}>Numéro: {selectedItem.numero_entreprise}</Text>
            <Text style={styles.detailsText}>Activité: {selectedItem.activite.group}</Text>
            <Text style={styles.detailsText}>Adresse: {selectedItem.adresse.rue}, {selectedItem.adresse.ville}, {selectedItem.adresse.code_postal}</Text>
            <Button title="Retour" onPress={() => setSelectedItem(null)} color="#007BFF" />
          </View>
        ) : (
          searchResults.length > 0 && (
            <View style={styles.resultsContainer}>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.numero_entreprise}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelect(item)} style={styles.item}>
                  <Text style={styles.itemText}>{item.nom_entreprise}</Text>
                  <Text style={styles.itemSubtext}>{item.adresse.ville}</Text>
                </TouchableOpacity>
              )}
              style={styles.resultsList}
            />
            </View>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 200,
  },
  innerContainer: {
    width: '90%',
    maxWidth: 500,
    //alignItems: 'center',
    
  },
  searchTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    marginRight: 190, 
  },
  input: {
    height: 45,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: 350,
    alignSelf: 'center',
  },
  loading: {
    marginVertical: 15,
    fontStyle: 'italic',
    color: '#007BFF',
  },
  error: {
    color: '#FF0000',
    marginVertical: 15,
  },
  resultsContainer: {
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  marginTop: 2,
  width: '100%',
  maxHeight: 500, // Limite la hauteur maximale du conteneur de la liste
  height: 'auto',
},
item: {
    marginVertical: 5,
    padding: 10,
    width: 200, // Taille fixe pour chaque élément
    height: 60, // Hauteur fixe pour chaque élément
    alignItems: 'center', // Centrer le contenu
    justifyContent: 'center',
    //borderBottomColor: '#EEEEEE',
    //borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtext: {
    color: '#666',
  },
  details: {
    padding: 15,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#00