import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterLocations = ({ onLocationAdded }) => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);

  const handleAdicionarLocal = async () => {
    // Verifica se os campos estão vazios antes de salvar
    if (!nome || !endereco) {
      setShowEmptyFieldsWarning(true);
      return;
    }

    // Faz a chamada à API para salvar o item
    const response = await fetch('https://er0vzmjh37.execute-api.sa-east-1.amazonaws.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, endereco }),
    });

    // Limpa os campos após salvar
    setNome('');
    setEndereco('');

    // Exibe o modal de sucesso
    setSuccessMessage('Dados salvos com sucesso!');
    setIsSuccessModalVisible(true);

    // Esconde o aviso de campos vazios
    setShowEmptyFieldsWarning(false);
  };

  const handleGoToList = () => {
    // Fecha o modal de sucesso e navega para a tela de Listagem
    setIsSuccessModalVisible(false);
    navigation.navigate('ListLocations');
  };

  const closeModal = () => {
    // Fecha o modal de sucesso
    setIsSuccessModalVisible(false);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          setShowEmptyFieldsWarning(false);
        }}
      />
      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={(text) => {
          setEndereco(text);
          setShowEmptyFieldsWarning(false);
        }}
      />
      {showEmptyFieldsWarning && (
        <Text style={styles.warningText}>Por favor, preencha todos os campos.</Text>
      )}
      <Button title="Salvar" onPress={handleAdicionarLocal} />

      <Modal visible={isSuccessModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.successMessageModal}>{successMessage}</Text>
              <Icon
                name="times-circle"
                size={24}
                color="black"
                onPress={closeModal}
                style={styles.closeIcon}
              />
            </View>
            <View style={styles.buttonContainerModal}>
              <Button title="Ir para a Lista Agora" onPress={handleGoToList} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={() => navigation.goBack()} color="red" />
        <Button title="Ir para a Lista" onPress={handleGoToList} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  successMessageModal: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  buttonContainerModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  closeIcon: {
    padding: 8,
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    marginTop: 8,
  },
});

export default RegisterLocations;