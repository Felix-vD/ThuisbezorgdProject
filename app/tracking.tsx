import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";

export default function GetCurrentLocationExample(): JSX.Element {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current position:</Text>
      <Text>{errorMsg ? errorMsg : JSON.stringify(location, null, 2)}</Text>
      <Button
        title="Get Location"
        onPress={async () => {
          const newLocation = await Location.getCurrentPositionAsync({});
          setLocation(newLocation);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
});
