import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import LoginForm from "../src/components/Login/LoginForm.tsx";
import RegisterForm from "../src/components/Login/RegisterForm.tsx";
import ProductList from "./components/pages/ProductList.tsx";
import  ProductList2 from './components/user/ProductList.tsx'

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/catalogo" element={<ProductList />} />
        <Route path="/catalogouser" element={<ProductList2 />} />
      </Routes>
    </div>
  );
}

export default App;
