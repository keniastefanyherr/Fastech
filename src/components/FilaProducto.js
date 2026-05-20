/* eslint-disable */
// src/components/FilaProducto.js
import React, { useState } from 'react';

export default function FilaProducto({ producto, onEliminar, onActualizar, onComprar, esAdmin = false }) {
  const [editando, setEditando] = useState(false);
  
  // Estados locales para la mutación del CRUD en MariaDB
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [stock, setStock] = useState(producto.stock);

  const handleGuardar = () => {
    const productoEditado = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };
    onActualizar(producto.id, productoEditado);
    setEditando(false);
  };

  const imagenUrl = `/imagenes/${producto.imagen || 'default.jpg'}`;

  // ==========================================
  // RENDER EN MODO EDICIÓN (EXCLUSIVO ADMIN CRUD)
  // ==========================================
  if (editando && esAdmin) {
    return (
      <tr style={styles.rowEdit}>
        <td style={styles.tdText}>
          <div style={styles.productCell}>
            <div style={styles.miniPreview}>
              <img 
                src={imagenUrl} 
                alt={producto.nombre} 
                style={styles.miniImg} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/50?text=NO_FILE';
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <input 
                type="text" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                style={styles.input} 
                placeholder="Nombre del componente"
              />
              <span style={styles.subId}>EDITANDO NODO: #{producto.id}</span>
            </div>
          </div>
        </td>
        
        <td style={styles.td}>
          <div style={styles.inputWrapper}>
            <span style={{ color: '#00f0ff', marginRight: '5px', fontFamily: 'monospace' }}>$</span>
            <input 
              type="number" 
              value={precio} 
              onChange={(e) => setPrecio(e.target.value)} 
              style={styles.inputNumeric} 
            />
          </div>
        </td>
        
        <td style={styles.td}>
          <input 
            type="number" 
            value={stock} 
            onChange={(e) => setStock(e.target.value)} 
            style={styles.inputNumeric} 
          />
        </td>
        
        <td style={styles.tdActions}>
          <button onClick={handleGuardar} style={styles.btnSave}>GUARDAR</button>
          <button onClick={() => setEditando(false)} style={styles.btnCancel}>CANCELAR</button>
        </td>
      </tr>
    );
  }

  // ==========================================
  // RENDER EN MODO LECTURA (ADMIN CRUD / TIENDA CLIENTE)
  // ==========================================
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
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/50?text=NO_FILE';
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
        {esAdmin ? (
          <>
            <button onClick={() => setEditando(true)} style={styles.btnEdit}>EDITAR</button>
            <button onClick={() => onEliminar(producto.id)} style={styles.btnDelete}>ELIMINAR</button>
          </>
        ) : (
          <button 
            onClick={() => onComprar && onComprar(producto.id)} 
            style={producto.stock > 0 ? styles.btnBuy : styles.btnDisabled}
            disabled={producto.stock <= 0}
          >
            {producto.stock > 0 ? 'COMPRAR' : 'AGOTADO'}
          </button>
        )}
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
  miniPreview: { width: '50px', height: '50px', backgroundColor: '#fff', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4px', border: '1px solid #1f293d', flexShrink: 0 },
  miniImg: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  mainName: { fontSize: '16px', fontWeight: 'bold', fontFamily: 'sans-serif', color: '#ffffff' },
  subId: { fontSize: '11px', color: '#6b7280', marginTop: '3px', letterSpacing: '1px' },
  tdPrice: { padding: '20px 15px', color: '#00f0ff', fontWeight: 'bold', fontSize: '18px', fontFamily: 'monospace' },
  tdStock: { padding: '20px 15px', color: '#10b981', fontSize: '15px', fontWeight: 'bold' },
  tdNoStock: { padding: '20px 15px', color: '#ef4444', fontSize: '15px', fontWeight: 'bold' },
  stockBox: { display: 'flex', alignItems: 'center', gap: '10px' },
  ledGreen: { width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' },
  ledRed: { width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', boxShadow: '0 0 8px #ef4444' },
  tdActions: { padding: '20px 15px', display: 'flex', gap: '12px', alignItems: 'center', minWidth: '260px', justifyContent: 'flex-start' },
  inputWrapper: { display: 'flex', alignItems: 'center' },
  input: { backgroundColor: '#0a0f1d', border: '1px solid #1f293d', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', width: '90%', fontFamily: 'monospace', fontSize: '14px', outline: 'none' },
  inputNumeric: { backgroundColor: '#0a0f1d', border: '1px solid #1f293d', color: '#00f0ff', padding: '8px 12px', borderRadius: '6px', width: '80px', fontFamily: 'monospace', fontSize: '14px', outline: 'none', fontWeight: 'bold' },
  btnEdit: { backgroundColor: 'transparent', color: '#38bdf8', border: '1px solid #38bdf8', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '95px', textAlign: 'center', transition: 'all 0.2s' },
  btnDelete: { backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '95px', textAlign: 'center', transition: 'all 0.2s' },
  btnSave: { backgroundColor: '#10b981', color: '#0a0f1d', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '95px', textAlign: 'center' },
  btnCancel: { backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #374151', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', width: '95px', textAlign: 'center' },
  btnBuy: { backgroundColor: '#10b981', color: '#0a0f1d', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', width: '120px', textAlign: 'center', transition: 'background 0.2s' },
  btnDisabled: { backgroundColor: '#1f293d', color: '#6b7280', border: '1px solid #374151', padding: '10px 16px', borderRadius: '6px', cursor: 'not-allowed', fontSize: '12px', fontWeight: 'bold', width: '120px', textAlign: 'center' }
};