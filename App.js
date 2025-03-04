import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { EnhancedBadgeRow, milestones } from './enhancedBadges';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

//TODO: the screen stack of creating a habit then going to that habit then going back to creation
//TODO: notification for I will habits
//TODO: calender view of times done (git hub calender)
//TODO: separate screens into different files
//TODO: add more visuals and styles

// Modified Home Screen Component with Adat Header
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Adat Header */}
        <View style={styles.adatHeader}>
          <View style={styles.logoContainer}>
            <Feather name="octagon" size={32} color="#4B4E6D" />
            <Text style={styles.logoText}>Adat</Text>
          </View>
          <Text style={styles.tagline}>Transform your habits, shape your future</Text>

          {/* Motivational Icons */}
          <View style={styles.iconContainer}>
            <View style={styles.iconItem}>
              <Feather name="target" size={24} color="#4B4E6D" />
              <Text style={styles.iconText}>Focus</Text>
            </View>
            <View style={styles.iconItem}>
              <Feather name="arrow-up-circle" size={24} color="#4B4E6D" />
              <Text style={styles.iconText}>Growth</Text>
            </View>
            <View style={styles.iconItem}>
              <Feather name="star" size={24} color="#4B4E6D" />
              <Text style={styles.iconText}>Progress</Text>
            </View>
            <View style={styles.iconItem}>
              <Feather name="moon" size={24} color="#4B4E6D" />
              <Text style={styles.iconText}>Balance</Text>
            </View>
            <View style={styles.iconItem}>
              <Feather name="sun" size={24} color="#4B4E6D" />
              <Text style={styles.iconText}>Energy</Text>
            </View>
          </View>
        </View>

        {/* Existing Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddHabit')}
          >
            <Text style={styles.buttonText}>Create New Habit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate('ViewHabits')}
          >
            <Text style={styles.buttonText}>Check my "I will" habits</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewButton]}
            onPress={() => navigation.navigate('ViewQuittingHabits')}
          >
            <Text style={styles.buttonText}>Check my "I won't" habits</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// Combined Add Habit Screen Component
function AddHabitScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [habitType, setHabitType] = useState(null);

  const saveHabit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a habit title');
      return;
    }

    if (!habitType) {
      Alert.alert('Error', 'Please select a habit type');
      return;
    }

    try {
      if (habitType === 'will') {
        const newHabit = {
          id: Date.now().toString(),
          title,
          description,
          count: 0,
          dateCreated: new Date().toISOString(),
        };

        const existingHabits = await AsyncStorage.getItem('habits');
        const habits = existingHabits ? JSON.parse(existingHabits) : [];
        habits.push(newHabit);
        await AsyncStorage.setItem('habits', JSON.stringify(habits));
        navigation.navigate('ViewHabits');
      } else {
        const newQuittingHabit = {
          id: Date.now().toString(),
          title,
          description,
          startTime: new Date().toISOString(),
          lastRelapseTime: null,
        };

        const existingQuittingHabits = await AsyncStorage.getItem('quittingHabits');
        const quittingHabits = existingQuittingHabits ? JSON.parse(existingQuittingHabits) : [];
        quittingHabits.push(newQuittingHabit);
        await AsyncStorage.setItem('quittingHabits', JSON.stringify(quittingHabits));
        navigation.navigate('ViewQuittingHabits');
      }

      Alert.alert('Success', 'Habit saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save habit');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>New Habit</Text>
        <View style={styles.typeSelection}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              habitType === 'will' && styles.selectedTypeButton
            ]}
            onPress={() => setHabitType('will')}
          >
            <Text style={[
              styles.typeButtonText,
              habitType === 'will' && styles.selectedTypeButtonText
            ]}>I will</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              habitType === 'wont' && styles.selectedTypeButton
            ]}
            onPress={() => setHabitType('wont')}
          >
            <Text style={[
              styles.typeButtonText,
              habitType === 'wont' && styles.selectedTypeButtonText
            ]}>I won't</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Habit Title"
          placeholderTextColor="#666"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description (optional)"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={[styles.button, !habitType && styles.disabledButton]}
          onPress={saveHabit}
          disabled={!habitType}
        >
          <Text style={styles.buttonText}>Save Habit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}





// View Quitting Habits Screen Component
function ViewQuittingHabitsScreen({ navigation }) {
  const [quittingHabits, setQuittingHabits] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  // New state to track newly achieved milestone for animation
  const [newlyAchievedMilestone, setNewlyAchievedMilestone] = useState(null);

  useEffect(() => {
    loadQuittingHabits();

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadQuittingHabits = async () => {
    try {
      const savedQuittingHabits = await AsyncStorage.getItem('quittingHabits');
      if (savedQuittingHabits) {
        let habits = JSON.parse(savedQuittingHabits);

        // Add achievedMilestones array if it doesn't exist
        habits = habits.map(habit => ({
          ...habit,
          achievedMilestones: habit.achievedMilestones || []
        }));

        setQuittingHabits(habits);

        // Check for new milestones after loading
        updateMilestones(habits);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load quitting habits');
    }
  };

  // Updated function to track newly achieved milestones
  const updateMilestones = async (habits) => {
    const updatedHabits = habits.map(habit => {
      const timeDiffSeconds = calculateTimeDifferenceInSeconds(habit.startTime, habit.lastRelapseTime);

      // Check each milestone
      const newAchievedMilestones = [...(habit.achievedMilestones || [])];
      let latestNewMilestone = null;

      milestones.forEach(milestone => {
        if (timeDiffSeconds >= milestone.seconds && !newAchievedMilestones.includes(milestone.id)) {
          newAchievedMilestones.push(milestone.id);
          latestNewMilestone = milestone.id;
        }
      });

      // If new milestones were achieved
      if (newAchievedMilestones.length > (habit.achievedMilestones || []).length) {
        // Find the latest milestone achieved for notification
        const newMilestones = newAchievedMilestones.filter(
          m => !(habit.achievedMilestones || []).includes(m)
        );

        if (newMilestones.length > 0) {
          // Get the most significant milestone (the one with the longest time)
          const latestMilestone = milestones.filter(m => newMilestones.includes(m.id))
            .sort((a, b) => b.seconds - a.seconds)[0];

          // Set the newly achieved milestone for animation
          setNewlyAchievedMilestone(latestMilestone.id);

          // Reset the newly achieved milestone after 4 seconds (after animation completes)
          setTimeout(() => {
            setNewlyAchievedMilestone(null);
          }, 4000);

          // Show congratulation alert
          Alert.alert(
            "Achievement Unlocked!",
            `Congratulations! You've reached ${latestMilestone.label} without ${habit.title}!`,
            [{ text: "Awesome!" }]
          );
        }

        return { ...habit, achievedMilestones: newAchievedMilestones };
      }

      return habit;
    });

    // Only update storage if changes were made
    if (JSON.stringify(updatedHabits) !== JSON.stringify(habits)) {
      await AsyncStorage.setItem('quittingHabits', JSON.stringify(updatedHabits));
      setQuittingHabits(updatedHabits);
    }
  };

  // Add this helper function to calculate time difference in seconds
  const calculateTimeDifferenceInSeconds = (startTime, lastRelapseTime) => {
    const referenceTime = lastRelapseTime ? new Date(lastRelapseTime) : new Date(startTime);
    const difference = currentTime - referenceTime;
    return Math.floor(difference / 1000); // Convert to seconds
  };

  const calculateTimeDifference = (startTime, lastRelapseTime) => {
    const referenceTime = lastRelapseTime ? new Date(lastRelapseTime) : new Date(startTime);
    const difference = currentTime - referenceTime;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Update the relapse function to reset milestones
  const relapse = async (habitId) => {
    Alert.alert(
      "Relapse Confirmation",
      "Are you sure you want to mark a relapse? This will reset your progress.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Relapse",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedQuittingHabits = quittingHabits.map(habit => {
                if (habit.id === habitId) {
                  return {
                    ...habit,
                    lastRelapseTime: new Date().toISOString(),
                    achievedMilestones: [] // Reset milestones on relapse
                  };
                }
                return habit;
              });

              await AsyncStorage.setItem('quittingHabits', JSON.stringify(updatedQuittingHabits));
              setQuittingHabits(updatedQuittingHabits);
            } catch (error) {
              Alert.alert('Error', 'Failed to record relapse');
            }
          }
        }
      ]
    );
  };
  const deleteQuittingHabit = async (habitId) => {
    Alert.alert(
      "Delete Quitting Habit",
      "Are you sure you want to delete this quitting habit?",
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
              const updatedQuittingHabits = quittingHabits.filter(habit => habit.id !== habitId);
              await AsyncStorage.setItem('quittingHabits', JSON.stringify(updatedQuittingHabits));
              setQuittingHabits(updatedQuittingHabits);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete quitting habit');
            }
          }
        }
      ]
    );
  };

  // Update the render section to include badges
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.subtitle}>My Quitting Habits</Text>
        {quittingHabits.map(habit => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitTitle}>{habit.title}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteQuittingHabit(habit.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.habitDescription}>{habit.description}</Text>
            <View style={styles.countContainer}>
              <Text style={styles.timeText}>
                Time Quit: {calculateTimeDifference(habit.startTime, habit.lastRelapseTime)}
              </Text>
              <TouchableOpacity
                style={styles.relapseButton}
                onPress={() => relapse(habit.id)}
              >
                <Text style={styles.relapseText}>I Relapsed</Text>
              </TouchableOpacity>
            </View>
            
            {/* Enhanced badge row component */}
            <EnhancedBadgeRow 
              achievedMilestones={habit.achievedMilestones || []} 
              newlyAchievedId={newlyAchievedMilestone}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// View Habits Screen Component
function ViewHabitsScreen() {
  const [habits, setHabits] = React.useState([]);

  React.useEffect(() => {
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
        {habits.map(habit => (
          <View key={habit.id} style={styles.habitCard}>
            <View style={styles.habitHeader}>
              <Text style={styles.habitTitle}>{habit.title}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteHabit(habit.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.habitDescription}>{habit.description}</Text>
            <View style={styles.countContainer}>
              <Text style={styles.countText}>Days: {habit.count}</Text>
              <View style={styles.counterButtons}>
                <TouchableOpacity
                  style={styles.decrementButton}
                  onPress={() => decrementCount(habit.id)}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.incrementButton}
                  onPress={() => incrementCount(habit.id)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddHabit" component={AddHabitScreen} options={{ title: 'Add New Habit' }} />
        <Stack.Screen name="ViewHabits" component={ViewHabitsScreen} options={{ title: 'My "I will" Habits' }} />
        <Stack.Screen name="ViewQuittingHabits" component={ViewQuittingHabitsScreen} options={{ title: 'My "I will not" Habits' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

