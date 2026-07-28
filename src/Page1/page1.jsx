import { Link } from 'react-router-dom';
import './page1.css'

function LandingPage() {
  return(
    <>
    <div className="background-color">
    <h1 className="welcome-message">Welcome to PurpleYourStrength</h1>
    <div className="empty-div">
      <h2 className="welcome-message2">Where Every Milestone Matters</h2></div>
    <div className="brand-slogan">
      <p>Purple Your Strength</p>
      <p>Execute Your Task</p>
    </div>
    <Link to="/todo">
      <button className="task-button">Task Myself</button>
    </Link>
    </div>
    </>
  );
}

export default LandingPage;