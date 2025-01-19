import "../styles/NavBar.css";
import { Link } from "react-router-dom"

function NavBar() {

  return (
    <>
      <h1>Weatherly</h1>
      <nav>
        <div className="nav-menu">
          <ul className="nav-links">
            <li className="nav-item"><Link className="item-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="item-link" to="/something">Something</Link></li>
            <li className="nav-item"><Link className="item-link" to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar