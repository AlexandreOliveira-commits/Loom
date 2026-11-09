import { colors } from '../components/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
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
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { card: { padding: compact ? 20 : 30 }, imagem: { width: compact ? '100%' : 350, height: compact ? Math.min(350, Math.max(0, width - 80)) / 1.75 : 200 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));

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

        await AsyncStorage.setItem('usuario', JSON.stringify(dados.usuario));
        navigation.replace('Sobre');

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

    <Screen contentContainerStyle={styles.container}>

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
          placeholderTextColor={colors.muted}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={colors.muted}
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

    </Screen>

  );
}


const baseStyles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.canvas,
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 400,

    backgroundColor: colors.surface,

    padding: 20,

    borderRadius: 20,

    alignItems: 'center',

    borderTopWidth: 6,
    borderTopColor: colors.transBlue,

    borderBottomWidth: 6,
    borderBottomColor: colors.transPink,
  },

  imagem: {
    width: 350,
    height: 200,
  },

  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 25,
  },

  input: {
    width: '100%',
    height: 50,

    backgroundColor: colors.field,

    borderWidth: 1.5,
    borderColor: colors.line,

    borderRadius: 12,

    paddingHorizontal: 15,

    marginBottom: 15,

    fontSize: 16,
    color: colors.ink,
  },

  button: {
    width: '100%',
    height: 50,

    backgroundColor: colors.primary,

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },

});