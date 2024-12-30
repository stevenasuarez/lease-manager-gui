// En ContractDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ContractDetails.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const monthToNumber = (month) => {
  const months = {
    ENERO: 1,
    FEBRERO: 2,
    MARZO: 3,
    ABRIL: 4,
    MAYO: 5,
    JUNIO: 6,
    JULIO: 7,
    AGOSTO: 8,
    SEPTIEMBRE: 9,
    OCTUBRE: 10,
    NOVIEMBRE: 11,
    DICIEMBRE: 12,
  };
  return months[month.toUpperCase()] || 1; // Default a enero si no encuentra el mes
};

const parseDate = (day, month, year) => {
  const monthNumber = monthToNumber(month);
  return new Date(year, monthNumber - 1, day); // Restamos 1 porque los meses en Date van de 0 a 11
};

const ContractDetail = () => {
  const { id } = useParams(); // Obtiene el id del contrato desde la URL
  const [contractDetail, setContractDetail] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para el modo de edición
  const [initialDate, setInitialDate] = useState(null); // Por defecto, null
  const [signingDate, setSigningDate] = useState(null);

  // Estados para los campos editables
  const [tenantName, setTenantName] = useState('');
  const [tenantIdNumber, setTenantIdNumber] = useState('');
  const [tenantIdIssuePlace, setTenantIdIssuePlace] = useState('');
  const [flatNumber, setFlatName] = useState('');
  const [contractDurationInNumbers, setContractDurationInNumbers] = useState('');
  const [initialDateNumber, setInitialDateNumber] = useState('');
  const [initialMonth, setInitialMonth] = useState('');
  const [initialYear, setInitialYear] = useState('');
  const [rentalFee, setRentalFee] = useState('');
  const [rentalFeeNumber, setRentalFeeNumber] = useState('');
  const [payDayNumber, setPayDayNumber] = useState('');
  const [payLimitDayNumber, setPayLimitDayNumber] = useState('');
  const [numberOfTenantsInNumbers, setNumberOfTenantsInNumbers] = useState('');
  const [signingDayNumber, setSigningDayNumber] = useState('');
  const [signingMonth, setSigningMonth] = useState('');
  const [signingYear, setSigningYear] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');



  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/view-contracts'); // Redirige a la página inicial
  };

  const fetchContractDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/contractDetails/${id}`);
      const data = await response.json();
      setContractDetail(data);
      // Inicializa los estados de los campos editables
      setTenantName(data.tenantName);
      setTenantIdNumber(data.tenantIdNumber);
      setTenantIdIssuePlace(data.tenantIdIssuePlace);
      setFlatName(data.flatNumber);
      setContractDurationInNumbers(data.contractDurationInNumbers);
      setInitialDateNumber(data.initialDateNumber);
      setInitialMonth(data.initialMonth);
      setInitialYear(data.initialYear);
      setRentalFee(data.rentalFee);
      setRentalFeeNumber(data.rentalFeeNumber);
      setPayDayNumber(data.payDayNumber);
      setNumberOfTenantsInNumbers(data.numberOfTenantsInNumbers);
      setSigningDayNumber(data.signingDayNumber);
      setSigningMonth(data.signingMonth);
      setSigningYear(data.signingYear);
      setPayLimitDayNumber(data.payLimitDayNumber);
      // TODO: Mover a variables de entorno en archivo .env
      setAccountType("CORRIENTE"); // Valor quemado temporalmente
      setBankName("BANCO DE BOGOTA"); // Valor quemado temporalmente
      setAccountName("035489582"); // Valor quemado temporalmente

      setInitialDate(parseDate(data.initialDateNumber, data.initialMonth, data.initialYear));
      setSigningDate(parseDate(data.signingDayNumber, data.signingMonth, data.signingYear));
    } catch (error) {
      console.error("Error al cargar el detalle del contrato: ", error);
    }
  };

  const handleSaveChanges = async () => {
    const updatedContract = {
      tenant: {
        name: tenantName,
        idNumber: tenantIdNumber,
        idIssuePlace: tenantIdIssuePlace,
      },
      apartment: {
        flatNumber,
      },
      contractDurationInNumbers,
      initialDateNumber: initialDate.getDate().toString(),
      initialMonth: initialDate.toLocaleString("en-US", { month: "long" }).toUpperCase(),
      initialYear: initialDate.getFullYear().toString(),
      rentalFee,
      rentalFeeNumber,
      payDayNumber,
      payLimitDayNumber,
      accountType,
      bankName,
      accountName,
      numberOfTenantsInNumbers,
      signingDayNumber: signingDate.getDate().toString(),
      signingMonth: signingDate.toLocaleString("en-US", { month: "long" }).toUpperCase(),
      signingYear: signingDate.getFullYear().toString(),
    };

    try {
      const response = await fetch(`http://localhost:8080/contractUpdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContract),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
      }

      const responseBody = await response.text(); // Procesa el cuerpo como texto plano

      // Verifica si la respuesta contiene el texto esperado
      if (responseBody.trim() === "Contrato actualizado con éxito.") {
        alert(responseBody); // Muestra el mensaje exitoso
        setIsEditing(false);
        window.location.reload();
      } else {
        console.warn("Respuesta inesperada del servidor:", responseBody);
        alert("Advertencia: Respuesta inesperada del servidor.");
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };




  useEffect(() => {
    fetchContractDetail();
  }, [id]);

  // Funciones para manejar los cambios en los campos editables
  const handleTenantNameChange = (event) => setTenantName(event.target.value);
  const handleTenantIdChange = (event) => setTenantIdNumber(event.target.value);
  const handleTenantIssuePlaceChange = (event) => setTenantIdIssuePlace(event.target.value);
  const handleFlatName = (event) => setFlatName(event.target.value);
  const handleContractDurationInNumbers = (event) => setContractDurationInNumbers(event.target.value);
  const handleRentalFee = (event) => setRentalFee(event.target.value);
  const handleRentalFeeNumber = (event) => setRentalFeeNumber(event.target.value);
  const handleNumberOfTenantsInNumbersChange = (event) => setNumberOfTenantsInNumbers(event.target.value);
  const handlePayDayNumber = (event) => setPayDayNumber(event.target.value);
  const handlePayLimitDate = (event) => setPayLimitDayNumber(event.target.value);

  // Verifica si los detalles del contrato están disponibles
  if (!contractDetail) {
    return <div>Cargando...</div>;
  }

  // Renderiza la información del contrato
  return (
    <div className="contractDetailContainer">
      {isEditing ? (
        // Renderiza los campos editables
        <form>
          <div className="contractDetailSection">
            <h2>Datos del Arrendatario</h2>
            <label>Nombre:</label>
            <input type="text" value={tenantName} onChange={handleTenantNameChange} />

            <label>Identificación:</label>
            <input type="text" value={tenantIdNumber} onChange={handleTenantIdChange} />

            <label>Lugar de Expedición:</label>
            <input type="text" value={tenantIdIssuePlace} onChange={handleTenantIssuePlaceChange} />
          </div>
          <div className="contractDetailSection">
            <h2>Datos del Apartamento</h2>
            <label>Piso apartamento:</label>
            <input type="text" value={flatNumber} onChange={handleFlatName} />
          </div>
          <div className="contractDetailSection">
            <h2>Datos del Contrato</h2>
            <label>Duracion contrato en numeros:</label>
            <input type="text" value={contractDurationInNumbers} onChange={handleContractDurationInNumbers} />
            <label>Canon en letras (valor en miles de pesos):</label>
            <input type="text" value={rentalFee} onChange={handleRentalFee} />
            <label>Canon en numeros:</label>
            <input type="text" value={rentalFeeNumber} onChange={handleRentalFeeNumber} />
            <label>Seleccionar Fecha Inicio:</label>
            <DatePicker
              selected={initialDate}
              onChange={(date) => {
                setInitialDate(date);
                setInitialDateNumber(date.getDate().toString());
                setInitialMonth(
                  date.toLocaleString("default", { month: "long" }).toUpperCase()
                );
                setInitialYear(date.getFullYear().toString());
              }}
            />
            <label>Seleccionar Fecha Firma:</label>
            <DatePicker
              selected={signingDate}
              onChange={(date) => {
                setSigningDate(date);
                setSigningDayNumber(date.getDate().toString());
                setSigningMonth(
                  date.toLocaleString("default", { month: "long" }).toUpperCase()
                );
                setSigningYear(date.getFullYear().toString());
              }}
            />
            <label># Inquilinos:</label>
            <input type="text" value={numberOfTenantsInNumbers} onChange={handleNumberOfTenantsInNumbersChange} />
            <label>Dia de pago oportuno</label>
            <input type="text" value={payDayNumber} onChange={handlePayDayNumber} />
            <label>Dia pago maximo</label>
            <input type="text" value={payLimitDayNumber} onChange={handlePayLimitDate} />

          </div>
          {/* Repetir para los otros datos del apartamento y del contrato */}
        </form>
      ) : (
        // Muestra los detalles del contrato como en tu código original
        <>
          {/* Aquí se muestra la información del contrato como en tu código original */
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
                <p><strong>Estado:</strong> {contractDetail.occupied ? "Ocupado" : "Disponible"}</p>
              </div>
              <div className="contractDetailSection">
                <h2>Datos del Contrato</h2>
                <p><strong>Duracion en meses:</strong> {contractDetail.contractDurationInNumbers}</p>
                <p><strong>Fecha inicio:</strong> {`${contractDetail.initialDateNumber}/${contractDetail.initialMonth}/${contractDetail.initialYear}`}</p>
                <p><strong>Fecha fin:</strong> {contractDetail.endDate ? `${contractDetail.endDateNumber}/${contractDetail.endMonth}/${contractDetail.endYear}` : 'N/A'}</p>
                <p><strong>Fecha firma:</strong> {`${contractDetail.signingDayNumber}/${contractDetail.signingMonth}/${contractDetail.signingYear}`}</p>
                <p><strong>Canon en letras:</strong> {contractDetail.rentalFee}</p>
                <p><strong>Canon en numeros:</strong> {contractDetail.rentalFeeNumber}</p>
                <p><strong>Dia de pago oportuno:</strong> {contractDetail.payDayNumber}</p>
                <p><strong>Dia pago maximo:</strong> {contractDetail.payLimitDayNumber}</p>
                <p><strong># Inquilinos:</strong> {contractDetail.numberOfTenantsInNumbers}</p>
              </div>
            </div>

          }
        </>
      )}

      {isEditing ? (
        <>
          <button onClick={handleSaveChanges}>Guardar cambios</button> {/* Nuevo botón */}
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>Actualizar</button> // Botón para habilitar la edición
      )}

      <button type="button" onClick={handleBackClick}>Volver</button>
    </div>
  );
};

export default ContractDetail;
