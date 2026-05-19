// src/App.js
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventario'; 
// CORRECCIÓN 1: Descomentamos e importamos tu archivo exacto que se llama 'Config'
import Config from './pages/Config';

function App() {
  // Estado para controlar qué pestaña se renderiza
  const [vistaActual, setVistaActual] = useState('dashboard');

  return (
    <div style={styles.appContainer}>
      
      {/* BARRA LATERAL IZQUIERDA - ESTILO FASTECH CORE */}
      <aside style={styles.sidebar}>
        <div style={styles.brandWrapper}>
          <h2 style={styles.sidebarTitle}>Fastech</h2>
          <span style={styles.sidebarSubtitle}>CONTROL CENTER</span>
        </div>

        <nav style={styles.navMenu}>
          <button 
            onClick={() => setVistaActual('dashboard')}
            style={{
              ...styles.sidebarButton,
              ...(vistaActual === 'dashboard' ? styles.sidebarButtonActive : {})
            }}
          >
            <span style={styles.buttonIcon}>📊</span> Dashboard
          </button>

          <button 
            onClick={() => setVistaActual('inventario')}
            style={{
              ...styles.sidebarButton,
              ...(vistaActual === 'inventario' ? styles.sidebarButtonActive : {})
            }}
          >
            <span style={styles.buttonIcon}>📦</span> Inventario
          </button>

          <button 
            onClick={() => setVistaActual('configuracion')}
            style={{
              ...styles.sidebarButton,
              ...(vistaActual === 'configuracion' ? styles.sidebarButtonActive : {})
            }}
          >
            <span style={styles.buttonIcon}>⚙️</span> Configuración
          </button>
        </nav>
      </aside>

      {/* CONTENEDOR PRINCIPAL DE CONTENIDO */}
      <main style={styles.mainContent}>
        {vistaActual === 'dashboard' && <Dashboard />}
        {vistaActual === 'inventario' && <Inventario />}

        {/* CORRECCIÓN 2: Quitamos el bloque de texto viejo y renderizamos tu componente real */}
        {vistaActual === 'configuracion' && <Config />}
      </main>

    </div>
  );
}

// Estilos globales de la interfaz unificada de Fastech (Sin bordes blancos)
const styles = {
  appContainer: {
    display: 'flex',
    backgroundColor: '#0a0f1d', 
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    fontFamily: "'Courier New', Courier, monospace, sans-serif",
    color: '#eaeaea'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#0b1120', 
    borderRight: '1px solid #1e293d',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.4)'
  },
  brandWrapper: {
    marginBottom: '40px',
    paddingBottom: '15px',
    borderBottom: '1px solid rgba(0, 240, 255, 0.1)'
  },
  sidebarTitle: {
    margin: 0,
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textShadow: '0 0 10px rgba(0, 240, 255, 0.3)'
  },
  sidebarSubtitle: {
    fontSize: '11px',
    color: '#00f0ff',
    letterSpacing: '1.5px',
    fontWeight: 'bold'
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  sidebarButton: {
    backgroundColor: 'transparent',
    color: '#94a3b8',
    border: 'none',
    padding: '14px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.25s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%'
  },
  sidebarButtonActive: {
    backgroundColor: 'rgba(0, 240, 255, 0.06)',
    color: '#00f0ff',
    borderLeft: '4px solid #00f0ff',
    paddingLeft: '14px',
    textShadow: '0 0 5px rgba(0, 240, 255, 0.4)'
  },
  buttonIcon: {
    fontSize: '16px'
  },
  mainContent: {
    flexGrow: 1,
    backgroundColor: '#0a0f1d', 
    minHeight: '100vh',
    overflowY: 'auto'
  }
};

export default App;