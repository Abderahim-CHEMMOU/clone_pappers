import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FileUploader() {
  const [files, setFiles] = useState({
    file1: null,
  }); // Stocker le fichier téléversé
  const [filePath, setFilePath] = useState(null); // Stocker le chemin du fichier téléversé

  // Fonction pour sélectionner et téléverser un fichier spécifique
  const pickAndUploadDocumentWeb = (event, fileKey) => {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    if (!file) {
      Alert.alert('Aucun fichier sélectionné.');
      return;
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileKey]: file, // Ajouter le fichier à la bonne clé
    }));

    uploadFile(file); // Téléverser le fichier
  };

  // Fonction pour téléverser le fichier
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3002/upload-csv', { // Changer le port vers 3001
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors du téléversement du fichier.');
      }

      const data = await response.json();
      // Afficher une notification avec le chemin du fichier téléversé
      Alert.alert('Succès', `${file.name} téléversé avec succès.`);
      setFilePath(data.filePath); // Stocker le chemin du fichier
      console.log('Chemin du fichier stocké :', data.filePath);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier :', error);
      Alert.alert('Erreur', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Téléverser un fichier CSV et stocker dans le dossier</Text>

      {/* Sélection et téléversement pour un fichier */}
      <View style={styles.fileContainer}>
        {/* <Text style={styles.fileLabel}>Fichier :</Text> */}
        <TouchableOpacity style={styles.button}>
          <label htmlFor="file1" style={styles.buttonText}>Choisir un fichier CSV</label>
          <input
            id="file1"
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            onChange={(event) => pickAndUploadDocumentWeb(event, 'file1')} // Associer chaque input à son fichier spécifique
          />
        </TouchableOpacity>
        {files.file1 ? (
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>{files.file1.name}</Text>
          </View>
        ) : (
          <Text style={styles.noFilesText}>Aucun fichier sélectionné</Text>
        )}
      </View>

      {/* Affichage du chemin du fichier stocké */}
      {filePath && (
        <View style={styles.filePathContainer}>
          <Text style={styles.filePathText}>Chemin du fichier stocké :</Text>
          <Text style={styles.filePath}>{filePath}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  fileContainer: {
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  fileLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#495057',
  },
  fileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 12,
    color: '#495057',
  },
  noFilesText: {
    fontSize: 12,
    color: '#adb5bd',
    textAlign: 'center',
  },
  filePathContainer: {
    marginTop: 20,
  },
  filePathText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  filePath: {
    fontSize: 12,
    color: '#495057',
    marginTop: 5,
  },
});
