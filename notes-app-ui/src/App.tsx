import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainApp from "./MainApp";
import Login from "./Login";

const App: React.FC = () => {
return (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/mainapp" element={<MainApp />} />
    <Route path="*" element={<Navigate to="/login" />} />
  </Routes>
);
};

export default App;