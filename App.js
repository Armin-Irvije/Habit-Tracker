import { StatusBar } from 'expo-status-bar';
import { UseDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Habit Tracker</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Start tracking pressed")}
          >
            <Text style={styles.buttonText}>Start Tracking a Habit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.quitButton]}
            onPress={() => console.log("Start quitting pressed")}
          >
            <Text style={styles.buttonText}>Start Quitting a Habit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2c3e50',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  quitButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});