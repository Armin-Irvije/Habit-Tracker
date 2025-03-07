import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/styles';

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

export default HomeScreen;