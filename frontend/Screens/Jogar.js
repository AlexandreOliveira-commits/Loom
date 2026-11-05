import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const navigation = useNavigation();

  return (
    <Screen contentContainerStyle={styles.container}>
    <PageHeader />
    <View style={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Baixar')}>
        <Text style={styles.botao2}>Baixar</Text>
      </TouchableOpacity>
    </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
container: {
    flexGrow: 1,
    backgroundColor: '#e3f7ff',
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