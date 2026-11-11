import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
// The navigation header already handles the top safe area.
export default function Screen({ children, style, contentContainerStyle, ...props }) {
  const headerHeight = useHeaderHeight();
  const backgroundColor = StyleSheet.flatten(style)?.backgroundColor || StyleSheet.flatten(contentContainerStyle)?.backgroundColor;
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={[styles.fill, { backgroundColor }]}>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={headerHeight}>
        <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'} {...props} style={[styles.fill, style]}
          contentContainerStyle={[styles.content, contentContainerStyle]}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({ fill: { flex: 1, minWidth: 0 }, content: { flexGrow: 1 } });
