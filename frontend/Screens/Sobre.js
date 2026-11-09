import { colors } from '../components/theme';
import Screen from '../components/Screen';
import PageHeader from '../components/PageHeader';
import TransStripe from '../components/TransStripe';
import { View, Text, StyleSheet, Image } from 'react-native';

const authors = [
  { name: 'Alexandre Eduardo Oliveira da Silva', role: 'Desenvolvimento e pesquisa', image: require('../imagens/fotoPerfil.jpg') },
  { name: 'Milena da Silva de Barros', role: 'Arte e design', image: require('../imagens/FOTOperfil.jpeg') },
];

export default function Sobre() {
  return (
    <Screen style={styles.screen}>
      <PageHeader />
      <View style={styles.content}>
        <View style={styles.hero}>
          <TransStripe style={styles.heroFlag} />
          <View style={styles.heroContent}>
            <Image source={require('../imagens/LOGO.png')} style={styles.logo} resizeMode="contain" accessibilityLabel="LOOM" />
            <Text style={styles.kicker}>TERROR PSICOLÓGICO</Text>
            <Text accessibilityRole="header" style={styles.title}>Sobre o jogo</Text>
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>A história</Text>
            <Text style={styles.body}>LOOM é um jogo de terror psicológico que busca representar, através de metáforas e elementos simbólicos, algumas das dificuldades enfrentadas por pessoas trans e travestis. A história aborda temas como identidade de gênero, preconceito, aceitação e relações sociais.</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>A experiência</Text>
            <Text style={styles.body}>Ao longo do jogo, o jogador explora diferentes ambientes e vivencia situações relacionadas à família, escola, amizades e sociedade. O terror é construído pela atmosfera, pelos cenários e pela narrativa, sem depender de violência gráfica para causar tensão.</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>O propósito</Text>
            <Text style={styles.body}>Além de proporcionar uma experiência de terror, LOOM busca conscientizar o jogador sobre as vivências de pessoas trans e travestis. A proposta é utilizar o jogo como uma forma de entretenimento capaz de gerar reflexão, compreensão e empatia.</Text>
          </View>
        </View>
        <Text accessibilityRole="header" style={styles.sectionTitle}>Autores</Text>
        <View style={styles.grid}>
          {authors.map(({ name, role, image }) => (
            <View key={name} style={[styles.card, styles.author]}>
              <Image source={image} style={styles.avatar} />
              <View style={styles.bio}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.body}>{role}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.canvas },
  content: { width: '100%', maxWidth: 1152, alignSelf: 'center', padding: 16, paddingBottom: 48 },
  hero: { backgroundColor: colors.surface, borderRadius: 24, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: colors.line },
  heroFlag: { height: 100 },
  heroContent: { alignItems: 'center', padding: 24 },
  logo: { width: '100%', maxWidth: 320, height: 140 },
  kicker: { color: colors.accent, fontSize: 12, fontWeight: '800', letterSpacing: 2 },
  title: { color: colors.ink, fontSize: 36, fontWeight: '900', textAlign: 'center', marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: { flexBasis: 245, flexGrow: 1, flexShrink: 1, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, borderRadius: 20, padding: 20, gap: 8 },
  cardTitle: { color: colors.ink, fontSize: 18, fontWeight: '800' },
  body: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  sectionTitle: { color: colors.ink, fontSize: 26, fontWeight: '800', marginTop: 32, marginBottom: 12 },
  author: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  bio: { flex: 1 },
});
