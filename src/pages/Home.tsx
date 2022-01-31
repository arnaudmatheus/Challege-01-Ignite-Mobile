import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(taskTitle: string) {
    if (tasks) {
      const verifier = tasks.find((task) => {
        if (task.title === taskTitle) {
          return true;
        }
      });

      if (!verifier) {
        const data = {
          id: tasks.length + 1,
          title: taskTitle,
          done: false,
        };
        setTasks([...tasks, data]);
      } else {
        Alert.alert(
          "Tarefa já cadastrada",
          "Você não pode cadastrar uma tarefa com o mesmo nome"
        );
      }
    }
  }

  function handleToggleTaskDone(id: number) {
    const newTasks = [...tasks];
    newTasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover tarefa", "Deseja remover esta tarefa?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          setTasks(tasks.filter((task) => task.id !== id));
        },
      },
    ]);
  }

  function handleEditTask(id: number, newTitle: string) {
    const newTasks = [...tasks];
    newTasks.map((task) => {
      if (task.id === id) {
        task.title = newTitle;
      }
    });
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
