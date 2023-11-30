import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import InstructorPanel from "./components/InstructorPanel";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import './App.css';



const App = () => {

  return (
    <Router>
     <Navbar />   
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/instructor" element={<InstructorPanel />} />
      </Routes>
      
    </Router>
  );
};

export default App;
