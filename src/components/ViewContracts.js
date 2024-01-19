import React, { useEffect, useState } from 'react';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import "./ViewContract.css"

const ViewContracts = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch('http://localhost:8080/details');
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Error al cargar los contratos: ", error);
      }
    };

    fetchContracts();
  }, []);

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      `,
    },
  ]);

  const COLUMNS = [
    { label: "Id", renderCell: (item) => item.id, resize: true },
    { label: "Duración en meses", renderCell: (item) => item.contractDuration, resize: true },
    { label: "Dia inicio", renderCell: (item) => item.initialDateNumber, resize: true },
    { label: "Mes inicio", renderCell: (item) => item.initialMonth, resize: true },
    { label: "Año inicio", renderCell: (item) => item.initialYear, resize: true },
    { label: "Dia fin", renderCell: (item) => item.endDateNumber, resize: true },
    { label: "Mes fin", renderCell: (item) => item.endMonth, resize: true },
    { label: "Año fin", renderCell: (item) => item.endYear, resize: true },
    { label: "Fecha inicio", renderCell: (item) => item.initialDateNumber, resize: true },
    { label: "Canon", renderCell: (item) => item.rentalFeeNumber, resize: true },
    { label: "Dia pago oportuno", renderCell: (item) => item.payDayNumber, resize: true },
    { label: "Dia maximo de pago", renderCell: (item) => item.payLimitDayNumber, resize: true },
    { label: "# Inquilinos", renderCell: (item) => item.numberOfTenantsInNumbers, resize: true },
    { label: "Dia de firma", renderCell: (item) => item.signingDayNumber, resize: true },
    { label: "Mes de firma", renderCell: (item) => item.signingMonth, resize: true },
    { label: "Año de firma", renderCell: (item) => item.signingYear, resize: true },
    { label: "Estado contrato", renderCell: (item) => item.isActive ? "Activo" : "Inactivo", resize: true },
    { label: "Fecha de terminacion", renderCell: (item) => item.terminationDate, resize: true },

    // Agrega aquí más columnas según tus datos
  ];

  let data = { nodes: contracts };
  const [isHide, setHide] = React.useState(false);

  data = {
    nodes: isHide ? data.nodes.filter((node) => !node.isActive) : data.nodes,
  };

  return (
    <div>
      <h1>Contratos</h1>
      <div>
        <label htmlFor="complete">
          Hide Complete:
          <input
            id="complete"
            type="checkbox"
            checked={isHide}
            onChange={() => setHide(!isHide)}
          />
        </label>
      </div>
      <br />
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      />
    </div>
  );
};

export default ViewContracts;