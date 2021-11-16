import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/"><News Key="general" pageSize={5} country="in" category="general" /></Route>
            <Route exact path="/Business"><News Key="Business" pageSize={5} country="in" category="Business" /></Route>
            <Route exact path="/Entertainment"><News Key="Entertainment" pageSize={5} country="in" category="Entertainment" /></Route>
            <Route exact path="/General"> <News Key="General" pageSize={5} country="in" category="General" /></Route>
            <Route exact path="/Health "> <News Key="Health" pageSize={5} country="in" category="Health" /></Route>
            <Route exact path="/Science"><News Key="Science" pageSize={5} country="in" category="Science" /></Route>
            <Route exact path="/Sports"><News Key="Sports" pageSize={5} country="in" category="Sports" /></Route>
            <Route exact path="/Technology"><News Key="Technology" pageSize={5} country="in" category="Technology" /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
