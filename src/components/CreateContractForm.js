import React, { useState } from 'react';

function CreateContractForm() {
  const [formData, setFormData] = useState({
    tenantName: '',
    tenantIdNumber: '',
    tenantIdIssuePlace: '',
    // Agrega aquí todos los campos del contrato
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí procesarás los datos del formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.tenantName}
        onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
        placeholder="Nombre del Inquilino"
      />
      {/* Agrega aquí inputs para cada campo del formulario */}
      <button type="submit">Crear Contrato</button>
    </form>
  );
}

export default CreateContractForm;