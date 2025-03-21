import {Text, View, StyleSheet} from 'react-native';
import OrdersList from './components/OrdersList';
import AddOrder from './components/Order';
export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <AddOrder></AddOrder>
      <Text style={styles.text}>About Screen BAABYYY!</Text>
    </View>
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
  });