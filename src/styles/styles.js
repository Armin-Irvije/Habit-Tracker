import { StyleSheet, Platform, StatusBar } from 'react-native';

// New color palette based on the image
export const COLORS = {
  lightBlue: '#B3D5E3',   // Light blue from the water
  mediumBlue: '#7996C0',  // Medium blue-purple from middle right
  deepBlue: '#394867',    // Deep navy blue from bottom right
  lavender: '#B498B6',    // Soft lavender from top right
  paleBlue: '#E3ECF2',    // Very pale blue from middle-right
  white: '#FFFFFF',
  textDark: '#333333',
  textMedium: '#666666',
  danger: '#B57C84',      // A muted reddish tone that fits the palette
};
const styles = StyleSheet.create({
  // New styles for Adat header
  adatHeader: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 45,
    fontWeight: '400',
    color: COLORS.deepBlue,
    marginLeft: 10,
  },
  tagline: {
    fontSize: 17,
    color: COLORS.textMedium,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  iconItem: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: COLORS.textMedium,
    marginTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.white,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: COLORS.deepBlue,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.white,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  habitCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.mediumBlue,
  },
  habitTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.deepBlue,
  },
  habitDescription: {
    color: COLORS.textMedium,
    marginBottom: 10,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.deepBlue,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.deepBlue,
  },
  incrementButton: {
    backgroundColor: COLORS.mediumBlue,
    padding: 10,
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  decrementButton: {
    backgroundColor: COLORS.danger,
    padding: 10,
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relapseButton: {
    backgroundColor: COLORS.danger,
    marginTop: 10,
    width: 100,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relapseText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  typeSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.paleBlue,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedTypeButton: {
    backgroundColor: COLORS.mediumBlue,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.deepBlue,
  },
  selectedTypeButtonText: {
    color: COLORS.white,
  },
  disabledButton: {
    opacity: 0.5,
  },
  // Add these new styles for milestone badges
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
    color: COLORS.textMedium,
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
    backgroundColor: COLORS.mediumBlue,
  },
  unachievedBadge: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.mediumBlue,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  achievedText: {
    color: COLORS.white,
  },
  unachievedText: {
    color: COLORS.mediumBlue,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30, // Add bottom padding for better scrolling experience
  }

});

export default styles;