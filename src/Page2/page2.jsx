import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './page2.css'

function TodoPage({tasks, setTasks}) {

  const inputRef = useRef(null);
  const [addTask, setAddTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, [])

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
    inputRef.current.focus();
  }

  function handleCompletedTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
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

 let filteredTasks;
  const totalTask = tasks.length;
  const activeTask = tasks.filter((task) => !task.completed).length;
  const completeTask = tasks.filter((task) => task.completed).length;
  const progress = 
  totalTask === 0 
    ? 0
    :Math.round((completeTask/totalTask) * 100)

    let achievement = "";
    if(progress < 20) {
      achievement = "Great start! Every big achievement begins with a single step.Keep going!"
    } else if (progress <  40 ) {
      achievement = "You're building momentum. Stay consistent, you've got this!"
    } else if (progress <  60 ) {
      achievement = "Fantastic progress! Your hard work is beginging to show"
    } else if (progress <  80 ) {
      achievement = "Excellent work! You're proving to yourself that consistency pays off."
    } else if (progress <  99 ) {
      achievement = "Outstanding! The finish line is in sight. Finish strong!"
    } else if (progress === 100 ) {
      achievement = "Congratulations! You've completed every task. You truly Purpled Your Strength!"
    }

  if (filter === "all") {
  filteredTasks = tasks;
  } else if (filter === "active") {
  filteredTasks = tasks.filter(task => !task.completed); 
  } else { 
      filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks = filteredTasks.filter(task => task.task.toLowerCase().includes(search.toLowerCase()))


  return(
    <>
    <div className="background">
     <Link to="/">
       <button className="back-button">Back</button>
      </Link>
    <div>
      <h1>TASKS</h1>
      <div>
      <input
      className="enter-task"
      placeholder="Enter Task" 
      value={addTask}
      onChange={(e) => setAddTask(e.target.value)}
      ref={inputRef}/>
      <button 
      className="add-task"
      onClick={handleAddTask}>Add Task</button>
      </div>
    </div>

    <div>
      <div className="filter-buttons">
      <button 
      className="filter-button1"
      onClick={() => setFilter("all")}>All Tasks{totalTask}</button>
        <button 
        className="filter-button2"
        onClick={() => setFilter("active")}>Active Tasks{activeTask}</button>
        <button 
        className="filter-button3"
        onClick={() => setFilter("completed")}>Completed Tasks{completeTask}</button>
        </div>
        <div>
          <input
          type="text" 
          value={search}
          placeholder={"Search tasks..."}
          onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="task-buttons">
          {filteredTasks.map((task) => (
            <div key={task.id}
             className="task-div">
              <div>
            <p>{task.task}</p>
            </div>
            <div className="buttons-div">
          <button 
          onClick={() => handleCompletedTask(task.id)}>{task.completed ? "Undo" : "Complete"}</button>
          <button
          onClick={() => handleEditTask(task.id)}>Edit</button>
          <button 
          onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
            </div>
          ))}
        </div>
</div>

    <div className="achievement-div"> 
      <h2>PurpleFul Achievements</h2>
      <p>Progress: {progress}%</p>
      <div className="progress-container">
        <div className="progress-fill"
        style={{width: `${progress}%`}}
        ></div>
      </div>
      <p>{achievement}</p>
    </div>
      
      </div>
    </>
  )
}

export default TodoPage;