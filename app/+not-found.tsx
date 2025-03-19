import { StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFound() {
  return (
    <>
    <Stack.Screen name="not-found" options={{title: 'Not Found'}} />
    <View style={styles.container}>
            <Text style={styles.text}>Not Found</Text>
            <Link href="/" style={styles.button}>Go to Home</Link>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'turquoise',
  },
});