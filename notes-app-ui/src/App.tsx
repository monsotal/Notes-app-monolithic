import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainApp from "./MainApp";
import Login from "./Login";
import Stocks from "./Stocks";
import ProtectedRoute from "./PrivateRoute";

const App: React.FC = () => {
return (
  <Routes>
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />

    <Route path="/mainapp" element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }
      />
    <Route path="/stocks" element={
          <ProtectedRoute>
            <Stocks />
          </ProtectedRoute>
        }
      />
  </Routes>
);
};

export default App;