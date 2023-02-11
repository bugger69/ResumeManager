import React from 'react';
import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";

import UploadPDF from './components/UploadPDF';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/UploadPDF';
import EditForm from './components/EditForm';

import './App.css';
// import EditForm from './components/EditForm';

function App() {
  let routes = useRoutes([
    {path: "/", element: <UploadPDF />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/home", element: <Home/>},
    {path: "/editinfo", element: <EditForm/> }
  ]);

  return (
    routes
  );
}

const AppWrapper = () => {
  return <Router>
    <App />
  </Router>
}

export default AppWrapper;