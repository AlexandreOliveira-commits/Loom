import { View, StyleSheet } from 'react-native';
import { colors } from './theme';

const stripes = [colors.transBlue, colors.transPink, colors.surface, colors.transPink, colors.transBlue];

export default function TransStripe({ style }) {
  return (
    <View style={[styles.band, style]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {stripes.map((color, index) => (
        <View key={index} style={[styles.stripe, { backgroundColor: color }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  band: { width: '100%', height: 30, overflow: 'hidden' },
  stripe: { flex: 1 },
});
