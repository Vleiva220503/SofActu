import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <Link to="/login"></Link>
      <Link to="/register"></Link>
      <Link to="/catalogo"></Link>
    </nav>
  );
};

export default Navigation;
