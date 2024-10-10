import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import TodoItem from "./TodoItem";
import * as SQLite from "expo-sqlite";
import {
  init,
  getTasksByLimit,
  insertOne,
  setComplete,
  deleteOne,
} from "../database/database";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function TodoListComponent() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = React.useState<Task[]>([
        { id: 1, text: 'Doctor Appointment', completed: true },
        { id: 2, text: 'Meeting at School', completed: false },
    ]);

  async function addTask() {
    if (text.length === 0) {
      Alert.alert("Input Required", "Please enter a task.");
      return;
    }

    const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id: newTaskId, text, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
  }

  async function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.container}>
        <ScrollView>
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
            />
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="New Task"
            style={styles.input}
          />
          <Button title="Add" onPress={addTask} color="#2196F3" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "#fff",
  },
});
