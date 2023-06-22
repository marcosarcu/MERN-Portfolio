import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/style.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './views/Home.jsx'
import Projects from './views/Projects.jsx'
import Project from './views/Project.jsx'
import Admin from './views/Admin.jsx'
import NewProject from './views/NewProject.jsx'
import EditProject from './views/EditProject.jsx'
import NotFound from './views/NotFound.jsx'
import Login from './views/Login.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import { logOutService } from './services/auth.services'
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom'




export default function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleLogIn(token){
    console.log('handleLogIn')
    setIsAuthenticated(true);
    localStorage.setItem('token', token.token);
  }

  function handleLogOut(){
    logOutService().then((response) => {
      console.log(response)
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }
 
  // useEffect(() => {
  //   if(!isAuthenticated){
  //     navigate('/login')
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if(isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated]);
  

  

 
  return (
    <>
      <Header props={{isAuthenticated, handleLogOut}}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/admin/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Admin /></PrivateRoute>} />
          <Route path="/admin/project/new" element={<PrivateRoute isAuthenticated={isAuthenticated}><NewProject /></PrivateRoute>} />
          <Route path="/admin/project/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><EditProject /></PrivateRoute>} />
          <Route path="/login" element={<Login onLogin={handleLogIn}/>} />

          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

