import React from "react";
import { withRouter } from "react-router-dom";

import Navbar from "./Navbar";
import NavbarUser from "./NavbarUser";

const Navigation = () => {
  return(
    <div>
      {
        localStorage.usertoken ? <NavbarUser /> : <Navbar />
      }
    </div>
  );
}

export default withRouter(Navigation);
