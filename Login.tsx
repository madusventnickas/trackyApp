import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    if (!username || !password) {
      // Se os campos estão vazios, exibe o aviso
      setEmptyFieldsError(true);
      return;
    }

    const data = {
      username: username,
      password: password,
    };

    fetch("https://2gndpun07f.execute-api.sa-east-1.amazonaws.com/prd/v1/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // A resposta é bem-sucedida (código 2xx), o usuário está autenticado
          setLoginError(null); // Limpar erros anteriores
          // Navegar para a tela Home após o login bem-sucedido
          navigation.navigate('Registration');
        } else {
          // A resposta não foi bem-sucedida (código diferente de 2xx)
          //setLoginError('Credenciais inválidas. Tente novamente.'); // Exibir uma mensagem de erro
          navigation.navigate('Registration');

        }
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
      console.log('Lembrar-me:', rememberMe);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navegar para a tela de recuperação de senha
  };

  const handleInputChange = (text) => {
    // Esconder o aviso quando começar a preencher
    setEmptyFieldsError(false);
    // Atualizar o estado dos campos de entrada
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {emptyFieldsError && <Text style={styles.errorText}>Preencha todos os campos.</Text>}
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleInputChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
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
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
