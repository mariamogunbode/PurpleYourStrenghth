import { Routes, Route } from "react-router-dom"
import LandingPage from "./Page1/page1"
import TodoPage from "./Page2/page2"
function App() {
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/todo"  element={<TodoPage />} />
    </Routes>
  );
}

export default App;