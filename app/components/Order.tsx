// AddOrder.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Modal,
  FlatList,
  Linking,
} from 'react-native';
import { useProfile } from '../../context/ProfileContext';
import { supabase } from '../../lib/supabase';

// Import Expo Location & Task Manager
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

// A unique name for the background task
const LOCATION_TASK_NAME = 'driver-location-tracking';

// For demo only: store current order/email in global variables.
// In production, consider a more robust approach.
let CURRENT_ORDER_ID: number | null = null;
let CURRENT_DRIVER_EMAIL: string | null = null;



interface OrderItem {
  id: number;
  created_at: string;
  name: string;
  address: string;
  restaurant: string;
}

export default function AddOrder() {
  const { profile } = useProfile();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  // Fetch an order from Supabase by its ID.
  async function fetchOrderById(orderId: number): Promise<OrderItem | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`id, created_at, name, address, restaurant`)
      .eq('id', orderId)
      .single();
    if (error || !data) {
      return null;
    }
    return data as OrderItem;
  }

  // Called when the "Add Order" button is pressed.
  const handleAddOrderButton = () => {
    if (!profile) return;
    // Case 1: No restaurant selected.
    if (!profile.restaurant || profile.restaurant.trim() === '') {
      Alert.alert('No Restaurant Selected', 'Please select a restaurant in your profile.');
      return;
    }
    // Case 2: Restaurant selected but not verified.
    if (!profile.is_verified) {
      Alert.alert(
        'Not Verified',
        'Your account is not verified for your selected restaurant. Please wait for verification.'
      );
      return;
    }
    // Case 3: Restaurant selected and verified; show the modal to enter order ID.
    setModalVisible(true);
  };

  // Called when the user submits an order ID in the modal.
  const handleSubmitOrder = async () => {
    if (orderId === null || isNaN(orderId)) {
      Alert.alert('Invalid Input', 'Please enter a valid order ID.');
      return;
    }
    // Fetch the order details from Supabase.
    const order = await fetchOrderById(orderId);
    if (!order) {
      Alert.alert('Order Not Found', 'No order found with that ID.');
      return;
    }
    // Validate that the order's restaurant matches the driver's restaurant.
    if (order.restaurant !== profile?.restaurant) {
      Alert.alert('Order Mismatch', 'You can only add orders for your verified restaurant.');
      return;
    }
    // If valid, add the order to the orders list.
    setOrders((prevOrders) => [...prevOrders, order]);
    // Close the modal and reset the input.
    setModalVisible(false);
    setOrderId(null);
  };

  // Start background tracking for a given order
const handleStartTracking = async (orderId: number) => {
  console.log("start tracking", orderId);	
  if (!profile) return;
  console.log("diggeridoo", profile.email);
  // 1. Check Foreground Permission
  let fgPermissions = await Location.getForegroundPermissionsAsync();
  if (fgPermissions.status !== 'granted') {
    // Request again if not granted
    fgPermissions = await Location.requestForegroundPermissionsAsync();
  }

  // If still not granted, we must stop here
  if (fgPermissions.status !== 'granted') {
    Alert.alert(
      'Permission Denied',
      'Location permission is required to track your location.'
    );
    return;
  }

  // 2. Check Background Permission
  let bgPermissions = await Location.getBackgroundPermissionsAsync();
  if (bgPermissions.status !== 'granted') {
    // Request again if not granted
    bgPermissions = await Location.requestBackgroundPermissionsAsync();
  }

  // If still not granted, we must stop here
  if (bgPermissions.status !== 'granted') {
    Alert.alert(
      'Background Permission Denied',
      'Background location permission is required to track your location in the background.'
    );
    return;
  }
  console.log("orderid", orderId, profile.email);
  // Set global variables for the background task
  CURRENT_ORDER_ID = orderId;
  CURRENT_DRIVER_EMAIL = profile.email; // or whichever field you prefer

  // 3. Start background location updates every 15 seconds
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 15000, // 15 seconds
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Your location is being tracked',
      notificationBody: 'We are using your location to track your delivery.',
    },
  });
  console.log("start tracking 2", orderId);	
  Alert.alert('Tracking Started', `Location tracking started for order ${orderId}.`);
};

  // Called when the user finalizes an order (i.e. stops tracking).
  const handleFinalizeOrder = async (orderId: number) => {
    // Remove the order from the list
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    Alert.alert('Order Finalized', `Order ${orderId} has been finalized.`);

    // If the finalized order is the one being tracked, stop the background updates
    if (CURRENT_ORDER_ID === orderId) {
      try {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log("stop tracking", orderId, CURRENT_ORDER_ID, CURRENT_DRIVER_EMAIL);
        CURRENT_ORDER_ID = null;
        CURRENT_DRIVER_EMAIL = null;
        Alert.alert('Tracking Stopped', 'Location tracking has been stopped.');
      } catch (error) {
        console.error('Error stopping location updates:', error);
      }
    }
  };

  // Opens Google Maps with the order address.
  const openGoogleMaps = (address: string) => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    Linking.openURL(url);
  };

  // Render each order item in the list.
  const renderOrderItem = ({ item }: { item: OrderItem }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Name: {item.name}</Text>
      <Text style={styles.orderText}>Address: {item.address}</Text>
      <View style={styles.orderButtons}>
        <Button title="Open in Maps" onPress={() => openGoogleMaps(item.address)} />
        {/* New Button to start tracking */}
        <Button title="Start Tracking" onPress={() => handleStartTracking(item.id)} />
        <Button title="Finalize Order" onPress={() => handleFinalizeOrder(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Order" onPress={handleAddOrderButton} />

      {/* Modal for entering a new order ID */}
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
            <Button title="Submit Order" onPress={handleSubmitOrder} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* List of added orders */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrderItem}
        ListEmptyComponent={<Text>No orders added.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
  },
  orderItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 4,
  },
  orderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
