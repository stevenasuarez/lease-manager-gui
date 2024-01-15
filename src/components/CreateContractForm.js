import React, { useState } from 'react';
import './CreateContractForm.css';
import { formatNumberWithDots } from '../utils/utils';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateContractForm() {
    const [formData, setFormData] = useState({
      tenantName: '',
      tenantIdNumber: '',
      tenantIdIssuePlace: '',
      flatNumber: '',
      contractDurationInNumbers: '',
      initialDateNumber: '',
      rentalFee: '',
      rentalFeeNumber: '',
      payDayNumber: '',
      payLimitDayNumber: '',
      accountType: '',
      bankName: '',
      accountName: '',
      numberOfTenantsInNumbers: '',
      signingDate: '',
      // Continúa agregando campos para cada atributo del JSON
    });

    const [initialDate, setInitialDate] = useState(new Date());
    const [signingDate, setSigningDate] = useState(new Date());
  
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const contractData = {
          tenant: {
            name: formData.tenantName,
            idNumber: formData.tenantIdNumber,
            idIssuePlace: formData.tenantIdIssuePlace
          },
          apartment: {
            flatNumber: formData.flatNumber
          },
          contractDurationInNumbers: formData.contractDurationInNumbers,
          initialDateNumber: initialDate.getDate(),
          initialMonth: initialDate.toLocaleString('default', { month: 'long' }).toUpperCase(),
          initialYear: initialDate.getFullYear(),
          rentalFee: formData.rentalFee,
          rentalFeeNumber: formData.rentalFeeNumber,
          payDayNumber: formData.payDayNumber,
          payLimitDayNumber: formData.payLimitDayNumber,
          accountType: formData.accountType,
          bankName: formData.bankName,
          accountName: formData.accountName,
          numberOfTenantsInNumbers: formData.numberOfTenantsInNumbers,
          signingDayNumber: signingDate.getDate(),
          signingMonth: signingDate.toLocaleString('default', { month: 'long' }).toUpperCase(),
          signingYear: signingDate.getFullYear()
        }
        console.log(contractData);
      
        try {
            console.log(contractData);
          const response = await fetch('http://localhost:8080/contracts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contractData),
          });
      
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
      
          const responseData = await response.json();
          console.log(responseData);
          // Aquí puedes manejar acciones posteriores al éxito del envío
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
        }
      };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className='section'>
            <h2>Datos del Inquilino</h2>
            <div className='input-group'>
                <label htmlFor="tenantName">Nombre:</label>
                <input
                    type="text"
                    id="tenantName"
                    value={formData.tenantName}
                    onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
                    placeholder="Nombre"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="tenantIdNumber">Cedula:</label>
                <input
                    type="text"
                    id="tenantIdNumber"
                    value={formData.tenantIdNumber}
                    onChange={(e) => setFormData({ ...formData, tenantIdNumber: formatNumberWithDots(e.target.value) })}
                    placeholder="Cedula"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="tenantIdIssuePlace">Cedula:</label>
                <input
                    type="text"
                    id="tenantIdIssuePlace"
                    value={formData.tenantIdIssuePlace}
                    onChange={(e) => setFormData({ ...formData, tenantIdIssuePlace: e.target.value })}
                    placeholder="Lugar expedicion documento"
                />
            </div>
        </div>
        <div className='section'>
            <h2>Datos del apartamento</h2>
            <div className='input-group'>
                <label htmlFor="flatNumber">Numero apartamento:</label>
                <input
                    type="text"
                    id="flatNumber"
                    value={formData.flatNumber}
                    onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })}
                    placeholder="Numero apartamento"
                />
            </div>
        </div>
        <div className='section'>
            <h2>Datos del contrato</h2>
            <div className='input-group'>
                <label htmlFor="contractDurationInNumbers">Duracion contrato:</label>
                <input
                    type="text"
                    id="contractDurationInNumbers"
                    value={formData.contractDurationInNumbers}
                    onChange={(e) => setFormData({ ...formData, contractDurationInNumbers: e.target.value })}
                    placeholder="Duracion contrato"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="initialDateNumber">Fecha de inicio:</label>
                <DatePicker
                    selected={initialDate}
                    onChange={(date) => setInitialDate(date)}
                />
            </div>
            <div className='input-group'>
                <label htmlFor="rentalFee">Canon en letras:</label>
                <input
                    type="text"
                    id="rentalFee"
                    value={formData.rentalFee}
                    onChange={(e) => setFormData({ ...formData, rentalFee: e.target.value })}
                    placeholder="Canon en letras"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="rentalFeeNumber">Canon en numeros:</label>
                <input
                    type="text"
                    id="rentalFeeNumber"
                    value={formData.rentalFeeNumber}
                    onChange={(e) => setFormData({ ...formData, rentalFeeNumber: formatNumberWithDots(e.target.value) })}
                    placeholder="Canon en numeros"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="payDayNumber">Dia de pago:</label>
                <input
                    type="text"
                    id="payDayNumber"
                    value={formData.payDayNumber}
                    onChange={(e) => setFormData({ ...formData, payDayNumber: e.target.value })}
                    placeholder="Dia de pago"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="payLimitDayNumber">Dia maximo de pago:</label>
                <input
                    type="text"
                    id="payLimitDayNumber"
                    value={formData.payLimitDayNumber}
                    onChange={(e) => setFormData({ ...formData, payLimitDayNumber: e.target.value })}
                    placeholder="Dia maximo de pago"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="accountType">Tipo cuenta:</label>
                <input
                    type="text"
                    id="accountType"
                    value={formData.accountType}
                    onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
                    placeholder="Tipo cuenta"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="bankName">Banco:</label>
                <input
                    type="text"
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    placeholder="Banco"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="accountName"># Cuenta:</label>
                <input
                    type="text"
                    id="accountName"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    placeholder="# Cuenta"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="numberOfTenantsInNumbers"># Inquilinos:</label>
                <input
                    type="text"
                    id="numberOfTenantsInNumbers"
                    value={formData.numberOfTenantsInNumbers}
                    onChange={(e) => setFormData({ ...formData, numberOfTenantsInNumbers: e.target.value })}
                    placeholder="# Inquilinos"
                />
            </div>
            <div className='input-group'>
                <label htmlFor="signingDate">Fecha de firma:</label>
                <DatePicker
                    selected={signingDate}
                    onChange={(date) => setSigningDate(date)}
                />
            </div>
        </div>
        {/* Continúa agregando inputs para cada campo */}
        <button type="submit">Crear Contrato</button>
      </form>
    );
  }
  
  export default CreateContractForm;
