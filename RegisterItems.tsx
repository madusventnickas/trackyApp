import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterItems = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [showEmptyFieldsWarning, setShowEmptyFieldsWarning] = useState(false);

  const handleAdicionarItem = async () => {
    if (!nome || !preco) {
      // Se os campos estão vazios, exibe o aviso
      setShowEmptyFieldsWarning(true);
      return;
    }

    const newItem = { nome, preco };

    // Faz a chamada à API para salvar o item
    const response = await fetch('https://er0vzmjh37.execute-api.sa-east-1.amazonaws.com/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    // Limpa os campos após salvar
    setNome('');
    setPreco('');

    // Esconde o aviso
    setShowEmptyFieldsWarning(false);

    // Exibe o modal de sucesso
    setSuccessMessage('Dados salvos com sucesso!');
    setIsSuccessModalVisible(true);
  };

  const handleGoToList = () => {
    // Fecha o modal de sucesso e navega para a tela de Listagem
    setIsSuccessModalVisible(false);
    navigation.navigate('ListItems');
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
          // Esconde o aviso quando começar a preencher
          setShowEmptyFieldsWarning(false);
        }}
      />
      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={preco}
        onChangeText={(text) => {
          setPreco(text);
          // Esconde o aviso quando começar a preencher
          setShowEmptyFieldsWarning(false);
        }}
      />
      <Button title="Salvar" onPress={handleAdicionarItem} />

      {/* Aviso para campos vazios */}
      {showEmptyFieldsWarning && (
        <Text style={styles.warningText}>Por favor, preencha todos os campos.</Text>
      )}

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
        <Button title="Ir para Lista" onPress={() => navigation.navigate('ListItems')} />
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
  warningText: {
    color: 'red',
    marginBottom: 8,
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
});

export default RegisterItems;