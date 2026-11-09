import { colors } from '../components/theme';
import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';

export default function Perfil() {
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { card: { width: compact ? '100%' : '90%', padding: compact ? 20 : 30 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));
    function EditarPerfil() {
        navigation.navigate('editarPerfil');
    }


  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [tentativa, setTentativa] = useState(0);

  // Refresh on every visit, including the return from editing the profile.
  useFocusEffect(useCallback(() => {
    let ativo = true;
    const controller = new AbortController();

    async function carregarPerfil() {
      setCarregando(true);
      setErro('');
      setUsuario(null);
      try {
        const salvo = await AsyncStorage.getItem('usuario');
        if (!ativo) return;
        const sessao = salvo ? JSON.parse(salvo) : null;
        const id = sessao?.id_usuario || sessao?.id;
        if (!id) {
          navigation.replace('Login');
          return;
        }

        const resposta = await fetch(
          'http://localhost:3000/Perfil/' + encodeURIComponent(id),
          { signal: controller.signal }
        );
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.mensagem || 'Não foi possível carregar o perfil.');
        }
        if (ativo) setUsuario(dados);
      } catch (falha) {
        if (ativo) setErro(falha.message === 'Failed to fetch'
          ? 'Não foi possível conectar ao servidor.'
          : falha.message || 'Não foi possível carregar o perfil.');
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarPerfil();
    return () => { ativo = false; controller.abort(); };
  }, [navigation, tentativa]));

  return (

    <Screen contentContainerStyle={styles.container}>

      {/* MENU */}

      <PageHeader />


      {/* CONTEÚDO DO PERFIL */}

      <View style={styles.conteudo}>

        {carregando ? (
          <ActivityIndicator size="large" color={colors.primary} accessibilityLabel="Carregando perfil" />
        ) : erro ? (
          <View style={styles.card}>
            <Text style={styles.valor} accessibilityRole="alert">{erro}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => setTentativa(valor => valor + 1)}>
              <Text style={styles.textoBotao}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        ) : usuario ? (
        <View style={styles.card}>

          {/* FOTO DE PERFIL */}

          <View style={styles.foto}>
            <Text style={styles.inicial}>{usuario.nome?.trim().charAt(0).toUpperCase() || '?'}</Text>
          </View>


          <Text style={styles.nome}>
            {usuario.nome}
          </Text>

          <Text style={styles.email}>
            {usuario.email}
          </Text>


          <View style={styles.divisor} />


          <View style={styles.informacoes}>

            <Text style={styles.label}>
              Nome
            </Text>

            <Text style={styles.valor}>
              {usuario.nome}
            </Text>


            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.valor}>
              {usuario.email}
            </Text>

          </View>


          <TouchableOpacity style={styles.botao} onPress={EditarPerfil}>

            <Text style={styles.textoBotao}>
              Editar perfil
            </Text>

          </TouchableOpacity>

        </View>
        ) : null}

      </View>

    </Screen>

  );

}


const baseStyles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: colors.canvas,
  },


  /* HEADER */









  /* CONTEÚDO */

  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },


  card: {

    width: '100%',
    maxWidth: 450,
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 6,
    borderTopColor: colors.transBlue,
    borderBottomWidth: 6,
    borderBottomColor: colors.transPink,
  },


  /* FOTO */

  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: colors.line,
    marginBottom: 15,
  },

  inicial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.surface,
  },


  /* DADOS */

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.ink,
  },


  email: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 5,
  },


  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 25,
  },


  informacoes: {
    width: '100%',
  },


  label: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: 'bold',
    marginBottom: 4,
  },


  valor: {
    fontSize: 16,
    color: colors.ink,
    marginBottom: 20,
  },
  botao: {
    width: '100%',
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,

  },


  textoBotao: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',

  },

});