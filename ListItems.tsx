import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListItems = () => {
  const [items, setItems] = useState([]);
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
        setItems(data);
      } catch (error) {
        setError(`Erro ao obter a lista de itens: ${error.message}`);
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
      <Text style={styles.subtitle}>Itens Salvos:</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{`Nome: ${item.nome}, Preço: ${item.preco}`}</Text>
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
  item: {
    marginBottom: 8,
  },
  itemText: {
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

export default ListItems;