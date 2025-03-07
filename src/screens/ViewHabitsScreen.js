// src/screens/ViewHabitsScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { WillHabitCard } from '../components/HabitCard';

function ViewHabitsScreen() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem('habits');
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load habits');
      console.error('Error loading habits:', error);
    }
  };

  const incrementCount = async (habitId) => {
    try {
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId) {
          return { ...habit, count: habit.count + 1 };
        }
        return habit;
      });

      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      setHabits(updatedHabits);
    } catch (error) {
      Alert.alert('Error', 'Failed to update habit count');
      console.error('Error incrementing count:', error);
    }
  };

  const decrementCount = async (habitId) => {
    try {
      const updatedHabits = habits.map(habit => {
        if (habit.id === habitId && habit.count > 0) {
          return { ...habit, count: habit.count - 1 };
        }
        return habit;
      });

      await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
      setHabits(updatedHabits);
    } catch (error) {
      Alert.alert('Error', 'Failed to update habit count');
      console.error('Error decrementing count:', error);
    }
  };

  const deleteHabit = async (habitId) => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedHabits = habits.filter(habit => habit.id !== habitId);
              await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
              setHabits(updatedHabits);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete habit');
              console.error('Error deleting habit:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>My Habits</Text>
        
        {habits.length === 0 ? (
          <Text style={styles.emptyStateText}>
            You haven't created any "I will" habits yet. Create one to get started!
          </Text>
        ) : (
          habits.map(habit => (
            <WillHabitCard
              key={habit.id}
              habit={habit}
              onDelete={deleteHabit}
              onIncrement={incrementCount}
              onDecrement={decrementCount}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewHabitsScreen;