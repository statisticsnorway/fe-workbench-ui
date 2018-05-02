import React from 'react';
import { Route } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import ProvisionAgreementPage from "./components/pages/ProvisionAgreementPage";

const App = () => (
  <div className=" ui container">
    <Route path="/" exact component={WelcomePage}/>
    <Route path="/innlogging" exact component={LoginPage}/>
    <Route path="/hjem" exact component={HomePage}/>
    <Route path="/leveranseavtale" exact component={ProvisionAgreementPage}/>
  </div>
);

export default App;
