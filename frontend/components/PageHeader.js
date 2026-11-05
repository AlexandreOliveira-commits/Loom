import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
const links = [['Sobre', 'Sobre'], ['Jogar', 'Jogar'], ['avaliacao', 'Avaliações'], ['midia', 'Mídia'], ['Perfil', 'Perfil']];
export default function PageHeader({ backToProfile = false }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const compact = width < 600;
  const review = route.name === 'avaliacao';
  const desktop = width >= 1024;
  const selected = route.name === 'Perfil' || route.name === 'FazerAvaliacao';
  return (
    <View style={[styles.header, backToProfile && styles.editHeader, review && styles.reviewHeader, compact && styles.compact]}>
      <Text style={[styles.logo, (review || backToProfile) && styles.largeLogo]}>LOOM</Text>
      <View style={[styles.menu, review && { gap: 22 }, compact && styles.compactMenu]}>
        {(backToProfile ? [['Perfil', 'Voltar ao perfil']] : links).map(([name, label]) => (
          <TouchableOpacity key={name} onPress={() => navigation.navigate(name)}
            accessibilityRole="button" accessibilityState={{ selected: route.name === name }} style={!desktop && styles.link}>
            <Text style={[styles.text, backToProfile && { fontSize: 14 }, review && { fontSize: 15 }, selected && (route.name === name || (route.name === "FazerAvaliacao" && name === "avaliacao")) && styles.selected]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: { width: '100%', backgroundColor: '#FFFFFF', paddingHorizontal: 25, paddingVertical: 18,
    flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center',
    borderBottomWidth: 4, borderBottomColor: '#F5A9B8' },
  editHeader: { paddingHorizontal: 35, borderBottomWidth: 3, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 5 },
  reviewHeader: { borderBottomWidth: 3, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 5 },
  largeLogo: { fontSize: 30, fontWeight: '900', letterSpacing: 3 },
  compact: { flexDirection: 'column', paddingHorizontal: 12, gap: 4 },
  logo: { fontSize: 28, fontWeight: 'bold', color: '#5BCEFA' },
  menu: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 20, maxWidth: '100%' },
  compactMenu: { justifyContent: 'center' },
  link: { minHeight: 44, paddingHorizontal: 8, justifyContent: 'center' },
  text: { fontSize: 16, fontWeight: '600', color: '#444' },
  selected: { color: '#F5A9B8', fontWeight: 'bold' },
});
