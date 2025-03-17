import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import styles from '../styles/styles';
import { saveHabit } from '../utils/storage';

// Combined Add Habit Screen Component
function AddHabitScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [habitType, setHabitType] = useState(null);
  
    const handleSaveHabit = async () => {
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
  
          const success = await saveHabit(newHabit, 'will');
          if (success) {
            navigation.reset({
              index: 1,
              routes: [
                {name: 'Home'},
                {name: 'ViewHabits'}
              ],
            });
          }
        } else {
          const newQuittingHabit = {
            id: Date.now().toString(),
            title,
            description,
            startTime: new Date().toISOString(),
            lastRelapseTime: null,
            achievedMilestones: [],
          };
  
          const success = await saveHabit(newQuittingHabit, 'wont');
          if (success) {
            navigation.reset({
              index: 1,
              routes: [
                {name: 'Home'},
                {name: 'ViewQuittingHabits'}
              ],
            });
          }
        }
  
        Alert.alert('Success', 'Habit saved successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save habit');
        console.error('Error saving habit:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>New Habit</Text>
          
          {/* Habit Type Selection */}
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
          
          {/* Habit Title Input */}
          <TextInput
            style={styles.input}
            placeholder="Habit Title"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          />
          
          {/* Habit Description Input */}
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description (optional)"
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          
          {/* Save Button */}
          <TouchableOpacity
            style={[styles.button, !habitType && styles.disabledButton]}
            onPress={handleSaveHabit}
            disabled={!habitType}
          >
            <Text style={styles.buttonText}>Save Habit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  export default AddHabitScreen;