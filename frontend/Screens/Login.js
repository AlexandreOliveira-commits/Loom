import { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const resposta = await fetch(
        'http://localhost:3000/Login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email,
            senha
          })
        }
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        // salva os dados do usuário
        await AsyncStorage.setItem(
          'usuario',
          JSON.stringify(dados.usuario)
        );

        Alert.alert(
          'Sucesso',
          'Login realizado com sucesso!'
        );

          navigation.replace('Sobre');
      } else {
        Alert.alert(
          'Erro',
          dados.mensagem || 'Email ou senha inválidos.'
        );
      }

    } catch (erro) {
      console.log('Erro no login:', erro);

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
                       style={styles.imagem}
               ></Image>

        <Text style={styles.subtitle}>
          Entre na sua conta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#888"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={fazerLogin}
        >
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>

        <View style={styles.linha}>
          <View style={styles.linhaAzul} />
          <View style={styles.linhaRosa} />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.texto}>
            Ainda não tem uma conta?{' '}
            <Text style={styles.cadastro}>
              Cadastre-se
            </Text>
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
    borderRadius: 24,

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },

  title: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#5BCEFA',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
  imagem:{
    width: 350,
    height:200,
  },

  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#F8F8F8',
    borderWidth: 2,
    borderColor: '#F5A9B8',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },

  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#5BCEFA',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  linha: {
    flexDirection: 'row',
    width: '100%',
    height: 4,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 22,
  },

  linhaAzul: {
    flex: 1,
    backgroundColor: '#5BCEFA',
  },

  linhaRosa: {
    flex: 1,
    backgroundColor: '#F5A9B8',
  },

  texto: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },

  cadastro: {
    color: '#F28FA4',
    fontWeight: 'bold',
  },

});