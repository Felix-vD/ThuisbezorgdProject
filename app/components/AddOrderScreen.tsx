// app/screens/AddOrderScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrders, OrderItem } from '../../hooks/useOrders';

export default function AddOrderScreen() {
  const {
    orders,
    modalVisible,
    setModalVisible,
    orderId,
    setOrderId,
    handleAddOrderButton,
    handleSubmitOrder,
    handleStartTracking,
    handleStopTracking,
    openGoogleMaps,
  } = useOrders();

  // Function to handle the info icon press.
  const handleInfoPress = () => {
    Alert.alert(
      'How to Use Orders',
      'Tap "Add Order" to create a new order. For each order, you can view details and tap "Maps" to see the location, "Start" to begin tracking, and "Stop" to end tracking.'
    );
  };

  // Render each order as a card with three action buttons.
  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardText}>Order ID: {item.id}</Text>
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Address: {item.address}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => openGoogleMaps(item.address)}>
          <Ionicons name="map-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleStartTracking(item.id)}>
          <Ionicons name="play-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleStopTracking(item.id)}>
          <Ionicons name="stop-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header for the Orders List */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity onPress={handleInfoPress} style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Add Order Button */}
      <TouchableOpacity style={styles.addOrderButton} onPress={handleAddOrderButton}>
        <Ionicons name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.addOrderButtonText}>Add Order</Text>
      </TouchableOpacity>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders added.</Text>}
        contentContainerStyle={styles.listContent}
      />

      {/* Order ID Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Order ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Order ID"
              keyboardType="numeric"
              value={orderId !== null ? String(orderId) : ''}
              onChangeText={(text) => setOrderId(Number(text))}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSubmitOrder}>
              <Text style={styles.modalButtonText}>Submit Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F39200',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoButton: {
    padding: 4,
  },
  // Add Order Button
  addOrderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F39200',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  addOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
  },
  // List Content Styles
  listContent: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
  // Order Card Styles
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardInfo: {
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F39200',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  modalButton: {
    backgroundColor: '#F39200',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
