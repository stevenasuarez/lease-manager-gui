import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Asegúrate de crear este archivo CSS con los estilos

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/create-contract"><button className="button">Crear Contrato</button></Link>
      <Link to="/view-contracts"><button className="button">Ver Contratos</button></Link>
      <Link to="/update-contract"><button className="button">Actualizar Contrato</button></Link>
      <Link to="/delete-contract"><button className="button">Borrar Contrato</button></Link>
      {/* Agrega más botones según las opciones que necesites */}
    </nav>
  );
}

export default Navigation;