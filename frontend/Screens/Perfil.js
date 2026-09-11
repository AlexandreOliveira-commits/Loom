import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

export default function Perfil() {
    function EditarPerfil() {
        navigation.navigate('editarPerfil');
    }
    

  const navigation = useNavigation();

  return (

    <View style={styles.container}>

      {/* MENU */}

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
            <Text style={styles.perfilSelecionado}>Perfil</Text>
          </TouchableOpacity>

        </View>

      </View>


      {/* CONTEÚDO DO PERFIL */}

      <View style={styles.conteudo}>

        <View style={styles.card}>

          {/* FOTO DE PERFIL */}

          <View style={styles.foto}>
            <Text style={styles.inicial}>A</Text>
          </View>


          <Text style={styles.nome}>
            Seu nome
          </Text>

          <Text style={styles.email}>
            seuemail@email.com
          </Text>


          <View style={styles.divisor} />


          <View style={styles.informacoes}>

            <Text style={styles.label}>
              Nome
            </Text>

            <Text style={styles.valor}>
              Seu nome
            </Text>


            <Text style={styles.label}>
              Email
            </Text>

            <Text style={styles.valor}>
              seuemail@email.com
            </Text>

          </View>


          <TouchableOpacity style={styles.botao}>

            <Text style={styles.textoBotao} onPress={EditarPerfil}>
              Editar perfil
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FDEBF2',
  },


  /* HEADER */

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


  perfilSelecionado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5A9B8',
  },


  /* CONTEÚDO */

  conteudo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,

  },


  card: {

    width: '90%',
    maxWidth: 450,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderTopWidth: 6,
    borderTopColor: '#5BCEFA',
    borderBottomWidth: 6,
    borderBottomColor: '#F5A9B8',
  },


  /* FOTO */

  foto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#5BCEFA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#F5A9B8',
    marginBottom: 15,
  },

  inicial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },


  /* DADOS */

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },


  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },


  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 25,
  },


  informacoes: {
    width: '100%',
  },


  label: {
    fontSize: 13,
    color: '#F5A9B8',
    fontWeight: 'bold',
    marginBottom: 4,
  },


  valor: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  botao: {
    width: '100%',
    height: 48,
    backgroundColor: '#5BCEFA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,

  },


  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',

  },

});