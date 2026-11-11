import { colors } from '../components/theme';
import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarPerfil({ navigation }) {
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { card: { padding: compact ? 20 : 28 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));

  const [idUsuario, setIdUsuario] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);


  // ==========================================
  // CARREGA O USUÁRIO LOGADO
  // ==========================================

  useEffect(() => {
    carregarUsuario();
  }, []);


  async function carregarUsuario() {

    try {

      const usuarioSalvo =
        await AsyncStorage.getItem('usuario');

      if (!usuarioSalvo) {

        Alert.alert(
          'Erro',
          'Usuário não encontrado. Faça login novamente.'
        );

        navigation.navigate('Login');

        return;
      }


      const usuario =
        JSON.parse(usuarioSalvo);


      // Aceita id ou id_usuario
      const id =
        usuario.id_usuario || usuario.id;


      if (!id) {

        Alert.alert(
          'Erro',
          'O ID do usuário não foi encontrado.'
        );

        return;
      }


      setIdUsuario(id);


      // Busca informações atualizadas no banco

      const resposta = await fetch(
        `http://localhost:3000/Perfil/${id}`
      );


      const dados = await resposta.json();


      if (resposta.ok) {

        setNome(dados.nome);
        setEmail(dados.email);

      } else {

        // Se não conseguir buscar no banco,
        // usa os dados salvos no celular

        setNome(usuario.nome || '');
        setEmail(usuario.email || '');

      }


    } catch (erro) {

      console.log(
        'Erro ao carregar perfil:',
        erro
      );

      Alert.alert(
        'Erro',
        'Não foi possível carregar o perfil.'
      );

    } finally {

      setCarregando(false);

    }

  }


  // ==========================================
  // SALVAR ALTERAÇÕES
  // ==========================================

  async function salvarAlteracoes() {
    if (salvando || !idUsuario) return;

    if (
      nome.trim() === '' ||
      email.trim() === ''
    ) {

      Alert.alert(
        'Atenção',
        'Nome e e-mail são obrigatórios.'
      );

      return;
    }


    if (senhaAtual.trim() === '') {

      Alert.alert(
        'Atenção',
        'Digite sua senha atual para confirmar as alterações.'
      );

      return;
    }


    // Só verifica confirmação se quiser trocar senha

    if (
      novaSenha !== '' &&
      novaSenha !== confirmarSenha
    ) {

      Alert.alert(
        'Erro',
        'As novas senhas não são iguais.'
      );

      return;
    }


    try {

      setSalvando(true);


      const resposta = await fetch(
        `http://localhost:3000/EditarPerfil/${idUsuario}`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            nome: nome.trim(),
            email: email.trim(),
            senhaAtual,
            novaSenha,
            confirmarSenha,
          }),
        }
      );


      const dados = await resposta.json();


      if (!resposta.ok) {

        Alert.alert(
          'Erro',
          dados.mensagem ||
          'Não foi possível atualizar o perfil.'
        );

        return;
      }


      // Atualiza o usuário salvo no AsyncStorage

      const usuarioAtualizado = dados.usuario;


      await AsyncStorage.setItem(
        'usuario',
        JSON.stringify(usuarioAtualizado)
      );


      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');


      navigation.navigate('Perfil');
      Alert.alert('Perfil atualizado', dados.mensagem || 'Suas informações foram alteradas com sucesso.');


    } catch (erro) {

      console.log(
        'Erro ao editar perfil:',
        erro
      );


      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor.'
      );


    } finally {

      setSalvando(false);

    }

  }


  // ==========================================
  // CARREGAMENTO
  // ==========================================

  if (carregando) {

    return (

      <View style={styles.carregando}>

        <ActivityIndicator
          size="large"
          color={colors.accent}
        />

        <Text style={styles.textoCarregando}>
          Carregando perfil...
        </Text>

      </View>

    );

  }


  // ==========================================
  // TELA
  // ==========================================

  return (

    <Screen
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      {/* HEADER */}

      <PageHeader backToProfile />


      {/* CONTEÚDO */}

      <View style={styles.conteudo}>


        <Text style={styles.titulo}>
          Editar perfil
        </Text>

        <Text style={styles.subtitulo}>
          Atualize suas informações pessoais
        </Text>


        <View style={styles.card}>


          {/* NOME */}

          <Text style={styles.label}>
            Nome
          </Text>

          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            placeholderTextColor={colors.muted}
          />


          {/* EMAIL */}

          <Text style={styles.label}>
            E-mail
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
          />


          <View style={styles.divisor} />


          <Text style={styles.tituloSenha}>
            Segurança
          </Text>

          <Text style={styles.avisoSenha}>
            Digite sua senha atual para confirmar
            qualquer alteração.
          </Text>


          {/* SENHA ATUAL */}

          <Text style={styles.label}>
            Senha atual
          </Text>

          <TextInput
            style={styles.input}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholder="Digite sua senha atual"
            placeholderTextColor={colors.muted}
            secureTextEntry
          />


          {/* NOVA SENHA */}

          <Text style={styles.label}>
            Nova senha
          </Text>

          <TextInput
            style={styles.input}
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="Deixe vazio para não alterar"
            placeholderTextColor={colors.muted}
            secureTextEntry
          />


          {/* CONFIRMAR NOVA SENHA */}

          <Text style={styles.label}>
            Confirmar nova senha
          </Text>

          <TextInput
            style={styles.input}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Digite a nova senha novamente"
            placeholderTextColor={colors.muted}
            secureTextEntry
          />


          {/* SALVAR */}

          <TouchableOpacity
            style={[
              styles.botaoSalvar,
              salvando && styles.botaoDesativado
            ]}
            onPress={salvarAlteracoes}
            disabled={salvando}
          >

            {salvando ? (

              <ActivityIndicator
                color={colors.surface}
              />

            ) : (

              <Text style={styles.textoBotaoSalvar}>
                Salvar alterações
              </Text>

            )}

          </TouchableOpacity>


          {/* CANCELAR */}

          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={() =>
              navigation.navigate('Perfil')
            }
          >

            <Text style={styles.textoCancelar}>
              Cancelar
            </Text>

          </TouchableOpacity>


        </View>

      </View>

    </Screen>

  );

}


