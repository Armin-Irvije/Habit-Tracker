import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export const WillHabitCard = ({ habit, onDelete, onIncrement, onDecrement }) => (
  <View key={habit.id} style={styles.habitCard}>
    <View style={styles.habitHeader}>
      <Text style={styles.habitTitle}>{habit.title}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(habit.id)}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.habitDescription}>{habit.description}</Text>
    <View style={styles.countContainer}>
      <Text style={styles.countText}>Days: {habit.count}</Text>
      <View style={styles.counterButtons}>
        <TouchableOpacity
          style={styles.decrementButton}
          onPress={() => onDecrement(habit.id)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.incrementButton}
          onPress={() => onIncrement(habit.id)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
