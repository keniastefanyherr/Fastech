// src/components/Formulario.js
import React, { useState } from 'react';

export default function Formulario({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const registrar = (e) => {
    e.preventDefault();
    if (!nombre || !precio || !stock) return;
    
    // Le envía los datos limpios al componente padre (Inventario.js)
    onAgregar({ nombre, precio: parseFloat(precio), stock: parseInt(stock) });
    
    // Limpia sus propios inputs automáticamente
    setNombre(''); setPrecio(''); setStock('');
  };

  return (
    <form onSubmit={registrar} style={styles.formGrid}>
      <input 
        placeholder="Nombre del Artículo" 
        value={nombre} 
        onChange={e => setNombre(e.target.value)} 
        style={{ ...styles.inputField, ...styles.inputName }}
        required
      />
      <input 
        placeholder="Precio ($)" 
        type="number" 
        step="0.01"
        value={precio} 
        onChange={e => setPrecio(e.target.value)} 
        style={{ ...styles.inputField, ...styles.inputSmall }}
        required
      />
      <input 
        placeholder="Stock" 
        type="number" 
        value={stock} 
        onChange={e => setStock(e.target.value)} 
        style={{ ...styles.inputField, ...styles.inputSmall }}
        required
      />
      <button type="submit" style={styles.btnPrimary}>AÑADIR_REGISTRO</button>
    </form>
  );
}

// Estilos integrados para expandir el formulario y acoplarlo al modo oscuro
const styles = {
  formGrid: {
    display: 'flex',
    gap: '16px',
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap' // Evita que se amontone en pantallas más compactas
  },
  inputField: {
    backgroundColor: '#0a0f1d', // Fondo oscuro idéntico al de la app
    border: '1px solid #1f293d', // Borde sutil
    color: '#ffffff',
    padding: '12px 16px', // Más alto y cómodo para hacer clic y escribir
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: "'Courier New', Courier, monospace",
    outline: 'none',
    boxSizing: 'border-box'
  },
  // El campo de nombre ocupa más espacio horizontal
  inputName: {
    flex: '2',
    minWidth: '280px'
  },
  // Los campos numéricos son más compactos pero con buen espacio mínimo
  inputSmall: {
    flex: '1',
    minWidth: '120px'
  },
  btnPrimary: {
    backgroundColor: 'transparent',
    color: '#00f0ff', // El celeste neón característico de tus paneles
    border: '1px solid #00f0ff',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px',
    letterSpacing: '1px',
    fontFamily: "'Courier New', Courier, monospace', sans-serif",
    boxShadow: '0 0 10px rgba(0, 240, 255, 0.15)',
    transition: 'all 0.2s ease',
    height: '45px' // Emparejado simétricamente con los inputs
  }
};