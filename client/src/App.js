import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";

import UploadPDF from './components/UploadPDF';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EditForm from './components/EditForm';
import UserPage from './components/UserPage';

import 'bootstrap/dist/css/bootstrap.min.css' ;

function App(props) {
  let routes = useRoutes([
    {path: "/", element: <Home isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />},
    {path: "/upload", element: <UploadPDF isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />},
    {path: "/login", element: <Login isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />},
    {path: "/register", element: <Register isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />},
    {path: "/editinfo", element: <EditForm isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} /> },
    {path: "/userpage", element: <UserPage isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />},
  ]);

  return (
    routes
  );
}

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <Router>
    <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
  </Router>
}

export default AppWrapper;