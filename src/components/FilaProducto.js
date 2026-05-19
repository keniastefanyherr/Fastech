/* eslint-disable */
// src/components/FilaProducto.js
import React, { useState } from 'react';

export default function FilaProducto({ producto, onEliminar, onActualizar }) {
  const [editando, setEditando] = useState(false);
  
  // Estados locales con los valores actuales
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);

  const handleGuardar = () => {
    // Mandamos únicamente los datos modificables para que MariaDB no toque la imagen
    const productoEditado = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };
    onActualizar(producto.id, productoEditado);
    setEditando(false);
  };

  if (editando) {
    return (
      <tr style={styles.rowEdit}>
        <td style={styles.td}>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={styles.input} />
        </td>
        <td style={styles.td}>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} style={styles.input} />
        </td>
        <td style={styles.td}>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={styles.input} />
        </td>
        <td style={styles.tdActions}>
          <button onClick={handleGuardar} style={styles.btnSave}>GUARDAR</button>
          <button onClick={() => setEditando(false)} style={styles.btnCancel}>CANCELAR</button>
        </td>
      </tr>
    );
  }

  // Buscamos la imagen en la ruta que elijas
  const imagenUrl = `/imagenes/${producto.imagen || 'default.jpg'}`;

  return (
    <tr style={styles.row}>
      <td style={styles.tdText}>
        <div style={styles.productCell}>
          <div style={styles.miniPreview}>
            <img 
              src={imagenUrl} 
              alt={producto.nombre} 
              style={styles.miniImg} 
              onError={(e) => {
                // Si no la encuentra en public, intenta buscarla en tu carpeta de assets
                e.target.onerror = null;
                try {
                  e.target.src = require(`../assets/imagenes/${producto.imagen || 'default.jpg'}`);
                } catch (err) {
                  e.target.src = 'https://via.placeholder.com/50?text=NO_FILE';
                }
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={styles.mainName}>{producto.nombre}</span>
            <span style={styles.subId}>ID_NODO: #{producto.id}</span>
          </div>
        </div>
      </td>
      
      <td style={styles.tdPrice}>${parseFloat(producto.precio).toFixed(2)}</td>
      
      <td style={producto.stock > 0 ? styles.tdStock : styles.tdNoStock}>
        <div style={styles.stockBox}>
          <div style={producto.stock > 0 ? styles.ledGreen : styles.ledRed}></div>
          {producto.stock > 0 ? `${producto.stock} UNIDADES` : 'OUT_OF_ORDER // BLOQUEADO'}
        </div>
      </td>
      
      <td style={styles.tdActions}>
        {/* Simplificación de los nombres de los botones para que no choquen */}
        <button onClick={() => setEditando(true)} style={styles.btnEdit}>EDITAR</button>
        <button onClick={() => onEliminar(producto.id)} style={styles.btnDelete}>ELIMINAR</button>
      </td>
    </tr>
  );
}

const styles = {
  row: { borderBottom: '1px solid #1f293d', backgroundColor: 'transparent', transition: 'background 0.2s' },
  rowEdit: { borderBottom: '2px solid #00f0ff', backgroundColor: 'rgba(0, 240, 255, 0.03)' },
  td: { padding: '20px 15px' },
  tdText: { padding: '20px 15px', color: '#ffffff' },
  productCell: { display: 'flex', alignItems: 'center', gap: '15px' },
  miniPreview: { width: '50px', height: '50px', backgroundColor: '#fff', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4px', border: '1px solid #1f293d' },
  miniImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  mainName: { fontSize: '16px', fontWeight: 'bold', fontFamily: 'sans-serif', color: '#ffffff' },
  subId: { fontSize: '11px', color: '#6b7280', marginTop: '3px', letterSpacing: '1px' },
  tdPrice: { padding: '20px 15px', color: '#00f0ff', fontWeight: 'bold', fontSize: '18px', fontFamily: 'monospace' },
  tdStock: { padding: '20px 15px', color: '#10b981', fontSize: '15px', fontWeight: 'bold' },
  tdNoStock: { padding: '20px 15px', color: '#ef4444', fontSize: '15px', fontWeight: 'bold' },
  stockBox: { display: 'flex', alignItems: 'center', gap: '10px' },
  ledGreen: { width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' },
  ledRed: { width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 8px #ef4444' },
  
  // Cambios estructurales para evitar que se amontone el texto
  tdActions: { padding: '20px 15px', display: 'flex', gap: '12px', alignItems: 'center', minWidth: '220px', justifyContent: 'flex-start' },
  input: { backgroundColor: '#0a0f1d', border: '1px solid #1f293d', color: '#ffffff', padding: '10px 12px', borderRadius: '6px', width: '90%', fontFamily: 'monospace', fontSize: '14px' },
  
  // Ajuste de anchos para las versiones simplificadas de 6 letras
  btnEdit: { backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '95px', textAlign: 'center', transition: 'all 0.2s' },
  btnDelete: { backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '95px', textAlign: 'center', transition: 'all 0.2s' },
  
  btnSave: { backgroundColor: '#10b981', color: '#0a0f1d', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '95px' },
  btnCancel: { backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #374151', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', width: '95px' }
};