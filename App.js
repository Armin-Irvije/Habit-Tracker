import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddHabitScreen from './src/screens/AddHabitScreen';
import ViewHabitsScreen from './src/screens/viewHabitsScreen'; //weird casing issue
import ViewQuittingHabitsScreen from './src/screens/ViewQuittingHabitsScreen';

const Stack = createStackNavigator();

//TODO: the screen stack of creating a habit then going to that habit then going back to creation
//TODO: notification for I will habits
//TODO: calender view of times done (git hub calender)
//TODO: add more visuals and styles

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

