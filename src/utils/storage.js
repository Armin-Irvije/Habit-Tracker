import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadHabits = async () => {
  try {
    const savedHabits = await AsyncStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  } catch (error) {
    console.error('Failed to load habits', error);
    return [];
  }
};

export const saveHabit = async (habit, type = 'will') => {
  try {
    const storageKey = type === 'will' ? 'habits' : 'quittingHabits';
    const existingHabits = await AsyncStorage.getItem(storageKey);
    const habits = existingHabits ? JSON.parse(existingHabits) : [];
    habits.push(habit);
    await AsyncStorage.setItem(storageKey, JSON.stringify(habits));
    return true;
  } catch (error) {
    console.error('Failed to save habit', error);
    return false;
  }
};