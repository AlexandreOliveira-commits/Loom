import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import TransStripe from './TransStripe';
import { colors } from './theme';

const links = [['Sobre', 'Sobre'], ['Jogar', 'Jogar'], ['avaliacao', 'Avaliações'], ['midia', 'Mídia'], ['Perfil', 'Perfil']];

export default function PageHeader({ backToProfile = false }) {
  const navigation = useNavigation();
  const route = useRoute();
  const activeRoute = route.name === 'FazerAvaliacao' ? 'avaliacao' : route.name;

  return (
    <View style={styles.header}>
      <TransStripe />
      <View style={styles.inner}>
        <Text style={styles.logo}>LOOM</Text>
        <View style={styles.menu}>
          {(backToProfile ? [['Perfil', 'Voltar ao perfil']] : links).map(([name, label]) => {
            const selected = name === activeRoute;
            return (
              <TouchableOpacity key={name} onPress={() => navigation.navigate(name)}
                accessibilityRole="button" accessibilityState={{ selected }}
                style={[styles.link, selected && styles.activeLink]}>
                <Text style={[styles.label, selected && styles.activeLabel]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { width: '100%', backgroundColor: colors.ink },
  inner: {
    width: '100%', maxWidth: 1120, alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 16,
    flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 8,
  },
  logo: { color: '#f5d6f1', fontSize: 24, fontWeight: '900', letterSpacing: 5 },
  menu: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, maxWidth: '100%' },
  link: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 10, borderRadius: 10 },
  activeLink: { backgroundColor: colors.tint },
  label: { color: colors.corTextoRosa, fontSize: 14, fontWeight: '600' },
  activeLabel: { color: colors.primary, fontWeight: '800' },
});
