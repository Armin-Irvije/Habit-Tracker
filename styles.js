import { StyleSheet, Platform, StatusBar } from 'react-native';

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
      fontSize: 36,
      fontWeight: '400',
      color: '#4B4E6D',
      marginLeft: 10,
    },
    tagline: {
      fontSize: 16,
      color: '#666',
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
      color: '#666',
      marginTop: 5,
    },
    container: {
      flex: 1,
      backgroundColor: '#84DCC6',
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
      color: 'white',
    },
    subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
    },
    buttonContainer: {
      width: '100%',
      gap: 20,
    },
    button: {
      backgroundColor: '#4B4E6D',
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
      color: 'white',
      fontSize: 18,
      fontWeight: '600',
    },
    input: {
      backgroundColor: 'white',
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
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      marginBottom: 15,
    },
    habitTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    habitDescription: {
      color: '#666',
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
    },
    timeText: {
      fontSize: 20,
      fontWeight: '600',
    },
    incrementButton: {
      backgroundColor: '#4B4E6D',
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
      color: '#ff4444',
      fontSize: 24,
      fontWeight: 'bold',
    },
    counterButtons: {
      flexDirection: 'row',
      gap: 10,
    },
    decrementButton: {
      backgroundColor: '#ff4444',
      padding: 10,
      borderRadius: 5,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    relapseButton: {
      backgroundColor: '#ff4444',
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    relapseText: {
      color: 'white',
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
      backgroundColor: '#fff',
      marginHorizontal: 5,
      alignItems: 'center',
    },
    selectedTypeButton: {
      backgroundColor: '#4B4E6D',
    },
    typeButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#4B4E6D',
    },
    selectedTypeButtonText: {
      color: '#fff',
    },
    disabledButton: {
      opacity: 0.5,
    },
  
  });
  export default styles;