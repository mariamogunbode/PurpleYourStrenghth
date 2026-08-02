import { Routes, Route } from "react-router-dom"
import { useState,useEffect } from "react";
import LandingPage from "./Page1/page1"
import TodoPage from "./Page2/page2"
function App() {
  const [tasks, setTasks] = useState([]);

   async function getTasks() {
    const response = await
    fetch("http://localhost:3000/tasks");
    const data = await
    response.json();
    setTasks(data);
  }
  
  useEffect(() => {
    getTasks();
  }, []);

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/todo"  element={<TodoPage 
      tasks={tasks}
      setTasks={setTasks}
      getTasks={getTasks}/>} />
    </Routes>
  );
}

export default App;

