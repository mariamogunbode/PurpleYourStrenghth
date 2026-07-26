import { Routes, Route } from "react-router-dom"
import { useState,useEffect } from "react";
import LandingPage from "./Page1/page1"
import TodoPage from "./Page2/page2"
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const savedTasks = 
    localStorage.getItem("tasks");
    if (savedTasks !== null) {
      setTasks(JSON.parse(savedTasks));
      
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/todo"  element={<TodoPage 
      tasks={tasks}
      setTasks={setTasks}/>} />
    </Routes>
  );
}

export default App;