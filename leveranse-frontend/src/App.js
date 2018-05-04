import React from 'react';
import { Route } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";

const App = () => (
  <div className=" ui container">
    <Route path="/" exact component={WelcomePage}/>
    <Route path="/innlogging" exact component={LoginPage}/>
    <Route path="/hjem" exact component={HomePage}/>
  </div>
);

export default App;
