// En ContractDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ContractDetails.css"

const ContractDetail = () => {
  const { id } = useParams(); // Obtiene el id del contrato desde la URL
  const [contractDetail, setContractDetail] = useState(null);

  const navigate  = useNavigate();
    const handleBackClick = () => {
        navigate('/view-contracts'); // Redirige a la página inicial
    };

  useEffect(() => {
    const fetchContractDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8080/contractDetails/${id}`);
        const data = await response.json();
        setContractDetail(data);
      } catch (error) {
        console.error("Error al cargar el detalle del contrato: ", error);
      }
    };

    fetchContractDetail();
  }, [id]);

  // Verifica si los detalles del contrato están disponibles
  if (!contractDetail) {
    return <div>Cargando...</div>;
  }

  // Renderiza la información del contrato
  return (
    <div className="contractDetailContainer">
        <div className="contractDetailSection">
            <h2>Datos del Arrendatario</h2>
            <p><strong>Nombre:</strong> {contractDetail.tenantName}</p>
            <p><strong>Identificación:</strong> {contractDetail.tenantIdNumber}</p>
            <p><strong>Lugar de Expedición:</strong> {contractDetail.tenantIdIssuePlace}</p>
        </div>
        <div className="contractDetailSection">
            <h2>Datos del Apartamento</h2>
            <p><strong>Numero:</strong> {contractDetail.flatNumber}</p>
            <p><strong>Piso:</strong> {contractDetail.floor}</p>
            <p><strong>Direccion:</strong> {contractDetail.address}</p>
            <p><strong>Barrio:</strong> {contractDetail.neighborhood}</p>
            <p><strong>Inventario:</strong> {contractDetail.inventory}</p>
            <p><strong>Estado:</strong> {contractDetail.occupied ? "Ocupado" : "Disponible" }</p>
        </div>
        <div className="contractDetailSection">
        <h2>Datos del Contrato</h2>
            <p><strong>Duracion en meses:</strong> {contractDetail.contractDurationInNumbers}</p>
            <p><strong>Fecha inicio:</strong> {`${contractDetail.initialDateNumber}/${contractDetail.initialMonth}/${contractDetail.initialYear}`}</p>
            <p><strong>Fecha fin:</strong> {contractDetail.endDate ? `${contractDetail.endDateNumber}/${contractDetail.endMonth}/${contractDetail.endYear}` : 'N/A'}</p>
            <p><strong>Fecha firma:</strong> {`${contractDetail.signingDayNumber}/${contractDetail.signingMonth}/${contractDetail.signingYear}`}</p>
            <p><strong>Canon en letras:</strong> {contractDetail.rentalFee}</p>
            <p><strong>Canon en numeros:</strong> {contractDetail.rentalFeeNumber }</p>
            <p><strong>Dia de pago oportuno:</strong> {contractDetail.payDayNumber}</p>
            <p><strong>Dia pago maximo:</strong> {contractDetail.payLimitDayNumber}</p>
            <p><strong># Inquilinos:</strong> {contractDetail.numberOfTenantsInNumbers}</p>
        </div>
        <button type="button" onClick={handleBackClick}>Volver</button>
    </div>
  );
};

export default ContractDetail;