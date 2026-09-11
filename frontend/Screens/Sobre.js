import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
      <Text style={styles.logo}>LOOM</Text>

      <View style={styles.menu}>

        <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
          <Text style={styles.subtitle}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Baixar')}>
          <Text style={styles.subtitle}>Baixar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('avaliacao')}>
          <Text style={styles.subtitle}>Avaliações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('midia')}>
          <Text style={styles.subtitle}>Mídia</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.subtitle}>Perfil</Text>
        </TouchableOpacity>

      </View>
      </View>

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
          
          <View style={styles.sobre2}>
            <Text style={styles.Autores}>Alexandre Eduardo Oliveira da Silva Foi o principal desenvolvedor e pesquisador do projeto LOOM</Text>
            <Image source={require('../imagens/fotoPerfil.jpg')} style={styles.imagemAutores} />
            <Text style={styles.titulo}>Autores</Text>
            <Image source={require('../imagens/FOTOperfil.jpeg')} style={styles.imagemAutores} />
            <Text style={styles.Autores}>Milena da Silva de Barros Foi a principal artista e designer do projeto LOOM</Text>
          </View>
        </View>
    </ScrollView>
    
    
  );
}

const styles = StyleSheet.create({
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

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

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
      justifyContent: 'space-evenly',
    },
    sobre2:{
      marginTop: 100,
      display: 'flex',
      alignItems:'center',
      flexDirection:'row',
      justifyContent: 'space-evenly',
    },
    imagem: {
    width: 350,
    height:200,
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
      marginTop: 50,
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