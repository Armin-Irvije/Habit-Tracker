// EnhancedBadges.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

// Define milestone data with enhanced visuals
export const milestones = [
  { 
    id: 'minute', 
    label: '1 minute', 
    seconds: 60, 
    icon: 'clock',
    colors: ['#7FD8FF', '#1E90FF'],
    borderColors: ['#1E90FF', '#0000CD']
  },
  { 
    id: 'week', 
    label: '1 week', 
    seconds: 604800, 
    icon: 'calendar',
    colors: ['#9FE8A8', '#3CB371'],
    borderColors: ['#3CB371', '#2E8B57']
  },
  { 
    id: 'month', 
    label: '1 month', 
    seconds: 2592000, 
    icon: 'award',
    colors: ['#FFC107', '#FF8C00'],
    borderColors: ['#FF8C00', '#FF4500']
  },
  { 
    id: '3months', 
    label: '3 months', 
    seconds: 7776000, 
    icon: 'star',
    colors: ['#E9B9FF', '#9932CC'],
    borderColors: ['#9932CC', '#800080']
  },
  { 
    id: '6months', 
    label: '6 months', 
    seconds: 15552000, 
    icon: 'thumbs-up',
    colors: ['#FF9E9E', '#FF4757'],
    borderColors: ['#FF4757', '#B71540']
  },
  { 
    id: '1year', 
    label: '1 year', 
    seconds: 31536000, 
    icon: 'gift',
    colors: ['#FFD700', '#FF8C00'],
    borderColors: ['#FF8C00', '#FF4500']
  }
];

// Enhanced Badge component with animations
export const EnhancedBadge = ({ milestone, achieved, newlyAchieved = false }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(newlyAchieved ? 0.5 : 1)).current;

  useEffect(() => {
    if (newlyAchieved) {
      // Entrance animation
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }).start();
      
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 }
      ).start();
    }
  }, [newlyAchieved]);

  // For unachieved badges
  if (!achieved) {
    return (
      <View style={styles.unachievedBadge}>
        <Feather 
          name={milestone.icon} 
          size={20} 
          color="#888" 
        />
        <Text style={styles.unachievedText}>
          {milestone.label}
        </Text>
      </View>
    );
  }

  // For achieved badges
  return (
    <Animated.View 
      style={[
        styles.badgeContainer,
        {
          transform: [
            { scale: newlyAchieved ? Animated.multiply(scaleAnim, pulseAnim) : 1 }
          ],
        }
      ]}
    >
      <LinearGradient
        colors={milestone.colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.badgeGradient}
      >
        <View style={styles.iconWrapper}>
          <Feather 
            name={milestone.icon} 
            size={22} 
            color="#FFF" 
          />
        </View>
        <Text style={styles.achievedText}>
          {milestone.label}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

// Enhanced Badge Row component
export const EnhancedBadgeRow = ({ achievedMilestones, newlyAchievedId = null }) => {
  // Filter milestones to only show achieved ones
  const achievedMilestonesData = milestones.filter(milestone => 
    achievedMilestones.includes(milestone.id)
  );
  
  // Only render the badge container if there are achieved milestones
  if (achievedMilestonesData.length === 0) {
    return null;
  }
  
  return (
    <View style={styles.badgeRowContainer}>
      <Text style={styles.badgeRowHeader}>Achievements Unlocked:</Text>
      <View style={styles.badgesWrapper}>
        {achievedMilestonesData.map(milestone => (
          <EnhancedBadge 
            key={milestone.id} 
            milestone={milestone} 
            achieved={true}
            newlyAchieved={milestone.id === newlyAchievedId}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeRowContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  badgeRowHeader: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: COLORS.deepBlue,
    textAlign: 'center',
  },
  badgesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  badgeContainer: {
    margin: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badgeGradient: {
    borderRadius: 16,
    padding: 2,
    minWidth: 90,
    overflow: 'hidden',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
    alignSelf: 'center',
    marginTop: 5,
  },
  achievedText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  unachievedBadge: {
    opacity: 0.4,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  unachievedText: {
    fontSize: 11,
    color: '#888',
    marginTop: 4,
  }
});