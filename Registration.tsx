import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Registration = () => {
  const navigation = useNavigation();

  const handleGoToRegisterLocations = () => {
    navigation.navigate('RegisterLocations');
  };

  const handleGoToRegisterItems = () => {
    navigation.navigate('RegisterItems');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.buttonContainer}>
        <Button title="Novo Local" onPress={handleGoToRegisterLocations} />
        <View style={styles.buttonSeparator} />
        <Button title="Novo Item" onPress={handleGoToRegisterItems} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  buttonSeparator: {
    width: 20,
    height: 20,
  },
});

export default Registration;