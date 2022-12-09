import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/style.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
// import Home from './views/Home.jsx'
import { Outlet } from 'react-router-dom'



export default function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let token = localStorage.getItem('token');
    if(token){
      setIsLoggedIn(true);
    }
  }, [])

  function logOut() {
    console.log('logout')
  }
 
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

