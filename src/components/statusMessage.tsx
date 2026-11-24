interface StatusMessageProps {
  status: 'inicial' | 'carga' | 'resultado' | 'vacio' | 'error';
  message?: string;
}

export function StatusMessage({ status, message }: StatusMessageProps) {
  if (status === 'inicial') {
    return <p style={{ textAlign: 'center', color: '#666' }}>Realiza una búsqueda o selecciona una criptomoneda para empezar.</p>;
  }
  if (status === 'carga') {
    return <p style={{ textAlign: 'center', color: '#2563eb' }}>Cargando datos de la red...</p>;
  }
  if (status === 'vacio') {
    return <p style={{ textAlign: 'center', color: '#d97706' }}>No se encontraron resultados para tu búsqueda.</p>;
  }
  if (status === 'error') {
    return <p style={{ textAlign: 'center', color: '#dc2626' }}>Error: {message || 'Ocurrió un problema al obtener los datos.'}</p>;
  }
  return null;
}