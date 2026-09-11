import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
    <View style={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Baixar')}>
        <Text style={styles.botao2}>Baixar</Text>
      </TouchableOpacity>
    </View>
    
    </View>
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
container: {
    flex: 1,
    backgroundColor: '#e3f7ff',
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
  conteudo:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botao: {
    backgroundColor: '#ffb9d4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  botao2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fef9f9',
  }
});