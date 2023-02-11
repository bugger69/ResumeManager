import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";

import UploadPDF from './components/UploadPDF';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';
import UserPage from './components/UserPage';

function App() {
  let routes = useRoutes([
    {path: "/", element: <UploadPDF />},
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {path: "/UserPage", element: <UserPage />},
    
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