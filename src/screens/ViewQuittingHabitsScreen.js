// src/screens/ViewQuittingHabitsScreen.js
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
import { EnhancedBadgeRow, milestones } from '../components/EnhancedBadges';

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

    return `${days} days ${hours.toString().padStart(2, '0')} hours ${minutes.toString().padStart(2, '0')} minutes`;
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
            </View>

            <TouchableOpacity
                style={styles.relapseButton}
                onPress={() => relapse(habit.id)}
              >
                <Text style={styles.relapseText}>I Relapsed</Text>
              </TouchableOpacity>
            
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


export default ViewQuittingHabitsScreen;