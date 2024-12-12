import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Bien le bonjour mon ami !</Text>
    //   <StatusBar style="auto" />
    // </View>
    <AppNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
