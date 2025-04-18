// screens/ProfileScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import global from '../styles/global'; // Your global styles
import { Session } from '@supabase/supabase-js';
import useProfileForm from '../../hooks/useProfileForm';
import { supabase } from '../../lib/supabase';

interface ProfileScreenProps {
  session: Session;
}

export default function ProfileScreen({ session }: ProfileScreenProps) {
  const {
    loading,
    username,
    setUsername,
    restaurant,
    setRestaurant,
    restaurants,
    updateProfile,
  } = useProfileForm(session);

  return (
    <SafeAreaView style={[global.container, styles.safeContainer]}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={[global.title, styles.headerTitle]}>Account Profile</Text>

        {/* Email Display */}
        <View style={styles.formGroup}>
          <Text style={global.label}>Email</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>{session?.user?.email}</Text>
          </View>
        </View>

        {/* Username Input */}
        <View style={styles.formGroup}>
          <Text style={global.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Restaurant Picker */}
        <View style={styles.formGroup}>
          <Text style={global.label}>Restaurant</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={restaurant}
              onValueChange={(itemValue) => setRestaurant(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="None" value="" />
              {restaurants.map((rest) => (
                <Picker.Item key={rest.id} label={rest.name} value={rest.name} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {/* Footer Buttons at the bottom */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={updateProfile}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => {
            supabase.auth.signOut();
            // Optionally navigate to the login screen after signing out.
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 20,
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: 15,
  },
  emailContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: '#fff',
  },
  footer: {
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: '#F39200',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#c00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
