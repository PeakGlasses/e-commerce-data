import { Link } from "react-router-dom";
import "../styles/components/NavBar.css";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SkyShop</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
