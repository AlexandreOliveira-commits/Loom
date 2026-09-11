import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

export default function Avaliacao({ navigation }) {
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

    <ScrollView contentContainerStyle={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.logo}>
          LOOM
        </Text>

        <View style={styles.menu}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Sobre')}
          >
            <Text style={styles.menuText}>
              Sobre
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Baixar')}
          >
            <Text style={styles.menuText}>
              Baixar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('avaliacao')}
          >
            <Text style={styles.menuSelecionado}>
              Avaliações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('midia')}
          >
            <Text style={styles.menuText}>
              Mídia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Perfil')}
          >
            <Text style={styles.menuText}>
              Perfil
            </Text>
          </TouchableOpacity>

        </View>

      </View>


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

          placeholderTextColor="#888"

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
          onPress={() => navigation.navigate('avalicao')}
        >

          <Text style={styles.voltar}>
            Ver avaliações
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>

  );

}



const styles = StyleSheet.create({

  container: {

    flexGrow: 1,

    backgroundColor: '#fff7fc',

    alignItems: 'center'

  },


  // HEADER

  header: {

    width: '100%',

    backgroundColor: '#FFFFFF',

    paddingHorizontal: 25,

    paddingVertical: 18,


    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',


    borderBottomWidth: 4,

    borderBottomColor: '#F5A9B8',

  },


  logo: {

    fontSize: 28,

    fontWeight: 'bold',

    color: '#5BCEFA',

  },


  menu: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 20,

  },


  menuText: {

    fontSize: 16,

    fontWeight: '600',

    color: '#444',

  },


  menuSelecionado: {

    fontSize: 16,

    fontWeight: 'bold',

    color: '#F5A9B8',

  },


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

    color: '#333333',

    textAlign: 'center',

  },


  subtitulo: {

    fontSize: 16,

    color: '#666666',

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

    fontSize: 48,

    marginHorizontal: 4,

  },


  estrelaNormal: {

    color: '#dddddd',

  },


  estrelaSelecionada: {

    color: '#ff9dcc',

  },


  nota: {

    fontSize: 16,

    color: '#555555',

    marginBottom: 25,

    fontWeight: '600',

  },


  // INPUT

  input: {

    width: '100%',

    maxWidth: 550,

    minHeight: 150,

    backgroundColor: '#ffffff',

    borderWidth: 2,

    borderColor: '#a8d8ff',

    borderRadius: 18,

    padding: 15,

    fontSize: 16,

    color: '#333333',

    marginBottom: 25,

  },


  // BOTÃO

  botao: {

    width: '100%',

    maxWidth: 350,

    backgroundColor: '#ff9dcc',

    paddingVertical: 15,

    borderRadius: 25,

    alignItems: 'center',

    marginBottom: 20,

  },


  textoBotao: {

    color: '#ffffff',

    fontSize: 17,

    fontWeight: 'bold',

  },


  voltar: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5BCEFA',

    marginBottom: 40

  }

});