import { Link } from 'react-router-dom'; // Import Link component
import './Homepage.css'; // Assuming you have an external CSS file

function Homepage() {
  return (
    <header className="homepage-header">
      <div className="container">
        <h1 className="homepage-title">Husseljo Website</h1>
        <nav>
          <div>
            <Link to="/register" className="btn">Register</Link>
          </div>
          <div>
            <Link to="/login" className="btn">Login</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Homepage;
