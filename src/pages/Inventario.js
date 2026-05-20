/* eslint-disable */
// src/pages/Inventario.js
import React, { useState, useEffect } from 'react';
import Formulario from '../components/Formulario';
import FilaProducto from '../components/FilaProducto';

// Recibimos "props" para gestionar dinámicamente el comportamiento Admin / Cliente
export default function Inventario(props) {
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

  // 2. CREAR (CREATE): Agregar un nuevo producto desde el formulario (Solo Admin)
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

  // 3. ELIMINAR (DELETE): Borrar un producto por su ID (Solo Admin)
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

  // 4. ACTUALIZAR (UPDATE): Editar los datos de un producto existente (Solo Admin)
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
        <p style={styles.bannerSubtitle}>
          {props.esAdmin 
            ? "Añade, edita o elimina componentes del almacén central en tiempo real (Modo Operador)." 
            : "Explora nuestro catálogo de hardware de vanguardia disponible para adquisición."
          }
        </p>
      </div>

      {/* El formulario de registro SOLO lo puede ver el Administrador */}
      {props.esAdmin && (
        <div style={styles.panelBlock}>
          <h3 style={styles.panelTitle}>⚡ REGISTRAR NUEVO COMPONENTE</h3>
          <div style={styles.formContainer}>
            <Formulario onAgregar={handleAgregar} />
          </div>
        </div>
      )}

      {/* Tabla del CRUD / Catálogo Estilo Cyberpunk */}
      <div style={styles.panelBlock}>
        <h3 style={styles.panelTitle}>
          {props.esAdmin ? "📦 REGISTROS EN MARIADB (CONTROL GLOBAL)" : "🛒 COMPONENTES DISPONIBLES"}
        </h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.thProduct}>PRODUCTO / IDENTIFICADOR</th>
                {/* COLUMNA COMPLEMENTARIA DE DESCRIPCIÓN */}
                <th style={styles.thDesc}>DESCRIPCIÓN TÉCNICA</th>
                <th style={styles.thPrice}>PRECIO UNITARIO</th>
                <th style={styles.thStock}>STOCK DISPONIBLE</th>
                <th style={styles.thRowActions}>
                  {props.esAdmin ? "ACCIONES DE CONTROL" : "ORDENAR HARDWARE"}
                </th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  {/* Cambiado colSpan a 5 para ajustarse a la nueva columna */}
                  <td colSpan="5" style={styles.emptyCell}>NO HAY REGISTROS EN EL SISTEMA</td>
                </tr>
              ) : (
                productos.map(p => (
                  <FilaProducto 
                    key={p.id} 
                    producto={p} 
                    esAdmin={props.esAdmin}
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

// Estilos limpios, futuristas y estructurados por columnas fijas
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
  
  formContainer: { width: '100%', display: 'block', margin: '10px 0' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', tableLayout: 'fixed' },
  thRow: { borderBottom: '2px solid #1f293d' },
  
  // Distribución proporcional de anchos en cabecera para evitar deformaciones
  thProduct: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', width: '25%' },
  thDesc: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', width: '35%' },
  thPrice: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', width: '12%' },
  thStock: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', width: '13%' },
  thRowActions: { padding: '15px 12px', color: '#9ca3af', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', width: '15%', minWidth: '240px' },
  
  emptyCell: { padding: '30px', color: '#6b7280', textAlign: 'center', fontSize: '13px', letterSpacing: '2px' }
};