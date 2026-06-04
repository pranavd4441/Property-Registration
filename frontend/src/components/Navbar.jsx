import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">PR</span>
        <span>Property Registration</span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/properties">Properties</NavLink>
        <NavLink to="/properties/add">Add Property</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
