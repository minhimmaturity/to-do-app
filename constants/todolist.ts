import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    todoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center', // Align items vertically in the center
      marginBottom: 8,
      padding: 8,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      flexDirection: 'row', // React Native requires flex direction for row layout
    },
    todoItemText: {
      flex: 1, // Allow the text to take up remaining space
      marginRight: 8,
      color: '#333',
    },
    completed: {
      textDecorationLine: 'line-through',
      color: '#888',
    },
    deleteButton: {
      backgroundColor: '#ff6347', // Tomato color
      color: '#fff',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
  });

export default styles;