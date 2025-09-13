// src/components/Navigation.jsx
import React from 'react';
import ActionCard from './ActionCard';
import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './Navigation.css';

function Navigation() {
  return (
    <div className="navigation-grid">
      <ActionCard
        icon={<FaPlus />}
        title="Crear Contrato"
        description="Inicia un nuevo contrato de arrendamiento desde cero."
        buttonLabel="Crear"
        color="blue"
        to="/create-contract"
      />
      <ActionCard
        icon={<FaEye />}
        title="Ver Contratos"
        description="Consulta todos los contratos activos e históricos."
        buttonLabel="Ver"
        color="green"
        to="/view-contracts"
      />
      <ActionCard
        icon={<FaEdit />}
        title="Actualizar Contrato"
        description="Modifica la información de un contrato existente."
        buttonLabel="Actualizar"
        color="yellow"
        to="/update-contract"
      />
      <ActionCard
        icon={<FaTrash />}
        title="Borrar Contrato"
        description="Elimina un contrato de forma permanente."
        buttonLabel="Borrar"
        color="red"
        to="/delete-contract"
      />
    </div>
  );
}

export default Navigation;
