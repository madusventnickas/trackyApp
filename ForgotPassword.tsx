// ForgotPassword.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function ForgotPassword({ navigation }) {
  const handleRecoverPassword = () => {
    // Implemente a lógica para recuperar a senha aqui
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <Button title="Recuperar Senha" onPress={handleRecoverPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default ForgotPassword;
