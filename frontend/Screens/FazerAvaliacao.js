import { colors } from '../components/theme';
import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

export default function Avaliacao({ navigation }) {
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { estrela: { fontSize: compact ? 36 : 48 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');

  async function enviarAvaliacao() {

    // Verifica se os campos foram preenchidos
    if (nota === 0 || comentario.trim() === '') {

      Alert.alert(
        'Erro',
        'Escolha uma nota e escreva um comentário.'
      );

      return;
    }

    try {

      // Envia os dados para o backend
      const resposta = await fetch(
        'http://localhost:3000/FazerAvaliacao',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            nota,
            comentario
          })
        }
      );

      const dados = await resposta.json();

      console.log(dados);

      if (resposta.ok) {
        navigation.navigate('avaliacao')

        Alert.alert(
          'Sucesso',
          dados.mensagem || 'Avaliação enviada com sucesso!',
          [
            {
              text: 'Continuar',
            }
          ]
        );

        // Limpa os campos
        setNota(0);
        setComentario('');

      } else {

        Alert.alert(
          'Erro',
          dados.mensagem || 'Erro ao enviar avaliação.'
        );

      }

    } catch (erro) {

      console.log('Erro ao enviar avaliação:', erro);

      Alert.alert(
        'Erro',
        'Falha ao conectar com a API.'
      );

    }

  }


  return (

    <Screen contentContainerStyle={styles.container}>

      {/* HEADER */}

      <PageHeader />


      {/* CONTEÚDO */}

      <View style={styles.conteudo}>

        <Text style={styles.titulo}>
          Avalie sua experiência
        </Text>

        <Text style={styles.subtitulo}>
          Conte o que você achou do LOOM
        </Text>


        {/* ESTRELAS */}

        <View style={styles.estrelas}>

          {[1, 2, 3, 4, 5].map((estrela) => (

            <TouchableOpacity
              key={estrela}
              onPress={() => setNota(estrela)}
            >

              <Text
                style={[
                  styles.estrela,

                  nota >= estrela
                    ? styles.estrelaSelecionada
                    : styles.estrelaNormal
                ]}
              >
                ★
              </Text>

            </TouchableOpacity>

          ))}

        </View>


        {/* NOTA */}

        {nota > 0 && (

          <Text style={styles.nota}>
            Sua nota: {nota}/5
          </Text>

        )}


        {/* COMENTÁRIO */}

        <TextInput

          style={styles.input}

          placeholder="Escreva sua avaliação..."

          placeholderTextColor={colors.inputPlaceholder}

          multiline

          numberOfLines={6}

          value={comentario}

          onChangeText={setComentario}

          textAlignVertical="top"

        />


        {/* BOTÃO */}

        <TouchableOpacity
          style={styles.botao}
          onPress={enviarAvaliacao}
        >

          <Text style={styles.textoBotao}>
            Enviar avaliação
          </Text>

        </TouchableOpacity>


        {/* VOLTAR PARA AVALIAÇÕES */}

        <TouchableOpacity
          onPress={() => navigation.navigate('avaliacao')}
        >

          <Text style={styles.voltar}>
            Ver avaliações
          </Text>

        </TouchableOpacity>

      </View>

    </Screen>

  );

}



const baseStyles = StyleSheet.create({

  container: {

    flexGrow: 1,

    backgroundColor: colors.canvas,

    alignItems: 'center'

  },


  // HEADER











  // CONTEÚDO

  conteudo: {

    width: '90%',

    maxWidth: 650,

    alignItems: 'center',

    paddingTop: 60,

    paddingBottom: 50

  },


  titulo: {

    fontSize: 30,

    fontWeight: 'bold',

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


  // ESTRELAS

  estrelas: {

    flexDirection: 'row',

    justifyContent: 'center',

    marginBottom: 10,

  },


  estrela: {

    fontSize: 36,

    marginHorizontal: 4,

  },


  estrelaNormal: {

    color: colors.line,

  },


  estrelaSelecionada: {

    color: colors.accent,

  },


  nota: {

    fontSize: 16,

    color: colors.ink,

    marginBottom: 25,

    fontWeight: '600',

  },


  // INPUT

  input: {

    width: '100%',

    maxWidth: 550,

    minHeight: 150,

    backgroundColor: colors.inputBackground,

    borderWidth: 2,

    borderColor: colors.line,

    borderRadius: 18,

    padding: 15,

    fontSize: 16,

    color: colors.inputText,

    marginBottom: 25,

  },


  // BOTÃO

  botao: {

    width: '100%',

    maxWidth: 350,

    backgroundColor: colors.accent,

    paddingVertical: 15,

    borderRadius: 25,

    alignItems: 'center',

    marginBottom: 20,

  },


  textoBotao: {

    color: colors.surface,

    fontSize: 17,

    fontWeight: 'bold',

  },


  voltar: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,

    marginBottom: 40

  }

});