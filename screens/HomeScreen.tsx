// screens/HomeScreen.tsx
import { useState, useEffect } from "react";
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

  return (
    <View style={styles.container}>
      <FlatList
        data={azkarData}
        renderItem={({ item }) => (
          <AzkarCard id={item.id} text={item.text} targetCount={item.count} />
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
