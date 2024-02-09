import { BrowserRouter, Link, Router } from "react-router-dom";
import "./header.css";
function Header() {
  return (
    <>
      <div className="headerContainer">
        <div className="logoBox">
          <img className="logo" src="/logo.png" alt="logo"></img>
        </div>
        <div className="menuBox">
          <nav>
            <Link to="/" className="menu">
              Home
            </Link>
            <Link to="/view" className="menu">
              View
            </Link>
          </nav>
          <div className="menu">Service</div>
          <div className="menu">Gallary</div>
          <div className="menu">Contact Us</div>
        </div>
      </div>
    </>
  );
}

export default Header;
