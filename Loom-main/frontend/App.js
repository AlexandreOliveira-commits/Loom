import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './Navigation/StackNavigator';
export default function App() {
  return <SafeAreaProvider><StackNavigator /></SafeAreaProvider>;
}
