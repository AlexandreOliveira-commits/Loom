import { colors } from '../components/theme';
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
      <View style={styles.card}>
        <Text style={styles.kicker}>LOOM</Text>
        <Text accessibilityRole="header" style={styles.title}>Jogar</Text>
        <Text style={styles.description}>Uma experiência de terror psicológico.</Text>
      <TouchableOpacity accessibilityRole="button" style={styles.botao} onPress={() => navigation.navigate('Baixar')}>
        <Text style={styles.botao2}>Baixar</Text>
      </TouchableOpacity>
      </View>
    </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
container: {
    flexGrow: 1,
    backgroundColor: colors.canvas,
  },


  conteudo:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: { width: '100%', maxWidth: 520, alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 24, padding: 28, gap: 12 },
  kicker: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 3 },
  title: { color: colors.ink, fontSize: 36, fontWeight: '900' },
  description: { color: colors.muted, fontSize: 16, textAlign: 'center', marginBottom: 8 },
  botao: {
    backgroundColor: colors.accent,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  botao2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fef9f9',
  }
});