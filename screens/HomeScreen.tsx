// screens/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AzkarCard from "../components/AzkarCard";
import { morningEveningAzkar as azkarData } from "../data/azkar.json";
import notifee from "@notifee/react-native";
import { Button } from "../components/Button";

type ZikrType = keyof (typeof azkarData)[0];

const STORAGE_KEY = "azkarCounts";

const HomeScreen = () => {
  const [azkarCounts, setAzkarCounts] = useState<{ [key: number]: number }>({});

  // Load counts from AsyncStorage on mount
  useEffect(() => {
    const loadCounts = async () => {
      const savedCounts = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedCounts) {
        setAzkarCounts(JSON.parse(savedCounts));
      }
    };
    loadCounts();
  }, []);

  // Save counts to AsyncStorage whenever they change
  useEffect(() => {
    const saveCounts = async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(azkarCounts));
    };
    saveCounts();
  }, [azkarCounts]);

  // Function to increment the count for a specific Zikr
  const handleIncrement = (id: number, targetCount: number) => {
    // check if the count is equal to the target count
    if (azkarCounts[id] === targetCount) {
      return;
    }
    setAzkarCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  // Function to reset all counts
  const handleReset = () => {
    setAzkarCounts({});
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Notification Title",
      body: "Main body content of the notification",
      android: {
        channelId,
        smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default",
        },
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button onPress={onDisplayNotification} text="Display Notification" />
      <FlatList
        data={azkarData}
        renderItem={({ item }) => (
          <AzkarCard
            id={item.id}
            text={item.text}
            // count={azkarCounts[item.id] || 0}
            targetCount={item.count}
            // onIncrement={() => handleIncrement(item.id, item.count)}
            // onReset={handleReset}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  resetButton: {
    backgroundColor: "#FF4444",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomeScreen;
