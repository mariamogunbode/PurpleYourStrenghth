import { Link } from 'react-router-dom';
import { useState } from 'react';
import './page2.css'

function TodoPage({tasks, setTasks}) {

  const [addTask, setAddTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  function handleAddTask() {
     if(addTask.trim() === "") {
      return;
     }
     if(editTaskId !== null) {
      setTasks(
        tasks.map((task) => {
          if(task.id === editTaskId) {
            return {
              ...task,
              task: addTask
            }
          }
          return task;
        })
      );
      setAddTask("");
      setEditTaskId(null);
      return;
     }
     setTasks([
      ...tasks,
      {id: Date.now(),
        task: addTask,
        completed: false,
      }
     ])

     setAddTask("");
  }

  function handleCompletedTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: true,
          };
        }
        return task;
      })
    );
  }

  function handleEditTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    setAddTask(taskToEdit.task);
    setEditTaskId(id);
  }

  function handleDeleteTask(id) {
    setTasks(
      tasks.filter((task) => {
        return task.id !==id
      })
    )
  }
  return(
    <>
    <div className="background">
     <Link to="/">
       <button>Back</button>
      </Link>
    <div>
      <h1>TASKS</h1>
      <div>
      <input
      placeholder="Enter Task" 
      value={addTask}
      onChange={(e) => setAddTask(e.target.value)}/>
      <button 
      onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
    <div className="myTask-div">
      <h2 className="myTask">My Tasks</h2>
      {tasks
      .filter((task) => !task.completed)
      .map((task) => {
        return(
          <div className="task-div">
          <p>{task.task}</p>
          <div>
          <button 
          onClick={() => handleCompletedTask(task.id)}>Complete</button>
          <button
          onClick={() => handleEditTask(task.id)}>Edit</button>
          <button 
          onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
          </div>
        )
      })}
    </div>
    <div> 
      <h2>PurpleFul Achievements</h2>
      {tasks
      .filter((task) => task.completed)
      .map((task) => (
        <div key={task.id}>
          <p>{task.task}</p>
        </div>
      ))}
    </div>
      </div>
    </>
  )
}

export default TodoPage;