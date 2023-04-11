import React, { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

import { Navbar, Button } from "react-bulma-components";
import AuthContext from "../store/auth-context";

// import "./navbar.css";

function Nav() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:4000/api/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          ctx.onLogout();
          alert("Logged Out!!!");
          window.location.href = "/";
        }
      })
      .catch((e) => {
        alert("error");
        console.log(e);
      });
  };

  return (
    <Navbar className="is-dark">
      <Navbar.Brand>
        <Navbar.Item href="#"> {/** Add nith logo here */ }
          <img
            alt="Bulma: a modern CSS framework based on Flexbox"
            height="28"
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
          />
        </Navbar.Item>
        <Navbar.Burger />.
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="/">Homepage</Navbar.Item>
          <Navbar.Item href="/editinfo">Change Your Info</Navbar.Item>
          <Navbar.Item href="/upload">UploadPDF</Navbar.Item>
          <Navbar.Item href="/allinterns">Check Internships</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container align="end" className="is-vcentered mt-auto mb-auto">
          {!ctx.isLoggedIn ? (
            <Navbar.Item href="/login" className="has-text-white">Login</Navbar.Item>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Navbar.Container>
        <Navbar.Container align="end" className="is-vcentered mt-auto mb-auto">
          {!ctx.isLoggedIn ? (
            <Navbar.Item href="/register" className="has-text-white mt-auto">Register</Navbar.Item>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Navbar.Container>
        <Navbar.Container align="end mt-auto">
          {ctx.isLoggedIn ? (
            <Button backgroundColor="danger" onClick={onSubmit}>
              Logout
            </Button>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );

  // return (
  //   <Navbar className="is-justify-content-space-evenly mt-1">
  //       <Navbar.Item className="has-text-weight-bold">NITH</Navbar.Item>
  //       <Navbar.Item href="/">Homepage</Navbar.Item>
  //       <Navbar.Item href="/upload">UploadPDF</Navbar.Item>
  //       <Navbar.Item href="/allinterns">Check Internships</Navbar.Item>
  //       {!ctx.isLoggedIn?<Navbar.Item href="/login">Login</Navbar.Item>:<React.Fragment></React.Fragment>}
  //       {!ctx.isLoggedIn?<Navbar.Item href="/register">Register</Navbar.Item>:<React.Fragment></React.Fragment>}
  //       {ctx.isLoggedIn?<Button backgroundColor="danger" onClick={onSubmit}>Logout</Button>: <React.Fragment></React.Fragment>}

  //   </Navbar>
  // );

  
}

// return (
//   <Fragment>
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">
//           Navbar
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNavDropdown"
//           aria-controls="navbarNavDropdown"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavDropdown">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="/home">
//                 Home
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="/userpage">
//                 Your account
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="/build">
//                 Build resume
//               </a>
//             </li>
//             <li className="nav-item">
//               <a
//                 className="nav-link"
//                 href="http://localhost:4000/api/userpage"
//               >
//                 Temp Logout
//               </a>
//             </li>
//             <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle"
//                 href="#"
//                 id="navbarDropdownMenuLink"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 User options
//               </a>
//               <ul
//                 className="dropdown-menu"
//                 aria-labelledby="navbarDropdownMenuLink"
//               >
//                 <li>
//                   <a className="dropdown-item" href="/login">
//                     Login
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="/register">
//                     Register
//                   </a>
//                 </li>
//                 <li>
//                   <a className="dropdown-item" href="/logout">
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   </Fragment>
// );

export default Nav;
