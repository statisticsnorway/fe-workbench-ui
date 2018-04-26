import React from 'react';
import { Route } from "react-router-dom";
import WelcomePage from "./components/pages/WelcomePage";
import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import LeveransePage from "./components/pages/LeveranseAvtale";

const App = () => (
    <div className=" ui container">
         <Route path = "/" exact component={WelcomePage} />
         <Route path = "/login" exact component={LoginPage} />
         <Route path = "/home" exact component={HomePage} />
         <Route path = "/leveranseAvtale" exact component={LeveransePage} />
    </div>
);

export default App;
