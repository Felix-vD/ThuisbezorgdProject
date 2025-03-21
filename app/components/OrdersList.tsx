import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  Button, 
  Linking 
} from 'react-native';

// Define the Order interface
interface Order {
  id: number;
  name: string;
  address: string;
}

export default function OrdersList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Orders array typed as Order[]
  const orders: Order[] = [
    { id: 1, name: 'Order 1', address: '123 Main St, Cityville' },
    { id: 2, name: 'Order 2', address: 'Stationsplein 1, 8011 AD Zwolle, Netherlands' },
  ];

  // Handle tapping on an order
  const handlePressOrder = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  // Open Google Maps with the selected order's address.
  const handleOpenMaps = () => {
    if (selectedOrder) {
      const query = encodeURIComponent(selectedOrder.address);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
      Linking.openURL(url);
    }
  };

  // Render each order box.
  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderBox} onPress={() => handlePressOrder(item)}>
      <Text style={styles.orderText}>{item.name}</Text>
      <Text style={styles.orderText}>ID: {item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders List</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOrder && (
              <>
                <Text style={styles.modalTitle}>{selectedOrder.name}</Text>
                <Text>ID: {selectedOrder.id}</Text>
                <Text>Address: {selectedOrder.address}</Text>
                <Button title="Open in Google Maps" onPress={handleOpenMaps} />
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderBox: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
