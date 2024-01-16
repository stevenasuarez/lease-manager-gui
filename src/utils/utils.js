export const formatNumberWithDots = (number) => {
    // Elimina los puntos existentes y luego agrega los nuevos cada tres dígitos
    const plainNumber = number.replace(/\./g, '');
    return plainNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  