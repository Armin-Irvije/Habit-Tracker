import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const handlePress = () => console.log("Text pressed");
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <Text style = {containerStyle} numberOfLines={1} onPress={handlePress}>Hello EVERYONE! YOOOOO</Text>
      <Button color= "red" title = 'Click Me' onPress={() => alert('sup')}/> 
      <TouchableOpacity onPress = {() => console.log('image tapped')}>
        <Image source={{ width: 200, height: 300, uri: 'https://picsum.photos/200/300' }} />
      </TouchableOpacity>
      <View style = {{width:200, height: 70, backgroundColor: 'dodgerblue'}}></View>
      <StatusBar style="auto" />
    </SafeAreaView>
    // adds padding on the top to make sure we are int he safe area
  );
}
const containerStyle = {backgroundColor:'yellow'};
// stylesheet is not css but inspired by it
// just java script properties
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
