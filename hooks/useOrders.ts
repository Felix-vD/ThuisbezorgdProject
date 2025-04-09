// hooks/useOrders.ts
import { useState } from 'react';
import { Alert, Linking } from 'react-native';
import { supabase } from '../lib/supabase';
import { useProfile } from '../context/ProfileContext';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'driver-location-tracking';

// Global variables for background tracking.
// In production consider a more robust solution.
let CURRENT_ORDER_ID: number | null = null;
let CURRENT_DRIVER_EMAIL: string | null = null;

// Background Task definition
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('LOCATION_TASK_NAME error:', error);
    return;
  }
  if (data) {
    const { locations } = data as any;
    for (const location of locations) {
      const { latitude, longitude } = location.coords;
      // Only perform the upsert if we have valid order and driver details
      if (CURRENT_ORDER_ID && CURRENT_DRIVER_EMAIL) {
        const { error: upsertError } = await supabase
          .from('driver_locations')
          .upsert(
            {
              order_id: CURRENT_ORDER_ID,
              driver_email: CURRENT_DRIVER_EMAIL,
              latitude,
              longitude,
              timestamp: new Date().toISOString(), // ISO string for your timestamptz column
            },
            { onConflict: "order_id,driver_email" }
          );

        if (upsertError) {
          console.error('Error upserting location:', upsertError.message);
        }
      }
    }
  }
});

export interface OrderItem {
  id: number;
  created_at: string;
  name: string;
  address: string;
  restaurant: string;
}

export function useOrders() {
  const { profile } = useProfile();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

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
  // This updated function re-fetches the profile from Supabase, ensuring the latest values.
  const handleAddOrderButton = async () => {
    if (!profile) return;

    // Re-fetch the latest profile data from Supabase.
    const { data: freshProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', profile.email)
      .single();

    if (error || !freshProfile) {
      Alert.alert('Error', 'Unable to fetch profile data, please try again later.');
      return;
    }

    if (!freshProfile.restaurant || freshProfile.restaurant.trim() === '') {
      Alert.alert('No Restaurant Selected', 'Please select a restaurant in your profile.');
      return;
    }
    if (!freshProfile.is_verified) {
      Alert.alert(
        'Not Verified',
        'Your account is not verified for your selected restaurant. Please wait for verification.'
      );
      return;
    }
    setModalVisible(true);
  };

  // Called when the user submits an order ID in the modal.
  const handleSubmitOrder = async () => {
    if (orderId === null || isNaN(orderId)) {
      Alert.alert('Invalid Input', 'Please enter a valid order ID.');
      return;
    }
    const order = await fetchOrderById(orderId);
    if (!order) {
      Alert.alert('Order Not Found', 'No order found with that ID.');
      return;
    }
    if (order.restaurant !== profile?.restaurant) {
      Alert.alert('Order Mismatch', 'You can only add orders for your verified restaurant.');
      return;
    }
    setOrders((prevOrders) => [...prevOrders, order]);
    setModalVisible(false);
    setOrderId(null);
  };

  // Start background tracking for a given order.
  const handleStartTracking = async (orderId: number) => {
    if (!profile) return;

    // Check foreground permission.
    let fgPermissions = await Location.getForegroundPermissionsAsync();
    if (fgPermissions.status !== 'granted') {
      fgPermissions = await Location.requestForegroundPermissionsAsync();
    }
    if (fgPermissions.status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to track your location.');
      return;
    }

    // Check background permission.
    let bgPermissions = await Location.getBackgroundPermissionsAsync();
    if (bgPermissions.status !== 'granted') {
      bgPermissions = await Location.requestBackgroundPermissionsAsync();
    }
    if (bgPermissions.status !== 'granted') {
      Alert.alert(
        'Background Permission Denied',
        'Background location permission is required to track your location in the background.'
      );
      return;
    }

    // Set global variables for the background task.
    CURRENT_ORDER_ID = orderId;
    CURRENT_DRIVER_EMAIL = profile.email;

    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 15000, // every 15 seconds
      distanceInterval: 0,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: 'Your location is being tracked',
        notificationBody: 'We are using your location to track your delivery.',
      },
    });

    Alert.alert('Tracking Started', `Location tracking started for order ${orderId}.`);
  };

  // Stop tracking for a given order.
  const handleStopTracking = async (orderId: number) => {
    // Remove the order from the list.
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    Alert.alert('Order Finalized', `Order ${orderId} has been finalized.`);
    if (CURRENT_ORDER_ID === orderId) {
      try {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        CURRENT_ORDER_ID = null;
        CURRENT_DRIVER_EMAIL = null;
        Alert.alert('Tracking Stopped', 'Location tracking has been stopped.');
      } catch (error) {
        console.error('Error stopping location updates:', error);
      }
    }
  };

  // Open Google Maps with the given address.
  const openGoogleMaps = (address: string) => {
    const query = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
    Linking.openURL(url);
  };

  return {
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
  };
}
