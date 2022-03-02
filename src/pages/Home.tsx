import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, data]);  

  }

  function handleToggleTaskDone(id: number) {
    
    // copio a lista
    const updatedTasks = tasks.map(task => ({ ...task }))            

    // procuro pelo id        
    const alterTask = updatedTasks.find(task => task.id === id);

    // se não existir retorna
    if (!alterTask){
      return;
    }
    
    // propriedade done recebe o novo valor
    alterTask.done = !alterTask.done;
    
    // atualiza o estado tasks
    setTasks(updatedTasks);   

  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => [...oldState.filter(
      tasks => tasks.id !== id
    )]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})