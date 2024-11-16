import { Link } from 'react-router-dom'; // Import Link component

function Homepage() {
  return (
    <header>
      <h1> Husseljo Website</h1>
      <nav>
        <ul>
          <li> <Link to="/register">Register</Link> </li> {/* Link to Register page */}
          <li> <Link to="/login">Login</Link> </li> {/* Link to Login page */}
        </ul>
      </nav>
    </header>
  );
}

export default Homepage;
