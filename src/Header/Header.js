import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './header.scss';
import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
class Header extends Component {

    render() {
        return (
          
  
          <div className="row navBackground fixed-top">
            <nav className="navbar navbar-expand-lg  col-md-9 offset-md-1">
          <button className="navbar-toggler" type="button" data-toggle="collapse"
           data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
              
              <li className="nav-item">
                <Link className="nav-link parentChild setFontColor" to="/">PauseWork</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
            <li className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/newabsence">New Absence</Link>
              </li>

            <li className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/dashboard">Dashboard</Link>
              </li>
              <li id="idSign" className="nav-item">
                <Link className="nav-link navChild setFontColor" to="/signup">Signup</Link>
              </li>
            </ul>
              {/* <button className="btn btn-outline-primary my-2 my-sm-0 setFontColor" type="submit">Sign in</button> */}
                  <Link to="/signin">
                    <button style={{height: '35px'}} className="btn btn-outline-primary my-2 my-sm-0 setFontColor">
                        <p>Sign in</p>
                    </button>
                 </Link>
            </form>
          </div>
        </nav>
          </div>
              

            );
    }
}
export default Header;