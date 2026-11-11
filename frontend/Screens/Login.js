import TransStripe from '../components/TransStripe';
import { colors } from '../components/theme';
import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
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
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { form: { padding: compact ? 20 : 30 }, imagem: { height: compact ? 112 : 144 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));
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
    <Screen contentContainerStyle={styles.container}>

      <View style={styles.card}>
        <TransStripe style={styles.flag} />
        <View style={styles.form}>

         <Image source={require('../imagens/LOGO.png')}
                         style={styles.imagem} resizeMode="contain" accessibilityLabel="LOOM"
                 ></Image>

          <Text accessibilityRole="header" style={styles.title}>Boas-vindas</Text>
          <Text style={styles.subtitle}>
            Entre na sua conta
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.corTexto}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={colors.corTexto}
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
    maxWidth: 440,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    borderRadius: 24,
    overflow: 'hidden',

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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.muted,
    marginBottom: 30,
  },
  imagem:{
    width: '100%',
  },

  input: {
    width: '100%',
    height: 52,
    backgroundColor: colors.inputBackground,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.inputText,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: 'bold',
  },

  flag: { height: 80 },
  form: { gap: 4 },

  texto: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.muted,
    marginTop: 18,
  },

  cadastro: {
    color: colors.accent,
    fontWeight: 'bold',
  },

});