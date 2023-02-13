import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./navbar.css";

function Navbar() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

  // add logout functionality

  return (
    <header className="Header">
      {/* <img src={require("../assets/logo.png")} className="Logo" alt="logo" /> */}
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/home">Home</a>
          <a href="/userpage">User Page</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
          <button >Logout</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
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

export default Navbar;
