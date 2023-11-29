import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListLocations = () => {
  const [locais, setLocais] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://er0vzmjh37.execute-api.sa-east-1.amazonaws.com/list');
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        setLocais(data);
      } catch (error) {
        setError(`Erro ao obter a lista de locais: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleBackToRegistration = () => {
    navigation.navigate('Registration');
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Voltar para o Cadastro" onPress={handleBackToRegistration} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Locais Salvos:</Text>
      <FlatList
        data={locais}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.localItem}>
            <Text style={styles.localNome}>{`Nome: ${item.nome}, Endereço: ${item.endereco}`}</Text>
          </View>
        )}
      />
      <Button title="Voltar para o Cadastro" onPress={handleBackToRegistration} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  localItem: {
    marginBottom: 8,
  },
  localNome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default ListLocations;
