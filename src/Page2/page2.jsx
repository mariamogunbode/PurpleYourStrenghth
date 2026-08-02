import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Icon } from "@iconify/react"
import './page2.css'

function TodoPage({tasks, setTasks, getTasks}) {

  const inputRef = useRef(null);
  const [addTask, setAddTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  async function handleAddTask() {
     if(addTask.trim() === "") {
      return;
     }
     if(editTaskId !== null) {
      await
      fetch(`http://localhost:3000/tasks/${editTaskId}`, {
        method: "PATCH",
        headers: {
           "content-Type": "application/json",
         },
         body: JSON.stringify({task: addTask}),
      })

      await getTasks();
      setAddTask("");
      setEditTaskId(null);
      return;
     }

     const newTask = {
         task: addTask,
         completed: false,
       };
       await
       fetch("http://localhost:3000/tasks", {
         method: "POST",
         headers: {
           "content-Type": "application/json",
         },
         body: JSON.stringify(newTask),
       });
     
       await getTasks()
;
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

  async function handleDeleteTask(id) {
    await
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    })
    await getTasks();
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


  function handleKeyDown(e) {
    if(e.key === "Enter") {
      handleAddTask();
    }
  }

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
      ref={inputRef}
      onKeyDown={handleKeyDown}/>
      <button 
      className="add-task"
      onClick={handleAddTask}>Add Task</button>
      </div>
    </div>

    <div>
      <div className="filter-buttons">
      <button 
      className ={filter === "all"
        ? "active-filter"
        :"filter-button1"
      }
      onClick={() => setFilter("all")}>All Tasks{totalTask}</button>
        <button 
        className={filter === "active"
        ? "active-filter"
        :"filter-button2"
      }
        onClick={() => setFilter("active")}>Active Tasks{activeTask}</button>
        <button 
        className ={filter === "completed"
        ? "active-filter"
        :"filter-button3"
      }
        onClick={() => setFilter("completed")}>Completed Tasks{completeTask}</button>
        </div>
        <div className="search-div">
          <input
          className="search-bar"
          type="text" 
          value={search}
          placeholder={"Search tasks..."}
          onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div>
          {filteredTasks.map((task) => (
            <div key={task.id}
             className="task-div">
              <div  className="para-div">
            <p  className="tasks-div">{task.task}</p>
            </div>
            <div className="buttons-div">
          <button 
          className="button-div1"
          onClick={() => handleCompletedTask(task.id)}>{task.completed ? "Undo" : "Complete"}</button>
          {!task.completed && (
            <>
          <button
          className="button-div2"
          onClick={() => handleEditTask(task.id)}>Edit</button>
          <button
          className="button-div3" 
          onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </>
          )}
          </div>
            </div>
          ))}
        </div>
</div>

    <div className="achievement-div"> 
      <div className="icon-achievement">
      <Icon 
      className="achievement-icon"
      icon="mdi:trophy" />
      <h2 className="your-achievements">Your Achievements</h2>
      </div>
      <div className="icon-progress">
        <Icon 
        className="progress-icon" icon="mdi:rocket-launch" />
      <p className="progress-para">Progress: {progress}%</p>
      </div>
      <div className="progress-container">
        <div className="progress-fill"
        style={{width: `${progress}%`}}
        ></div>
      </div>
      <p className="achievement-para">{achievement}</p>
    </div>
      
      </div>
    </>
  )
}

export default TodoPage;