import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import cancelEditingIcon from "../assets/icons/X.png";
import startEditingIcon from "../assets/icons/Pen.png";
import { Task } from "./TasksList";

// import { Container } from './styles';

interface TaskItemProps {
  index: number;
  item: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({
  index,
  item,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item.title);
  const textIputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing(id: number) {
    setIsEditing(false);
    editTask(id, taskTitle);
  }

  useEffect(() => {
    if (textIputRef.current) {
      if (isEditing) {
        textIputRef.current.focus();
      } else {
        textIputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={
              item.done === false ? styles.taskMarker : styles.taskMarkerDone
            }
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={item.done === false ? styles.taskText : styles.taskTextDone}
            value={taskTitle}
            onChangeText={(text) => setTaskTitle(text)}
            onSubmitEditing={() => handleSubmitEditing(item.id)}
            ref={textIputRef}
            editable={isEditing}
          ></TextInput>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => handleCancelEditing()}
            style={{ paddingHorizontal: 24 }}
          >
            <Image source={cancelEditingIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleStartEditing()}
            style={{ paddingHorizontal: 12 }}
          >
            <Image source={startEditingIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.divider}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 12 }}
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#B2B2B2",
  },
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