// ==========================================
// ESTILOS
// ==========================================

const baseStyles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    paddingBottom: 50,
  },








  conteudo: {
    width: '90%',
    maxWidth: 650,
    alignItems: 'center',
    paddingTop: 45,
  },


  titulo: {
    fontSize: 34,
    fontWeight: '900',
    color: colors.ink,
    textAlign: 'center',
  },


  subtitulo: {
    fontSize: 16,
    color: colors.muted,
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },


  card: {
    width: '100%',
    backgroundColor: colors.surface,

    padding: 20,

    borderRadius: 20,

    borderWidth: 1,
    borderColor: colors.line,

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },


  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.ink,

    marginBottom: 8,
    marginTop: 15,
  },


  input: {
    width: '100%',
    height: 52,

    backgroundColor: colors.field,

    borderWidth: 1.5,
    borderColor: colors.line,

    borderRadius: 12,

    paddingHorizontal: 15,

    fontSize: 15,
    color: colors.ink,
  },


  divisor: {
    width: '100%',
    height: 1,

    backgroundColor: colors.line,

    marginTop: 30,
    marginBottom: 25,
  },


  tituloSenha: {
    width: '100%',

    fontSize: 20,
    fontWeight: '800',

    color: colors.ink,
  },


  avisoSenha: {
    width: '100%',

    fontSize: 13,
    color: colors.muted,

    lineHeight: 19,

    marginTop: 5,
    marginBottom: 5,
  },


  botaoSalvar: {
    width: '100%',

    backgroundColor: colors.accent,

    paddingVertical: 16,

    borderRadius: 14,

    alignItems: 'center',

    marginTop: 30,

    elevation: 3,

    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },


  botaoDesativado: {
    opacity: 0.6,
  },


  textoBotaoSalvar: {
    color: colors.surface,

    fontSize: 16,
    fontWeight: '800',
  },


  botaoCancelar: {
    width: '100%',

    paddingVertical: 14,

    alignItems: 'center',

    marginTop: 8,
  },


  textoCancelar: {
    fontSize: 14,
    fontWeight: '600',

    color: colors.muted,
  },


  carregando: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.canvas,
  },


  textoCarregando: {
    color: colors.muted,
    fontSize: 14,

    marginTop: 15,
  },

});