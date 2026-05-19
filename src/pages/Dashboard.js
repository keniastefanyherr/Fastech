// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // CONTROL DE INTERFAZ (Modales y Vistas)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Para el Modal de Vista Rápida
  const [carrito, setCarrito] = useState([]); // Para almacenar los productos agregados
  const [vistaPago, setVistaPago] = useState(false); // Alternar entre tienda y formulario de pago
  
  // Campos del formulario de pago
  const [datosPago, setDatosPago] = useState({ nombre: '', tarjeta: '', expiracion: '', cvc: '' });

  // 1. LEER: Consultar productos de MariaDB
  useEffect(() => {
    fetch('http://localhost:5000/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al conectar con la base de datos:", err);
        setLoading(false);
      });
  }, []);

  // 2. AGREGAR AL CARRITO (Temporal en memoria local)
  const agregarAlCarrito = (prod) => {
    if (prod.stock <= 0) {
      alert("NODO BLOQUEADO: No hay stock disponible.");
      return;
    }
    
    // Verificar si ya está en el carrito para no duplicar filas, sino aumentar cantidad
    const existe = carrito.find(item => item.id === prod.id);
    if (existe) {
      if (existe.cantidad && existe.cantidad >= prod.stock) {
        alert("Límite alcanzado según el stock disponible en el núcleo.");
        return;
      }
      setCarrito(carrito.map(item => item.id === prod.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...prod, cantidad: 1 }]);
    }
    
    // Cerrar el modal automáticamente al agregar si así se prefiere
    setProductoSeleccionado(null);
  };

  // 3. PROCESAR COMPRA FINAL (CRUD: Actualizar Stock masivo en MariaDB)
  const finalizarCompra = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return;

    // Ejecutar las peticiones PUT para cada producto en el carrito
    const promesas = carrito.map(item => {
      const nuevoStock = item.stock - item.cantidad;
      return fetch(`http://localhost:5000/productos/${item.id}/stock`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: nuevoStock })
      });
    });

    Promise.all(promesas)
      .then(() => {
        alert("SISTEMA: Transacción autorizada. Inventario sincronizado.");
        
        // Actualizar el estado local de productos para reflejar los nuevos stocks
        setProductos(prevProductos => 
          prevProductos.map(prod => {
            const comprado = carrito.find(item => item.id === prod.id);
            return comprado ? { ...prod, stock: prod.stock - comprado.cantidad } : prod;
          })
        );

        // Limpiar estados y regresar al Home
        setCarrito([]);
        setVistaPago(false);
      })
      .catch(err => {
        console.error("Error al procesar el pago en el lote:", err);
        alert("Error crítico en la pasarela de pago.");
      });
  };

  // Calcular totales del carrito
  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (loading) {
    return <div style={styles.loading}>INICIALIZANDO SISTEMA DE HARDWARE...</div>;
  }

  // Clasificador inteligente de productos - TOTALMENTE CORREGIDO
  const clasificarProducto = (prod) => {
    const nombre = (prod.nombre || '').toLowerCase();
    const marca = (prod.marca || '').toLowerCase();
    
    // 1. SMARTPHONES: Agrupamos las marcas viejas y las nuevas (Motorola, Hotwav)
    if (
      nombre.includes('iphone') || nombre.includes('galaxy') || nombre.includes('celular') || 
      nombre.includes('redmi') || nombre.includes('honor') || nombre.includes('motorola') || 
      nombre.includes('hotwav') || nombre.includes('phone') || marca.includes('apple')
    ) {
      return 'Smartphones Premium';
    } 
    
    // 2. LAPTOPS & CÓMPUTO: Agregamos soporte para laptops Acer o HP Victus
    else if (
      nombre.includes('laptop') || nombre.includes('probook') || 
      nombre.includes('thinkpad') || nombre.includes('computadora') || nombre.includes('acer')
    ) {
      return 'Laptops & Cómputo';
    } 
    
    // 3. IMPRESIÓN & MODELADO 3D: Agregamos palabras clave para las nuevas impresoras Epson y DeskJet
    else if (
      nombre.includes('impresora') || nombre.includes('hp 583') || nombre.includes('artillery') || 
      nombre.includes('3d') || nombre.includes('epson') || nombre.includes('deskjet') || nombre.includes('ecotank')
    ) {
      return 'Impresión & Modelado 3D';
    } 
    
    // 4. COMPONENTES & ACCESORIOS: Aquí caerán limpios el cargador, audífonos y el teclado retro
    else {
      return 'Componentes & Accesorios';
    }
  };

  const secciones = { 'Smartphones Premium': [], 'Laptops & Cómputo': [], 'Impresión & Modelado 3D': [], 'Componentes & Accesorios': [] };
  productos.forEach(prod => { secciones[clasificarProducto(prod)].push(prod); });

  // ==========================================
  // RENDER 1: VISTA DE CHECKOUT / PASARELA DE PAGO
  // ==========================================
  if (vistaPago) {
    return (
      <div style={styles.container}>
        <header style={styles.banner}>
          <h1 style={styles.bannerTitle}>SECURE CHECKOUT // NODO_PAGO</h1>
          <p style={styles.bannerSubtitle}>Complete los parámetros de cifrado financiero para autorizar la adquisición.</p>
        </header>

        <div style={styles.checkoutLayout}>
          {/* Formulario */}
          <form onSubmit={finalizarCompra} style={styles.checkoutForm}>
            <h2 style={styles.panelTitle}>DATOS DE FACTURACIÓN</h2>
            
            <label style={styles.label}>NOMBRE COMPLETO DEL TITULAR</label>
            <input type="text" required style={styles.input} placeholder="Fany Stefany" value={datosPago.nombre} onChange={e => setDatosPago({...datosPago, nombre: e.target.value})} />

            <label style={styles.label}>NÚMERO DE CREDENCIAL FINANCIERA (TARJETA)</label>
            <input type="text" required maxLength="16" style={styles.input} placeholder="0000 0000 0000 0000" value={datosPago.tarjeta} onChange={e => setDatosPago({...datosPago, tarjeta: e.target.value})} />

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>EXPIRACIÓN</label>
                <input type="text" placeholder="MM/AA" required maxLength="5" style={styles.input} value={datosPago.expiracion} onChange={e => setDatosPago({...datosPago, expiracion: e.target.value})} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>CVC / CLAVE</label>
                <input type="password" placeholder="***" required maxLength="3" style={styles.input} value={datosPago.cvc} onChange={e => setDatosPago({...datosPago, cvc: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button type="submit" style={styles.buttonActive}>CONFIRMAR TRANSFERENCIA</button>
              <button type="button" onClick={() => setVistaPago(false)} style={styles.buttonCancel}>CANCELAR OPERACIÓN</button>
            </div>
          </form>

          {/* Resumen del pedido a la par */}
          <div style={styles.checkoutSummary}>
            <h2 style={styles.panelTitle}>RESUMEN DE ADQUISICIÓN</h2>
            {carrito.map(item => (
              <div key={item.id} style={styles.summaryItem}>
                <span>{item.nombre} (x{item.cantidad})</span>
                <span style={{ color: '#00f0ff' }}>${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <div style={styles.totalBlock}>
              <span>TOTAL NETO:</span>
              <span style={styles.priceValue}>${totalPrecio.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER 2: TIENDA PRINCIPAL + MODAL
  // ==========================================
  return (
    <div style={styles.container}>
      
      {/* HEADER CON NOTIFICADOR DE CARRITO */}
      <header style={styles.banner}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={styles.headerTitleBox}>
            <h1 style={styles.bannerTitle}>FASTECH // CORE_CENTER</h1>
            <div style={styles.neonDot}></div>
          </div>
          {carrito.length > 0 && (
            <button onClick={() => setVistaPago(true)} style={styles.cartStickyBtn}>
              🛒 PROCESAR ORDEN ({carrito.reduce((a, b) => a + b.cantidad, 0)}) // ${totalPrecio.toFixed(2)}
            </button>
          )}
        </div>
        <p style={styles.bannerSubtitle}>Distribución de hardware de vanguardia estruturado en tiempo real.</p>
      </header>

      {/* RENDERIZADO DE LAS GRILLAS DE PRODUCTOS */}
      {Object.keys(secciones).map((tituloSeccion) => {
        if (secciones[tituloSeccion].length === 0) return null;

        return (
          <section key={tituloSeccion} style={styles.sectionBlock}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionIcon}>⚡</span>
              <h2 style={styles.sectionTitle}>{tituloSeccion}</h2>
              <div style={styles.sectionLine}></div>
            </div>

            <div style={styles.grid}>
              {secciones[tituloSeccion].map((prod) => (
                <div key={prod.id} style={styles.card}>
                  
                  {/* Clic en la foto abre el panel de detalles */}
                  <div style={styles.imageWrapper} onClick={() => setProductoSeleccionado(prod)}>
                    <img 
                      src={`/Imagenes/${prod.imagen || 'default.jpg'}`} 
                      alt={prod.nombre} 
                      style={styles.image}
                      onError={(e) => { e.target.onerror = null; e.target.src = `/imagenes/${prod.imagen || 'default.jpg'}`; }}
                    />
                    {prod.stock <= 5 && prod.stock > 0 && <span style={styles.badgeCritical}>STOCK_LIMITADO</span>}
                  </div>

                  <div style={styles.infoWrapper}>
                    <span style={styles.brand}>{prod.marca ? prod.marca.toUpperCase() : 'FASTECH LAB'}</span>
                    {/* Clic en el título abre el panel de detalles */}
                    <h3 style={styles.productName} onClick={() => setProductoSeleccionado(prod)}>
                      {prod.nombre}
                    </h3>
                    
                    <div style={styles.footerRow}>
                      <div style={styles.priceContainer}>
                        <span style={styles.priceValue}>${parseFloat(prod.precio || 0).toFixed(2)}</span>
                      </div>
                      <span style={prod.stock > 0 ? styles.stockAvailable : styles.stockOut}>
                        {prod.stock > 0 ? `${prod.stock} UDS` : 'OUT_OF_ORDER'}
                      </span>
                    </div>

                    <button 
                      onClick={() => setProductoSeleccionado(prod)}
                      style={prod.stock > 0 ? styles.buttonActive : styles.buttonDisabled} 
                      disabled={prod.stock === 0}
                    >
                      {prod.stock > 0 ? 'VER DETALLES // ADQUIRIR' : 'NODO BLOQUEADO'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* ==========================================
          MODAL INTERACTIVO: VISTA ESTILO CYBERPUNK
          ========================================== */}
      {productoSeleccionado && (
        <div style={styles.modalOverlay} onClick={() => setProductoSeleccionado(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            {/* Botón de cerrar tipo X */}
            <button style={styles.closeModalBtn} onClick={() => setProductoSeleccionado(null)}>✕</button>
            
            <div style={styles.modalLayout}>
              {/* Lado Izquierdo: Contenedor Blanco Limpio de la Imagen */}
              <div style={styles.modalImageSide}>
                <img 
                  src={`/Imagenes/${productoSeleccionado.imagen || 'default.jpg'}`} 
                  alt={productoSeleccionado.nombre}
                  style={styles.modalImage}
                  onError={(e) => { e.target.onerror = null; e.target.src = `/imagenes/${productoSeleccionado.imagen || 'default.jpg'}`; }}
                />
              </div>

              {/* Lado Derecho: Contenedor Informativo Ordenado en Bloques */}
              <div style={styles.modalInfoSide}>
                <span style={styles.brand}>{productoSeleccionado.marca ? productoSeleccionado.marca.toUpperCase() : 'FASTECH'}</span>
                <h2 style={styles.modalTitle}>{productoSeleccionado.nombre}</h2>
                
                <div style={styles.modalPriceBlock}>
                  <span style={styles.priceLabel}>VALOR ONLINE DE CONTADO:</span>
                  <span style={styles.modalPriceValue}>${parseFloat(productoSeleccionado.precio || 0).toFixed(2)}</span>
                </div>

                <div style={styles.modalDescBlock}>
                  <h4 style={styles.blockSubTitle}>DESCRIPCIÓN DEL SISTEMA</h4>
                  <p style={styles.modalDescText}>{productoSeleccionado.introduccion || 'Sin descripción detallada registrada.'}</p>
                </div>

                <div style={styles.modalSpecsBlock}>
                  <h4 style={styles.blockSubTitle}>FICHA TÉCNICA // ESPECIFICACIONES</h4>
                  <div style={styles.specsBox}>
                    {productoSeleccionado.caracteristicas ? productoSeleccionado.caracteristicas.split('|').map((spec, index) => (
                      <span key={index} style={styles.specTag}>{spec.trim()}</span>
                    )) : <span style={styles.specTag}>Fastech Verified</span>}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                  <button 
                    onClick={() => agregarAlCarrito(productoSeleccionado)}
                    style={productoSeleccionado.stock > 0 ? styles.buttonActive : styles.buttonDisabled}
                    disabled={productoSeleccionado.stock === 0}
                  >
                    {productoSeleccionado.stock > 0 ? '🛒 AGREGAR AL CARRITO' : 'NODO SIN UNIDADES'}
                  </button>
                  <button onClick={() => setProductoSeleccionado(null)} style={styles.buttonSecondary}>
                    SEGUIR VIENDO PRODUCTOS
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// ESTILOS DE LA INTERFAZ COMPLETA
const styles = {
  container: { padding: '40px 30px', backgroundColor: '#0a0f1d', minHeight: '100vh', fontFamily: "'Courier New', Courier, monospace" },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', fontSize: '16px', letterSpacing: '4px', color: '#00f0ff', fontWeight: 'bold' },
  banner: { backgroundColor: '#111827', padding: '35px', borderRadius: '12px', boxShadow: '0 0 25px rgba(0, 240, 255, 0.12)', marginBottom: '45px', border: '1px solid #1f293d', borderLeft: '5px solid #00f0ff' },
  headerTitleBox: { display: 'flex', alignItems: 'center', gap: '15px' },
  bannerTitle: { margin: 0, color: '#ffffff', fontSize: '26px', fontWeight: 'bold', letterSpacing: '2px' },
  neonDot: { width: '10px', height: '10px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 10px #00f0ff' },
  bannerSubtitle: { margin: '10px 0 0 0', color: '#9ca3af', fontSize: '14px', fontFamily: 'sans-serif' },
  cartStickyBtn: { backgroundColor: '#00f0ff', color: '#0a0f1d', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace', boxShadow: '0 0 15px #00f0ff' },
  
  sectionBlock: { marginBottom: '50px' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' },
  sectionIcon: { fontSize: '20px', color: '#00f0ff' },
  sectionTitle: { margin: 0, color: '#ffffff', fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px' },
  sectionLine: { height: '1px', backgroundColor: 'rgba(0, 240, 255, 0.15)', width: '100%' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  
  card: { backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #1f293d', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  imageWrapper: { backgroundColor: '#ffffff', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', position: 'relative', cursor: 'pointer' },
  image: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
  badgeCritical: { position: 'absolute', top: '12px', left: '12px', backgroundColor: '#ff0055', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' },
  
  infoWrapper: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  brand: { fontSize: '10px', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1.5px', marginBottom: '6px', display: 'block' },
  productName: { margin: '0 0 12px 0', fontSize: '16px', color: '#ffffff', fontWeight: 'bold', fontFamily: 'sans-serif', cursor: 'pointer' },
  footerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  priceContainer: { display: 'flex', flexDirection: 'column' },
  priceValue: { fontSize: '20px', color: '#00f0ff', fontWeight: 'bold' },
  stockAvailable: { fontSize: '11px', color: '#10b981', fontWeight: 'bold' },
  stockOut: { fontSize: '11px', color: '#ef4444', fontWeight: 'bold' },
  
  // BOTONES
  buttonActive: { backgroundColor: 'transparent', color: '#00f0ff', border: '1px solid #00f0ff', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', width: '100%', textTransform: 'uppercase' },
  buttonDisabled: { backgroundColor: 'rgba(31, 41, 55, 0.4)', color: '#4b5563', border: '1px solid #374151', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', width: '100%', cursor: 'not-allowed' },
  buttonSecondary: { backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #374151', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', width: '100%', marginTop: '10px', textTransform: 'uppercase' },
  buttonCancel: { backgroundColor: 'transparent', color: '#ff0055', border: '1px solid #ff0055', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', width: '100%' },

  // MODAL OVERLAY & CONTENT
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 7, 13, 0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { backgroundColor: '#111827', width: '100%', maxWidth: '850px', borderRadius: '16px', border: '1px solid #1f293d', padding: '30px', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' },
  closeModalBtn: { position: 'absolute', top: '20px', right: '20px', backgroundColor: 'transparent', color: '#9ca3af', border: 'none', fontSize: '22px', cursor: 'pointer' },
  modalLayout: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px' },
  
  modalImageSide: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '380px' },
  modalImage: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
  
  modalInfoSide: { display: 'flex', flexDirection: 'column' },
  modalTitle: { margin: '5px 0 15px 0', color: '#ffffff', fontSize: '22px', fontWeight: 'bold', fontFamily: 'sans-serif' },
  
  modalPriceBlock: { backgroundColor: '#1f293d', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '3px solid #00f0ff' },
  priceLabel: { fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' },
  modalPriceValue: { fontSize: '26px', color: '#00f0ff', fontWeight: 'bold' },
  
  modalDescBlock: { marginBottom: '20px' },
  blockSubTitle: { margin: '0 0 8px 0', color: '#6b7280', fontSize: '11px', letterSpacing: '1px' },
  modalDescText: { color: '#d1d5db', fontSize: '13px', fontFamily: 'sans-serif', margin: 0, lineHeight: '1.5' },
  
  modalSpecsBlock: { marginBottom: '25px' },
  specsBox: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  specTag: { backgroundColor: '#1f293d', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.15)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'sans-serif' },

  // INTERFAZ DE PAGO (CHECKOUT LAYOUT)
  checkoutLayout: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px', marginTop: '20px' },
  checkoutForm: { backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f293d' },
  panelTitle: { color: '#ffffff', fontSize: '16px', letterSpacing: '1px', margin: '0 0 20px 0', borderBottom: '1px solid #1f293d', paddingBottom: '10px' },
  label: { color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '8px', marginTop: '15px' },
  input: { backgroundColor: '#0a0f1d', border: '1px solid #1f293d', color: '#ffffff', padding: '12px', borderRadius: '6px', width: '100%', fontFamily: 'monospace', boxSizing: 'border-box' },
  checkoutSummary: { backgroundColor: '#1f293d', padding: '25px', borderRadius: '12px', border: '1px solid #374151', display: 'flex', flexDirection: 'column' },
  summaryItem: { display: 'flex', justifyContent: 'space-between', color: '#d1d5db', fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '10px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  totalBlock: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '15px', borderTop: '2px solid #00f0ff' }
};

export default Dashboard;