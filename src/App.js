/* eslint-disable */
// src/App.js
import React, { useState } from 'react';
import Dashboard from './pages/Dashboard'; // Tu catálogo visual / Core Center
import Inventario from './pages/Inventario'; // Tu tabla CRUD exclusiva de admin
import Config from './pages/Config';

function App() {
  // Estados para el control de la sesión
  const [rolUsuario, setRolUsuario] = useState(null); // null, 'admin' o 'cliente'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vistaActual, setVistaActual] = useState('dashboard');

  // FUNCIÓN DE LOGIN CONFIGURADA CORRECTAMENTE
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (
      (username === 'admin' || username === 'fany_cyber' || username === 'fany_artemis') 
      && (password === 'fastech2026' || password === '12345')
    ) {
      setRolUsuario('admin'); 
      setVistaActual('dashboard'); // El admin puede iniciar en el dashboard si lo deseas
    } else {
      setRolUsuario('cliente'); 
      setVistaActual('dashboard'); // ¡AQUÍ ESTÁ EL TRUCO! El cliente va DIRECTO al catálogo visual
    }
  };

  const handleLogout = () => {
    setRolUsuario(null);
    setUsername('');
    setPassword('');
  };

  /* ==========================================
     1. PANTALLA DE LOGUEO (AUTH CORE)
     ========================================== */
  if (!rolUsuario) {
    return (
      <div style={styles.loginContainer}>
        <form onSubmit={handleLogin} style={styles.loginCard}>
          <div style={styles.loginHeader}>
            <h2 style={styles.loginTitle}>Fastech</h2>
            <span style={styles.loginSubtitle}>CORE SYSTEM AUTH</span>
          </div>
          
          <input 
            type="text" 
            placeholder="OPERATOR_ID / USERNAME" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.loginInput}
            required
          />
          <input 
            type="password" 
            placeholder="ACCESS_TOKEN / PASSWORD" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.loginInput}
            required
          />
          <button type="submit" style={styles.btnAuth}>INGRESAR AL ENTORNO</button>
        </form>
      </div>
    );
  }

  /* ==========================================
     2. ENTORNO DE SISTEMA DISTRIBUIDO
     ========================================== */
  return (
    <div style={styles.appContainer}>
      
      {/* LA BARRA LATERAL SOLO EXISTE SI ERES EL ADMINISTRADOR */}
      {rolUsuario === 'admin' ? (
        <aside style={styles.sidebar}>
          <div style={styles.brandWrapper}>
            <h2 style={styles.sidebarTitle}>Fastech</h2>
            <span style={styles.sidebarSubtitle}>CONTROL CENTER</span>
          </div>

          <nav style={styles.navMenu}>
            <button 
              onClick={() => setVistaActual('dashboard')}
              style={{...styles.sidebarButton, ...(vistaActual === 'dashboard' ? styles.sidebarButtonActive : {})}}
            >
              📊 Catálogo Principal
            </button>

            <button 
              onClick={() => setVistaActual('inventario')}
              style={{...styles.sidebarButton, ...(vistaActual === 'inventario' ? styles.sidebarButtonActive : {})}}
            >
              📦 Inventario (CRUD)
            </button>

            <button 
              onClick={() => setVistaActual('configuracion')}
              style={{...styles.sidebarButton, ...(vistaActual === 'configuracion' ? styles.sidebarButtonActive : {})}}
            >
              ⚙️ Configuración
            </button>
          </nav>

          <button onClick={handleLogout} style={styles.btnSidebarLogout}>
            ❌ CERRAR SESIÓN
          </button>
        </aside>
      ) : (
        /* CABECERA EXCLUSIVA DE MODO CLIENTE (SIN MENÚ LATERAL) */
        <header style={styles.clientHeader}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={styles.sidebarTitle}>Fastech</span>
            <span style={styles.sidebarSubtitle}>MODO INVITADO // TIENDA CLIENTE</span>
          </div>
          <button onClick={handleLogout} style={styles.btnClientLogout}>
            VOLVER AL LOGIN
          </button>
        </header>
      )}

      {/* CONTENEDOR DE PÁGINAS */}
      <main style={{
        ...styles.mainContent,
        marginTop: rolUsuario === 'cliente' ? '80px' : '0px'
      }}>
        {/* Renderizado Condicional Limpio */}
        {vistaActual === 'dashboard' && <Dashboard esAdmin={rolUsuario === 'admin'} />}
        {vistaActual === 'inventario' && rolUsuario === 'admin' && <Inventario esAdmin={true} />}
        {vistaActual === 'configuracion' && rolUsuario === 'admin' && <Config />}
      </main>

    </div>
  );
}

// Estilos de la interfaz global
const styles = {
  appContainer: { display: 'flex', backgroundColor: '#0a0f1d', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, overflowX: 'hidden', fontFamily: "'Courier New', Courier, monospace", color: '#eaeaea' },
  loginContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#0a0f1d' },
  loginCard: { backgroundColor: '#0b1120', padding: '40px', borderRadius: '12px', border: '1px solid #1e293d', display: 'flex', flexDirection: 'column', gap: '20px', width: '380px' },
  loginHeader: { textAlign: 'center', borderBottom: '1px solid rgba(0, 240, 255, 0.1)', paddingBottom: '15px' },
  loginTitle: { margin: 0, color: '#ffffff', fontSize: '28px', fontWeight: 'bold', letterSpacing: '3px' },
  loginSubtitle: { fontSize: '11px', color: '#00f0ff', letterSpacing: '2px', fontWeight: 'bold' },
  loginInput: { backgroundColor: '#0a0f1d', border: '1px solid #1e293d', color: '#ffffff', padding: '14px 16px', borderRadius: '8px', outline: 'none' },
  btnAuth: { backgroundColor: '#00f0ff', color: '#0a0f1d', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  sidebar: { width: '260px', backgroundColor: '#0b1120', borderRight: '1px solid #1e293d', padding: '30px 20px', display: 'flex', flexDirection: 'column', flexShrink: 0 },
  brandWrapper: { marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(0, 240, 255, 0.1)' },
  sidebarTitle: { margin: 0, color: '#ffffff', fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' },
  sidebarSubtitle: { fontSize: '11px', color: '#00f0ff', letterSpacing: '1.5px', fontWeight: 'bold' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 },
  sidebarButton: { backgroundColor: 'transparent', color: '#94a3b8', border: 'none', padding: '14px 18px', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', width: '100%' },
  sidebarButtonActive: { backgroundColor: 'rgba(0, 240, 255, 0.06)', color: '#00f0ff', borderLeft: '4px solid #00f0ff', paddingLeft: '14px' },
  btnSidebarLogout: { backgroundColor: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '8px', cursor: 'pointer', width: '100%' },
  clientHeader: { position: 'fixed', top: 0, left: 0, right: 0, height: '80px', backgroundColor: '#0b1120', borderBottom: '1px solid #1e293d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', zIndex: 1000 },
  btnClientLogout: { backgroundColor: 'transparent', color: '#94a3b8', border: '1px solid #334155', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
  mainContent: { flexGrow: 1, backgroundColor: '#0a0f1d', minHeight: '100vh' }
};

export default App;