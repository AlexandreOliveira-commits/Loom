import { useWindowDimensions } from 'react-native';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Sobre() {
  const { width } = useWindowDimensions();
  const compact = width < 1024;
  const overrides = { conteudo: compact ? { width: '100%', paddingBottom: 24 } : {},
 imagem: { width: compact ? Math.min(350, width) : 350, height: compact ? Math.min(350, width) / 1.75 : 200 },
 sobre: compact ? { flexWrap: 'wrap', gap: 20, paddingHorizontal: 16 } : { flexWrap: 'nowrap', gap: 0, paddingHorizontal: 0 },
 sobre2: compact ? { flexWrap: 'wrap', gap: 20, paddingHorizontal: 16, marginTop: 48, marginBottom: 32 } : { flexWrap: 'nowrap', gap: 0, paddingHorizontal: 0, marginTop: 100, marginBottom: 0 },
 descricao: compact ? { height: 'auto', width: '100%', flexBasis: 280, flexGrow: 1, flexShrink: 1, maxWidth: 360, minHeight: 300, paddingVertical: 20, marginTop: 24 } : { width: 300, height: 300, marginTop: 50 } };
  const styles = Object.fromEntries(Object.entries(baseStyles).map(([key, value]) => [key, [value, overrides[key]]]));

  return (
    <Screen style={styles.container}>
        <PageHeader />

      <Image source={require('../imagens/LOGO.png')}
                                   style={styles.imagem} ></Image>

        <View style={styles.conteudo}>
            <Text style={styles.titulo}>Sobre o Jogo</Text>
            <View style={styles.sobre}>


            <View style={styles.descricao}>
            <Text style={styles.texto}>
               LOOM é um jogo de terror psicológico que busca representar, através de metáforas e elementos simbólicos, algumas das dificuldades
                enfrentadas por pessoas trans e travestis. A história aborda temas como identidade de gênero, preconceito, aceitação e relações
                sociais.
            </Text>

            </View>
            <View style={styles.descricao}>
               <Text style={styles.texto}>
              Ao longo do jogo, o jogador explora diferentes ambientes e vivencia situações relacionadas à família, escola, amizades e sociedade.
               O terror é construído pela atmosfera, pelos cenários e pela narrativa, sem depender de violência gráfica para causar tensão.
              </Text>
            </View>
            <View style={styles.descricao}>
               <Text style={styles.texto}>
             Além de proporcionar uma experiência de terror, LOOM busca conscientizar o jogador sobre as vivências de pessoas trans e travestis.
              A proposta é utilizar o jogo como uma forma de entretenimento capaz de gerar reflexão, compreensão e empatia.
              </Text>
            </View>

          </View>

          {compact ? <>
          <Text style={styles.titulo}>Autores</Text>
          <View style={styles.sobre2}>
            <View style={styles.autor}>
              <Image source={require('../imagens/fotoPerfil.jpg')} style={styles.imagemAutores} />
              <Text style={styles.Autores}>Alexandre Eduardo Oliveira da Silva Foi o principal desenvolvedor e pesquisador do projeto LOOM</Text>
            </View>
            <View style={styles.autor}>
              <Image source={require('../imagens/FOTOperfil.jpeg')} style={styles.imagemAutores} />
              <Text style={styles.Autores}>Milena da Silva de Barros Foi a principal artista e designer do projeto LOOM</Text>
            </View>
          </View>
          </> : (<View style={styles.sobre2}>
            <Text style={styles.Autores}>Alexandre Eduardo Oliveira da Silva Foi o principal desenvolvedor e pesquisador do projeto LOOM</Text>
            <Image source={require('../imagens/fotoPerfil.jpg')} style={styles.imagemAutores} />
            <Text style={styles.titulo}>Autores</Text>
            <Image source={require('../imagens/FOTOperfil.jpeg')} style={styles.imagemAutores} />
            <Text style={styles.Autores}>Milena da Silva de Barros Foi a principal artista e designer do projeto LOOM</Text>
          </View>)}
        </View>
    </Screen>


  );
}

const baseStyles = StyleSheet.create({




    container: {
    flex: 1,
    backgroundColor: '#FDEBF2',
  },
  texto: {
    fontSize: 18,
    color: '#f8fcff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    },
    titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5BCEFA',
    textAlign: 'center',
    marginTop: 20,
    },
    sobre:{
      display: 'flex',
      alignItems:'center',
      flexDirection:'row',
      flexWrap: 'wrap',
      gap: 20,
      paddingHorizontal: 16,
      justifyContent: 'space-evenly',
    },
    sobre2:{
      marginTop: 48,
      marginBottom: 32,
      display: 'flex',
      alignItems:'center',
      flexDirection:'row',
      flexWrap: 'wrap',
      gap: 20,
      paddingHorizontal: 16,
      justifyContent: 'space-evenly',
    },
    imagem: {
    width: 350,
    height: 200,
    display: 'flex',
    alignSelf: 'center',
  },
    descricao:{
      backgroundColor: '#abdcff',
      width: 300,
      height: 300,
      display:'flex',
      alignItems:'center',
      justifyContent: 'center',
      borderRadius: 20,
      marginTop: 24,
    },
    imagemAutores: {
      width: 200,
      height: 200,
      borderRadius: 40,
      borderColor: '#5BCEFA',
      borderWidth: 4,
      marginTop: 20,
      alignSelf: 'center',
    },
    autor: { alignItems: 'center', width: '100%', maxWidth: 320 },
    conteudo: {},
    Autores:{
      fontSize: 18,
      color: '#f8fcff',
      textAlign: 'center',
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginTop: 20,
      width: 200,
      backgroundColor: '#abdcff',
      borderRadius: 20,
      padding: 10,
    }
});