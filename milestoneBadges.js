// First, let's create a new file called MilestoneBadges.js

// MilestoneBadges.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from './styles'; // Assuming you've exported the COLORS object from styles.js

// Define milestone data
export const milestones = [
  { id: 'minute', label: '1 minute', seconds: 1, icon: 'clock' },
  { id: 'week', label: '1 week', seconds: 604800, icon: 'calendar' },
  { id: 'month', label: '1 month', seconds: 2592000, icon: 'award' },
  { id: '3months', label: '3 months', seconds: 7776000, icon: 'star' },
  { id: '6months', label: '6 months', seconds: 15552000, icon: 'thumbs-up' },
  { id: '1year', label: '1 year', seconds: 31536000, icon: 'gift' }
];

// Badge component
export const Badge = ({ milestone, achieved }) => {
  return (
    <View style={[styles.badge, achieved ? styles.achievedBadge : styles.unachievedBadge]}>
      <Feather 
        name={milestone.icon} 
        size={20} 
        color={achieved ? COLORS.white : COLORS.mediumBlue} 
      />
      <Text style={[styles.badgeText, achieved ? styles.achievedText : styles.unachievedText]}>
        {milestone.label}
      </Text>
    </View>
  );
};

// Badge row component for displaying multiple badges
export const BadgeRow = ({ achievedMilestones }) => {
    // Filter milestones to only show achieved ones
    const achievedMilestonesData = milestones.filter(milestone => 
      achievedMilestones.includes(milestone.id)
    );
    
    // Only render the badge container if there are achieved milestones
    if (achievedMilestonesData.length === 0) {
      return null; // Don't render anything if no milestones achieved
    }
    
    return (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeHeader}>Milestones Achieved:</Text>
        <View style={styles.badgeRow}>
          {achievedMilestonesData.map(milestone => (
            <Badge 
              key={milestone.id} 
              milestone={milestone} 
              achieved={true} // All badges here are achieved by definition
            />
          ))}
        </View>
      </View>
    );
  };

// We'll need to modify styles.js to export the COLORS object
// But for now, let's define styles for the badges here
const styles = StyleSheet.create({
  badgeContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  badgeHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 20,
    marginBottom: 5,
  },
  achievedBadge: {
    backgroundColor: COLORS ? COLORS.mediumBlue : '#7996C0',
  },
  unachievedBadge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS ? COLORS.mediumBlue : '#7996C0',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  achievedText: {
    color: 'white',
  },
  unachievedText: {
    color: COLORS ? COLORS.mediumBlue : '#7996C0',
  }
});