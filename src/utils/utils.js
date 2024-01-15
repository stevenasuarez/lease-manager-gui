export const formatNumberWithDots = (number) => {
    // Elimina los puntos existentes y luego agrega los nuevos cada tres dígitos
    const plainNumber = number.replace(/\./g, '');
    return plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
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
    initialDateNumber: formData.initialDate.getDate(),
    initialMonth: formData.initialDate.toLocaleString('default', { month: 'long' }).toUpperCase(),
    initialYear: formData.initialDate.getFullYear(),
    rentalFee: formData.rentalFee,
    rentalFeeNumber: formData.rentalFeeNumber,
    payDayNumber: formData.payDayNumber,
    payLimitDayNumber: formData.payLimitDayNumber,
    accountType: formData.accountType,
    bankName: formData.bankName,
    accountName: formData.accountName,
    numberOfTenantsInNumbers: formData.numberOfTenantsInNumbers,
    signingDayNumber: formData.signingDate.getDate(),
    signingMonth: formData.signingDate.toLocaleString('default', { month: 'long' }).toUpperCase(),
    signingYear: formData.signingDate.getFullYear()
  };
  