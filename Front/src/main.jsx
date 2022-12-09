import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './views/Home.jsx'
import Projects from './views/Projects.jsx'
import Project from './views/Project.jsx'
import Admin from './views/Admin.jsx'
import NewProject from './views/NewProject.jsx'
import EditProject from './views/EditProject.jsx'
import NotFound from './views/NotFound.jsx'
import Login from './views/Login.jsx'
import Logout from './views/Logout.jsx'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'

function onLogin(token) {
  console.log(token)
  localStorage.setItem('token', token.token);
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/projects',
        element: <Projects />
      },
      {
        path: '/project/:id',
        element: <Project />
      },
      {
        path: '/admin/',
        element: <Admin />,
        loader: async () => {
          let token = localStorage.getItem('token');
          if(!token){
            return redirect('/login');
          }
          else{
            return null;
          }
        }
      },
      {
        path: '/admin/project/new',
        element: <NewProject />,
        loader: async () => {
          let token = localStorage.getItem('token');
          if(!token){
            return redirect('/login');
          }
          else{
            return null;
          }
        }
      },
      {
        path: '/admin/project/edit/:id',
        element: <EditProject />,
        loader: async () => {
          let token = localStorage.getItem('token');
          if(!token){
            return redirect('/login');
          }
          else{
            return null;
          }
        }
      },
      {
        path: '/login',
        element: <Login onLogin={onLogin}/>
      },
      {
        path: '/logout',
        element: <Logout/>,
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)
