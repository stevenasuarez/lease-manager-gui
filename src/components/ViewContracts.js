import React, { useEffect, useState } from 'react';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useNavigate } from 'react-router-dom';
import "./ViewContract.css"

const ViewContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  const navigate  = useNavigate();
    const handleBackClick = () => {
        navigate('/'); // Redirige a la página inicial
    };

    const fetchContracts = async () => {
      try {
        const response = await fetch('http://localhost:8080/details');
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Error al cargar los contratos: ", error);
      }
    };

    useEffect(() => {
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

  const handleRowClick = (item) => {
    if (expandedIds.includes(item.id)) {
      setExpandedIds(expandedIds.filter(id => id !== item.id));
    } else {
      setExpandedIds([...expandedIds, item.id]);
    }
  };

  const handleOpenDetail = (contractId) => {
    // Implementar la lógica para abrir los detalles del contrato
    navigate(`/contractDetails/${contractId}`);
  };
  
  // Función para manejar la terminación del contrato
  const handleTerminateContract = async (contractId) => {
    try {
      // Llamada al servicio DELETE
      await fetch(`http://localhost:8080/contracts/${contractId}`, { method: 'DELETE' });
      
      // Recargar la lista de contratos
      await fetchContracts();

      // Opcional: Mostrar mensaje de éxito
      alert('Contrato terminado con éxito.');
    } catch (error) {
      console.error('Error al terminar el contrato:', error);
      // Opcional: Mostrar mensaje de error
      alert('Error al terminar el contrato.');
    }
  };

  const COLUMNS = [
    //{ label: "Id", renderCell: (item) => item.id, resize: true },
    { label: "Apartamento", renderCell: (item) => item.flatNumber, resize: true },
    { label: "Arrendatario", renderCell: (item) => item.tenantName, resize: true },
    { label: "Duración en meses", renderCell: (item) => item.contractDuration, resize: true },
    { label: "Canon", renderCell: (item) => item.rentalFeeNumber, resize: true },
    { label: "Dia pago oportuno", renderCell: (item) => item.payDayNumber, resize: true },
    { label: "Dia maximo de pago", renderCell: (item) => item.payLimitDayNumber, resize: true },
    { label: "# Inquilinos", renderCell: (item) => item.numberOfTenantsInNumbers, resize: true },
    { label: "Estado contrato", renderCell: (item) => item.isActive ? "Activo" : "Inactivo", resize: true },
    //{ label: "Fecha de terminacion", renderCell: (item) => item.terminationDate, resize: true },
    // Agrega aquí más columnas según tus datos
  ];

  const ROW_OPTIONS = {
    renderAfterRow: (item) => (
      <>
        {expandedIds.includes(item.id) && (
          <tr style={{ display: 'flex', gridColumn: '1 / -1' }}>
            <td style={{ flex: '1' }}>
              <ul style={{ margin: '0', padding: '0', backgroundColor: '#e0e0e0' }}>
                <li>
                  <strong>Fecha inicio:</strong> {`${item.initialDateNumber}/${item.initialMonth}/${item.initialYear}`}
                </li>
                <li>
                  <strong>Fecha fin:</strong> {`${item.endDateNumber}/${item.endMonth}/${item.endYear}`}
                </li>
                <li>
                  <strong>Fecha firma:</strong> {`${item.signingDayNumber}/${item.signingMonth}/${item.signingYear}`}
                </li>
                {/* Agrega más información aquí si es necesario */}
              </ul>
              <div className="buttonGroup">
                <button className="detailButton" onClick={() => handleOpenDetail(item.id)}>Abrir Detalle</button>
                {item.isActive && (
                <button className="terminateButton" onClick={() => handleTerminateContract(item.id)}>Terminar Contrato</button>
              )}
              </div>
            </td>
          </tr>
        )}
      </>
    ),
  };

  let data = { nodes: contracts };
  const [isHide, setHide] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes
      .filter((node) => !isHide || node.isActive)
      .filter((node) => 
        node.tenantName.toLowerCase().includes(search.toLowerCase())
      ),
  };

  return (
    <div style={{ margin: 'auto', width: '80%', overflowX: 'auto' }}>
      <h1>Contratos</h1>
      <div>
        <label htmlFor="complete">
          Esconder contratos inactivos:
          <input
            id="complete"
            type="checkbox"
            checked={isHide}
            onChange={() => setHide(!isHide)}
          />
        </label>
      </div>
      <br />
      <label htmlFor="search">
        Search by Task:&nbsp;
        <input id="search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <br />
      <CompactTable
        columns={COLUMNS}
        data={data}
        theme={theme}
        rowProps={{
          onClick: handleRowClick,
        }}
        rowOptions={ROW_OPTIONS}
        //layout={{ custom: true, horizontalScroll: true }}
      />
      <button type="button" onClick={handleBackClick}>Volver</button>
    </div>
  );
};

export default ViewContracts;