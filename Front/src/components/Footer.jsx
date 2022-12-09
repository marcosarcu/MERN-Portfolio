import { Link } from 'react-router-dom'

export default function Footer () {
  return (
    <footer className="footer pt-5 pb-5 bg-light">
      <div className="container-md">
        <div className="row align-items-center justify-content-center">
          <div className="col-md-12 justify-content-center align-items-center d-flex">
            <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
              <img src="/images/logo.png" alt="Marcos Arcusin" className="logoimg"/>
              <div className="logo">
                <h1>Marcos Arcusin</h1>
                <p>Diseñador y desarrollador Full Stack</p>
              </div>
            </Link>
          </div>
          <div className="col-md-6 text-center">
            <p>Alumno: Marcos Aaron Arcusin</p>
            <p>Materia: Aplicaciones Hibridas</p>
            <p>Profesor: Brian Esteban Lara Campos</p>
          </div>
          <div className="col-md-6 text-center">
            <h4>Redes Sociales</h4>
            <ul className="m-0 p-0 list-unstyled d-flex align-items-center justify-content-center">
              <li>
                <a href="https://www.facebook.com/marcos.arcusin" className="text-decoration-none" target="_blank" >
                  <img src="/images/facebook.svg" alt="Facebook" className="social-icon"/>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/marcosarcusin/" className="text-decoration-none" target="_blank" >
                  <img src="/images/instagram.svg" alt="Instagram" className="social-icon"/>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/marcos-arcusin-46a1951a1/" className="text-decoration-none" target="_blank" >
                  <img src="/images/linkedin.svg" alt="Linkedin" className="social-icon"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

