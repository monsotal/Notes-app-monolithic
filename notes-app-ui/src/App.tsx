import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainApp from "./MainApp";
import Login from "./Login";
import Stocks from "./Stocks";


const App: React.FC = () => {
return (
  <Routes>
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/mainapp" element={<MainApp />} />
    <Route path="/stocks" element={<Stocks />} />

  </Routes>
);
};

export default App;