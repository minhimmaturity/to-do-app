import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleCompleted: (id: number) => void;
}

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
}: TodoItemProps) {
  return (
    <View style={styles.todoItem}>
      <BouncyCheckbox
        isChecked={task.completed}
        fillColor="#4CAF50"
        unFillColor="#FFFFFF"
        onPress={() => toggleCompleted(task.id)}
      />
      <Text
        style={
          {
            textDecorationLine: task.completed ? "line-through" : "none",
            color: task.completed ? "#999" : "#333",
            alignSelf: 'center',
            flexWrap: 'wrap',
            maxWidth: 200

          }
        }
        ellipsizeMode="tail"
      >
        {task.text}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    cursor: "pointer",
    maxWidth: 60,
    maxHeight: 80,
    alignSelf: "center",
  },
});
