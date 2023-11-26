import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "../styles/navbar.css"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Chuville
      </Link>
      <ul> 
        <CustomLink to="/manage">Gestão</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}