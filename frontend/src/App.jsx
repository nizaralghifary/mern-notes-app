import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";

const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<LandingPage/>}/>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      {routes}
    </div>
  );
};

export default App;