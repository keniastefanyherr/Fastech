// src/pages/Inventario.js
import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import FilaProducto from '../components/FilaProducto';

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. LEER (READ): Cargar los productos desde MariaDB al entrar a la página
  const cargarProductos = () => {
    fetch('http://localhost:5000/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar inventario:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. CREAR (CREATE): Agregar un nuevo producto desde el formulario
  const handleAgregar = async (nuevoProducto) => {
    try {
      const res = await fetch('http://localhost:5000/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });
      if (res.ok) {
        alert("SISTEMA: Producto registrado con éxito en MariaDB.");
        cargarProductos(); // Refrescamos la tabla automáticamente
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // 3. ELIMINAR (DELETE): Borrar un producto por su ID
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Está seguro de eliminar este componente del núcleo de inventario?")) return;

    try {
      const res = await fetch(`http://localhost:5000/productos/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert("SISTEMA: Producto eliminado del inventario.");
        cargarProductos(); // Refrescamos la tabla automáticamente
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // 4. ACTUALIZAR (UPDATE): Editar los datos de un producto existente
  const handleActualizar = async (id, productoEditado) => {
    try {
      const res = await fetch(`http://localhost:5000/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditado)
      });
      if (res.ok) {
        alert("SISTEMA: Registro actualizado en la base de datos.");
        cargarProductos(); // Refrescamos la tabla automáticamente
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  if (loading) {
    return <div style={styles.loading}>ACCEDIENDO AL NÚCLEO DE INVENTARIO...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Banner de Encabezado Tecnológico */}
      <div style={styles.banner}>
        <div style={styles.headerTitleBox}>
          <h1 style={styles.bannerTitle}>INVENTORY // CONTROL_PANEL</h1>
          <div style={styles.neonDot}></div>
        </div>
        <p style={styles.bannerSubtitle}>Añade, edita o elimina componentes del almacén central en tiempo real.</p>
      </div>

      {/* Formulario de Inserción Ampliado */}
      <div style={styles.panelBlock}>
        <h3 style={styles.panelTitle}>⚡ REGISTRAR NUEVO COMPONENTE</h3>
        <div style={styles.formContainer}>
          <Formulario onAgregar={handleAgregar} />
        </div>
      </div>

      {/* Tabla del CRUD Estilo Cyberpunk */}
      <div style={styles.panelBlock}>
        <h3 style={styles.panelTitle}>📦 REGISTROS EN MARIADB</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>PRODUCTO / IDENTIFICADOR</th>
                <th style={styles.th}>PRECIO UNITARIO</th>
                <th style={styles.th}>STOCK DISPONIBLE</th>
                <th style={styles.thRowActions}>ACCIONES DE CONTROL</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.emptyCell}>NO HAY REGISTROS EN EL SISTEMA</td>
                </tr>
              ) : (
                productos.map(p => (
                  <FilaProducto 
                    key={p.id} 
                    producto={p} 
                    onEliminar={handleEliminar} 
                    onActualizar={handleActualizar} 
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Estilos limpios, futuristas y espaciados
const styles = {
  container: { padding: '40px 30px', backgroundColor: '#0a0f1d', minHeight: '100vh', fontFamily: "'Courier New', Courier, monospace" },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', fontSize: '16px', letterSpacing: '4px', color: '#00f0ff', fontWeight: 'bold' },
  banner: { backgroundColor: '#111827', padding: '35px', borderRadius: '12px', boxShadow: '0 0 25px rgba(0, 240, 255, 0.12)', marginBottom: '35px', border: '1px solid #1f293d', borderLeft: '5px solid #00f0ff' },
  headerTitleBox: { display: 'flex', alignItems: 'center', gap: '15px' },
  bannerTitle: { margin: 0, color: '#ffffff', fontSize: '26px', fontWeight: 'bold', letterSpacing: '2px' },
  neonDot: { width: '10px', height: '10px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 10px #00f0ff' },
  bannerSubtitle: { margin: '10px 0 0 0', color: '#9ca3af', fontSize: '14px', fontFamily: 'sans-serif' },
  
  panelBlock: { backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f293d', marginBottom: '35px' },
  panelTitle: { color: '#00f0ff', fontSize: '14px', letterSpacing: '1px', margin: '0 0 20px 0', fontWeight: 'bold' },
  
  // Solución Formulario Pequeño: Forzar espacio y acomodo de inputs
  formContainer: {
    width: '100%',
    display: 'block',
    margin: '10px 0'
  },
  
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
  thRow: { borderBottom: '2px solid #1f293d' },
  th: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' },
  
  // Solución Botones Encimados: Asegurar un ancho mínimo para la celda de acciones en la cabecera
  thRowActions: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', minWidth: '260px' },
  
  emptyCell: { padding: '30px', color: '#6b7280', textAlign: 'center', fontSize: '13px', letterSpacing: '2px' }
};