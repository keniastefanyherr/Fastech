// src/pages/Config.js
import React, { useState, useEffect } from 'react';

export default function Config() {
  const [theme, setTheme] = useState('CYAN_NEON');
  const [seconds, setSeconds] = useState(388);

  // --- ESTADOS PARA CONTROLAR LA EDICIÓN DEL PERFIL ---
  const [isEditing, setIsEditing] = useState(false); // ¿Está en modo edición?
  const [userId, setUserId] = useState('ADMIN_CORE_01');
  const [alias, setAlias] = useState('fany_cyber');

  // Estados temporales para guardar lo que escribe el usuario antes de dar "Guardar"
  const [tempUserId, setTempUserId] = useState(userId);
  const [tempAlias, setTempAlias] = useState(alias);

  // Contador de tiempo de sesión activa
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  // Activar modo edición y cargar los valores actuales en los inputs
  const handleEdit = () => {
    setTempUserId(userId);
    setTempAlias(alias);
    setIsEditing(true);
  };

  // Guardar los cambios escritos
  const handleSave = () => {
    setUserId(tempUserId);
    setAlias(tempAlias);
    setIsEditing(false);
  };

  // Cancelar la edición sin guardar nada
  const handleCancel = () => {
    setIsEditing(false);
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'GREEN_MATRIX':
        return { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' };
      case 'RED_ALERT':
        return { primary: '#ef4444', glow: 'rgba(239, 68, 68, 0.25)' };
      case 'CYAN_NEON':
      default:
        return { primary: '#00f0ff', glow: 'rgba(0, 240, 255, 0.15)' };
    }
  };

  const colors = getThemeColors();

  return (
    <div style={styles.container}>
      
      {/* Banner Principal */}
      <div style={{ ...styles.banner, borderLeft: `5px solid ${colors.primary}`, boxShadow: `0 0 25px ${colors.glow}` }}>
        <div style={styles.headerTitleBox}>
          <h1 style={styles.bannerTitle}>SYSTEM // CONFIGURATION</h1>
          <div style={{ ...styles.neonDot, backgroundColor: colors.primary, boxShadow: `0 0 10px ${colors.primary}` }}></div>
        </div>
        <p style={styles.bannerSubtitle}>Ajustes avanzados de la plataforma Fastech y estado del núcleo del servidor.</p>
      </div>

      {/* Grid de Contenedores */}
      <div style={styles.gridContainer}>
        
        {/* Bloque 1: Estado del Sistema */}
        <div style={styles.panelBlock}>
          <h3 style={{ ...styles.panelTitle, color: colors.primary }}>⚙️ CORE_STATUS (NÚCLEO DEL SISTEMA)</h3>
          <div style={styles.statusItem}>
            <span style={styles.label}>BASE DE DATOS:</span>
            <div style={styles.statusBox}>
              <div style={styles.ledGreen}></div>
              <span style={styles.valueText}>MARIADB_LOCAL // ONLINE</span>
            </div>
          </div>
          <div style={styles.statusItem}>
            <span style={styles.label}>PUERTO DEL SERVIDOR:</span>
            <span style={{ ...styles.valueHighlight, color: colors.primary }}>LOCALHOST:5000</span>
          </div>
          <div style={styles.statusItem}>
            <span style={styles.label}>LATENCIA DE RESPUESTA:</span>
            <span style={styles.valueText}>14 ms (ESTABLE)</span>
          </div>
        </div>

        {/* Bloque 2: Preferencias de Interfaz */}
        <div style={styles.panelBlock}>
          <h3 style={{ ...styles.panelTitle, color: colors.primary }}>🎨 INTERFACE_THEME (IDENTIDAD VISUAL)</h3>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: '0 0 15px 0', fontFamily: 'sans-serif' }}>
            Selecciona el espectro de iluminación del panel central:
          </p>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input type="radio" name="theme" checked={theme === 'CYAN_NEON'} onChange={() => setTheme('CYAN_NEON')} style={{ ...styles.radioInput, accentColor: colors.primary }} />
              <span style={{ color: theme === 'CYAN_NEON' ? '#00f0ff' : '#ffffff' }}>CYAN_NEON (DEFAULT)</span>
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="theme" checked={theme === 'GREEN_MATRIX'} onChange={() => setTheme('GREEN_MATRIX')} style={{ ...styles.radioInput, accentColor: colors.primary }} />
              <span style={{ color: theme === 'GREEN_MATRIX' ? '#10b981' : '#ffffff' }}>GREEN_MATRIX</span>
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" name="theme" checked={theme === 'RED_ALERT'} onChange={() => setTheme('RED_ALERT')} style={{ ...styles.radioInput, accentColor: colors.primary }} />
              <span style={{ color: theme === 'RED_ALERT' ? '#ef4444' : '#ffffff' }}>RED_ALERT // OVERCLOCK</span>
            </label>
          </div>
        </div>

        {/* Bloque 3: Perfil del Administrador DINÁMICO Y EDITABLE */}
        <div style={styles.panelBlock}>
          <h3 style={{ ...styles.panelTitle, color: colors.primary }}>👤 ADMINISTRATOR_PROFILE // ACTIVE_SESSION</h3>
          
          <div style={styles.profileContainer}>
            <div style={{ ...styles.avatarWrapper, borderColor: colors.primary, boxShadow: `0 0 10px ${colors.glow}` }}>
              <img src="https://api.dicebear.com/7.x/bottts/svg?seed=fany&backgroundColor=0f172a" alt="Admin Avatar" style={styles.avatarImg} />
            </div>

            <div style={styles.profileData}>
              {isEditing ? (
                /* VISTA EN MODO EDICIÓN (MUESTRA INPUTS) */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={styles.inputLabel}>
                    USER_ID:
                    <input type="text" value={tempUserId} onChange={(e) => setTempUserId(e.target.value)} style={styles.textInput} />
                  </label>
                  <label style={styles.inputLabel}>
                    ALIAS:
                    <input type="text" value={tempAlias} onChange={(e) => setTempAlias(e.target.value)} style={styles.textInput} />
                  </label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <button onClick={handleSave} style={{ ...styles.actionButton, backgroundColor: '#10b981', color: '#ffffff' }}>Guardar</button>
                    <button onClick={handleCancel} style={{ ...styles.actionButton, backgroundColor: '#374151', color: '#ffffff' }}>Cancelar</button>
                  </div>
                </div>
              ) : (
                /* VISTA EN MODO NORMAL (MUESTRA TEXTO) */
                <div>
                  <p style={styles.profileLine}><span style={styles.profileLabel}>USER_ID:</span> <span style={{color: '#ffffff'}}>{userId}</span></p>
                  <p style={styles.profileLine}><span style={styles.profileLabel}>ALIAS:</span> <span style={{color: colors.primary, fontWeight: 'bold'}}>{alias}</span></p>
                  <p style={styles.profileLine}><span style={styles.profileLabel}>CLEARANCE:</span> <span style={styles.clearanceBadge}>LEVEL_5 // TOTAL_ACCESS</span></p>
                  <p style={styles.profileLine}><span style={styles.profileLabel}>SESSION:</span> <span style={styles.timerText}>{formatTime(seconds)}</span></p>
                  
                  {/* Botón para activar el modo edición */}
                  <button onClick={handleEdit} style={{ ...styles.editButton, color: colors.primary, borderColor: colors.primary }}>
                    📝 MODIFICAR_DATOS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Bloque 4: Terminal */}
      <div style={styles.panelBlockFull}>
        <h3 style={{ ...styles.panelTitle, color: colors.primary }}>💻 TERMINAL // LIVE_SYSTEM_LOGS</h3>
        <div style={styles.terminalConsole}>
          <p style={styles.logLine}><span style={styles.logTime}>[22:15:32]</span> INIT: Inicializando secuencia de arranque de módulos React...</p>
          <p style={styles.logLine}><span style={styles.logTime}>[22:15:34]</span> AUTH: Conexión establecida de forma segura en el puerto 3000.</p>
          <p style={styles.logLine}><span style={styles.logTime}>[22:16:01]</span> DATA: Sincronizando tabla 'productos' desde MariaDB con éxito.</p>
          {isEditing && <p style={{...styles.logLine, color: '#f59e0b'}}><span style={styles.logTime}>[{new Date().toLocaleTimeString()}]</span> WARN: El operador abrió el buffer de modificación de credenciales de perfil.</p>}
          <p style={styles.logSuccess}><span style={styles.logTime}>[22:30:00]</span> STATUS: Todo el sistema operativo Fastech se encuentra operativo y estable.</p>
          <div style={{ ...styles.terminalCursor, color: colors.primary }}>_</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '40px 30px', backgroundColor: '#0a0f1d', minHeight: '100vh', fontFamily: "'Courier New', Courier, monospace" },
  banner: { backgroundColor: '#111827', padding: '35px', borderRadius: '12px', marginBottom: '35px', border: '1px solid #1f293d', transition: 'all 0.3s ease' },
  headerTitleBox: { display: 'flex', alignItems: 'center', gap: '15px' },
  bannerTitle: { margin: 0, color: '#ffffff', fontSize: '26px', fontWeight: 'bold', letterSpacing: '2px' },
  neonDot: { width: '10px', height: '10px', borderRadius: '50%', transition: 'all 0.3s ease' },
  bannerSubtitle: { margin: '10px 0 0 0', color: '#9ca3af', fontSize: '14px', fontFamily: 'sans-serif' },
  
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '35px' },
  panelBlock: { backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' },
  panelBlockFull: { backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f293d' },
  panelTitle: { fontSize: '13px', letterSpacing: '1px', margin: '0 0 20px 0', fontWeight: 'bold', transition: 'all 0.3s ease' },
  
  statusItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1f293d' },
  label: { color: '#9ca3af', fontSize: '12px' },
  statusBox: { display: 'flex', alignItems: 'center', gap: '8px' },
  ledGreen: { width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' },
  valueText: { color: '#ffffff', fontSize: '12px', fontWeight: 'bold' },
  valueHighlight: { fontSize: '12px', fontWeight: 'bold', transition: 'all 0.3s ease' },
  
  radioGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  radioLabel: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  radioInput: { width: '16px', height: '16px', cursor: 'pointer', transition: 'all 0.3s ease' },
  
  profileContainer: { display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '5px' },
  avatarWrapper: { width: '80px', height: '80px', borderRadius: '10px', border: '2px solid', overflow: 'hidden', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', flexShrink: 0 },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  profileData: { display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' },
  profileLine: { margin: 0, fontSize: '12px', lineHeight: '1.4', marginBottom: '4px' },
  profileLabel: { color: '#6b7280', marginRight: '5px' },
  clearanceBadge: { color: '#10b981', fontWeight: 'bold' },
  timerText: { color: '#f59e0b', fontWeight: 'bold' },
  
  // Estilos de los Inputs de Edición
  inputLabel: { display: 'flex', flexDirection: 'column', gap: '4px', color: '#6b7280', fontSize: '11px', fontWeight: 'bold' },
  textInput: { backgroundColor: '#050a15', border: '1px solid #1f293d', color: '#ffffff', padding: '5px 8px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px', width: '90%', outline: 'none' },
  actionButton: { border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace' },
  
  editButton: { backgroundColor: 'transparent', border: '1px dashed', padding: '5px 10px', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace', cursor: 'pointer', marginTop: '10px', display: 'block', width: 'fit-content', transition: 'all 0.2s ease' },
  
  terminalConsole: { backgroundColor: '#050a15', padding: '20px', borderRadius: '8px', border: '1px solid #1f293d', minHeight: '160px' },
  logLine: { margin: '5px 0', color: '#a3a3a3', fontSize: '13px', lineHeight: '1.5' },
  logSuccess: { margin: '5px 0', color: '#10b981', fontSize: '13px', fontWeight: 'bold', lineHeight: '1.5' },
  logTime: { color: '#6b7280', marginRight: '6px' },
  terminalCursor: { display: 'inline-block', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.3s ease' }
};