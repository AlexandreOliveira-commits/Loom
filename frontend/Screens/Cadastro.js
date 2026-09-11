import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrarUsuario() {

    // Verifica se os campos foram preenchidos
    if (nome === '' || email === '' || senha === '') {
      Alert.alert(
        'Erro',
        'Preencha todos os campos.'
      );

      return;
    }

    try {

      // Envia os dados para a rota POST /Cadastro
      const resposta = await fetch(
        'http://localhost:3000/Cadastro',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            nome,
            email,
            senha
          })
        }
      );

      // Recebe a resposta do backend
      const dados = await resposta.json();

      console.log(resposta);

      // Se o cadastro funcionou
      if (resposta.ok) {

        navigation.navigate('Sobre');

        Alert.alert(
          'Sucesso',
          dados.mensagem,
          [
            {
              text: 'Continuar'
            }
          ]
        );

        // Limpa os campos
        setNome('');
        setEmail('');
        setSenha('');

      } else {

        // Caso o backend retorne erro
        Alert.alert(
          'Erro',
          dados.mensagem || 'Erro ao cadastrar usuário.'
        );

      }

    } catch (erro) {

      console.log('Erro ao cadastrar:', erro);

      Alert.alert(
        'Erro',
        'Falha ao conectar com a API.'
      );

    }

  }

  return (

    <View style={styles.container}>

      <View style={styles.card}>

      <Image source={require('../imagens/LOGO.png')}
                             style={styles.imagem} ></Image>

        <Text style={styles.title}>
          Crie sua conta
        </Text>

        <Text style={styles.subtitle}>
          Faça parte da nossa história
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={cadastrarUsuario}
        >

          <Text style={styles.buttonText}>
            Cadastrar
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDEBF2',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 400,

    backgroundColor: '#FFFFFF',

    padding: 30,

    borderRadius: 20,

    alignItems: 'center',

    borderTopWidth: 6,
    borderTopColor: '#5BCEFA',

    borderBottomWidth: 6,
    borderBottomColor: '#F5A9B8',
  },

  imagem: {
    width: 350,
    height:200,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5BCEFA',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 25,
  },

  input: {
    width: '100%',
    height: 50,

    backgroundColor: '#FAFAFA',

    borderWidth: 1.5,
    borderColor: '#F5A9B8',

    borderRadius: 12,

    paddingHorizontal: 15,

    marginBottom: 15,

    fontSize: 16,
    color: '#333',
  },

  button: {
    width: '100%',
    height: 50,

    backgroundColor: '#5BCEFA',

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});