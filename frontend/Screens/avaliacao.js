import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function Avaliacao({ navigation }) {

  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    buscarAvaliacoes();
  }, []);

  async function buscarAvaliacoes() {
    try {

      const resposta = await fetch(
        'http://localhost:3000/verAvaliacao'
      );

      const dados = await resposta.json();

      setAvaliacoes(dados);

    } catch (erro) {
      console.log('Erro ao buscar avaliações:', erro);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <Text style={styles.logo}>LOOM</Text>

        <View style={styles.menu}>

          <TouchableOpacity
            onPress={() => navigation.navigate('Sobre')}
          >
            <Text style={styles.menuText}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Baixar')}
          >
            <Text style={styles.menuText}>Baixar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('avaliacao')}
          >
            <Text style={styles.menuText}>
              Avaliações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('midia')}
          >
            <Text style={styles.menuText}>Mídia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Perfil')}
          >
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>

        </View>

      </View>


      {/* CONTEÚDO */}

      <View style={styles.conteudo}>

        <Image
          source={require('../imagens/LOGO.png')}
          style={styles.imagem}
        />

        <Text style={styles.titulo}>
          Avaliações do LOOM
        </Text>

        <Text style={styles.subtitulo}>
          Veja o que outras pessoas acharam do jogo
        </Text>


        {/* AVALIAÇÕES */}

        <View style={styles.listaAvaliacoes}>

          {avaliacoes.length === 0 ? (

            <Text style={styles.semAvaliacao}>
              Nenhuma avaliação ainda.
            </Text>

          ) : (

            avaliacoes.map((avaliacao, index) => (

              <View
                style={styles.card}
                key={index}
              >

                <Text style={styles.estrelas}>
                  {'★'.repeat(avaliacao.nota)}
                  {'☆'.repeat(5 - avaliacao.nota)}
                </Text>

                <Text style={styles.nota}>
                  Nota: {avaliacao.nota}/5
                </Text>

                <Text style={styles.comentario}>
                  {avaliacao.comentario}
                </Text>

              </View>

            ))

          )}

        </View>


        {/* BOTÃO PARA FAZER A PRÓPRIA AVALIAÇÃO */}

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('FazerAvaliacao')}
        >
          <Text style={styles.textoBotao}>
            Fazer minha avaliação
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
    borderBottomColor: '#F5A9B8'
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5BCEFA'
  },

  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },

  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444'
  },


  // CONTEÚDO

  conteudo: {
    width: '90%',
    maxWidth: 650,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 50
  },


  imagem: {
    width: 350,
    height: 200,
    resizeMode: 'contain'
  },


  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginTop: 15
  },

  subtitulo: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center'
  },


  // LISTA

  listaAvaliacoes: {
    width: '100%',
    alignItems: 'center'
  },


  // CARD

  card: {
    width: '100%',
    maxWidth: 550,

    backgroundColor: '#ffffff',

    padding: 20,

    borderRadius: 20,

    marginBottom: 20,

    borderWidth: 2,
    borderColor: '#d7efff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3
  },


  estrelas: {
    fontSize: 25,
    color: '#F5A9B8',
    marginBottom: 8
  },

  nota: {
    fontSize: 15,
    color: '#5BCEFA',
    fontWeight: 'bold',
    marginBottom: 10
  },

  comentario: {
    fontSize: 16,
    color: '#444444',
    lineHeight: 23
  },


  semAvaliacao: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 30
  },


  // BOTÃO

  botao: {
    width: '100%',
    maxWidth: 350,

    backgroundColor: '#F5A9B8',

    paddingVertical: 15,

    borderRadius: 25,

    alignItems: 'center',

    marginTop: 20,
    marginBottom: 40
  },

  textoBotao: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold'
  }

});