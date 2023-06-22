import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './header.css'

export default function Header({props}) {
  function handleSubmit(e){
    e.preventDefault();
    props.handleLogOut();
  }

  let [authStatus, setAuthStatus] = useState(false)
  useEffect(() =>{
    setAuthStatus(props.isAuthenticated)
  }, [props.isAuthenticated])

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-md">
        <Link className="d-flex align-items-center text-dark text-decoration-none" to="/">
          <img src="/images/logo.png" alt="Marcos Arcusin" className="logoimg" />
          <div className="logo">
            <h1>Marcos Arcusin</h1>
            <p>Diseñador y desarrollador Full Stack</p>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">Proyectos</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:marcosarcu@gmail.com">Contacto</a>
            </li>
            {authStatus == true ? (
              <>
                <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
              <li className="nav-item">
                <form action="" onSubmit={handleSubmit}>
                  <button className='btn btn-primary ms-2' type="submit">Cerrar Sesión</button>
                </form>
              </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary ms-2" to="/login">Iniciar Sesión</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )


}