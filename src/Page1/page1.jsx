import { Link } from 'react-router-dom';
import './page1.css'

function LandingPage() {
  return(
    <>
    <div>Welcome to PurpleYourStrength</div>
    <Link to="/todo">
      <button>Task Myself</button>
    </Link>
    </>
  );
}

export default LandingPage;