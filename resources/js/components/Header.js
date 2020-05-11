import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Address from './Address';
import Details from './Details';

export default function Header() {
    return (
        <Router>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Demo App</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/address">Address Book</Link>
      </li>
      
    </ul>
  </div>
            </nav>
      </div>
      

      <Switch>
          <Route path="/address">
              <Address />
          </Route>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/edit/:id/">
            <Details />
          </Route>
      </Switch>
      </Router>
    )
}
