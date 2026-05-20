/* eslint-disable */
// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
// Importamos los componentes de la librería de gráficas
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from 'recharts';

const Dashboard = ({ esAdmin }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // CONTROL DE INTERFAZ (Modales y Vistas)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); 
  const [carrito, setCarrito] = useState([]); 
  const [vistaPago, setVistaPago] = useState(false); 
  
  // CONTROL DEL PANEL DE ÉXITO
  const [compraExitosa, setCompraExitosa] = useState(false);
  const [ticketId, setTicketId] = useState('');
  
  // Campos del formulario de pago
  const [datosPago, setDatosPago] = useState({ nombre: '', tarjeta: '', expiracion: '', cvc: '' });

  // DATOS SIMULADOS PARA LAS GRÁFICAS DE VENTAS (Métricas del Núcleo)
  const datosVentasMensuales = [
    { mes: 'Ene', ventas: 2400, ordenes: 12 },
    { mes: 'Feb', ventas: 1398, ordenes: 8 },
    { mes: 'Mar', ventas: 9800, ordenes: 25 },
    { mes: 'Abr', ventas: 3908, ordenes: 14 },
    { mes: 'May', ventas: 4800, ordenes: 18 },
    { mes: 'Jun', ventas: 7800, ordenes: 22 },
  ];

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

  // 2. AGREGAR AL CARRITO / INCREMENTAR CANTIDAD
  const agregarAlCarrito = (prod) => {
    if (prod.stock <= 0) {
      alert("NODO BLOQUEADO: No hay stock disponible.");
      return;
    }
    
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
    setProductoSeleccionado(null);
  };

  const disminuirCantidad = (id) => {
    const itemTarget = carrito.find(item => item.id === id);
    if (itemTarget.cantidad === 1) {
      eliminarDelCarrito(id);
    } else {
      setCarrito(carrito.map(item => item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item));
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  // 3. PROCESAR COMPRA FINAL
  const finalizarCompra = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return;

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
        const idAleatorio = 'TX-' + Math.floor(100000 + Math.random() * 900000);
        setTicketId(idAleatorio);

        setProductos(prevProductos => 
          prevProductos.map(prod => {
            const comprado = carrito.find(item => item.id === prod.id);
            return comprado ? { ...prod, stock: prod.stock - comprado.cantidad } : prod;
          })
        );

        setCarrito([]);
        setVistaPago(false);
        setDatosPago({ nombre: '', tarjeta: '', expiracion: '', cvc: '' });
        setCompraExitosa(true);
      })
      .catch(err => {
        console.error("Error al procesar el pago en el lote:", err);
        alert("Error crítico en la pasarela de pago.");
      });
  };

  const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (loading) {
    return <div style={styles.loading}>INICIALIZANDO SISTEMA DE HARDWARE...</div>;
  }

  // Clasificador inteligente de productos
  const clasificarProducto = (prod) => {
    const nombre = (prod.nombre || '').toLowerCase();
    const marca = (prod.marca || '').toLowerCase();
    
    if (
      nombre.includes('iphone') || nombre.includes('galaxy') || nombre.includes('celular') || 
      nombre.includes('redmi') || nombre.includes('honor') || nombre.includes('motorola') || 
      nombre.includes('hotwav') || nombre.includes('phone') || marca.includes('apple')
    ) {
      return 'Smartphones Premium';
    } 
    else if (
      nombre.includes('laptop') || nombre.includes('probook') || 
      nombre.includes('thinkpad') || nombre.includes('computadora') || nombre.includes('acer')
    ) {
      return 'Laptops & Cómputo';
    } 
    else if (
      nombre.includes('impresora') || nombre.includes('hp') || 
      nombre.includes('3d') || nombre.includes('epson') || 
      nombre.includes('deskjet') || nombre.includes('ecotank')
    ) {
      return 'Impresión & Modelado 3D';
    } 
    else {
      return 'Componentes & Accesorios';
    }
  };

  const secciones = { 'Smartphones Premium': [], 'Laptops & Cómputo': [], 'Impresión & Modelado 3D': [], 'Componentes & Accesorios': [] };
  productos.forEach(prod => { 
    const categoria = clasificarProducto(prod);
    if (secciones[categoria]) {
      secciones[categoria].push(prod); 
    } else {
      secciones['Componentes & Accesorios'].push(prod);
    }
  });

  // Datos dinámicos para la gráfica de barras basados en tu inventario real de MariaDB
  const datosDistribuciónStock = Object.keys(secciones).map(cat => ({
    categoria: cat.split(' ')[0], // Nombre corto para la gráfica
    unidades: secciones[cat].reduce((acc, p) => acc + (p.stock || 0), 0)
  }));


  // ==========================================
  // RENDER 1: VISTA DE CHECKOUT / PASARELA DE PAGO
  // ==========================================
  if (vistaPago && !esAdmin) {
    return (
      <div style={styles.container}>
        {/* Contenido del Checkout previo idéntico... */}
        <header style={styles.banner}>
          <h1 style={styles.bannerTitle}>SECURE CHECKOUT // NODO_PAGO</h1>
          <p style={styles.bannerSubtitle}>Complete los parámetros de cifrado financiero para autorizar la adquisición.</p>
        </header>

        <div style={styles.checkoutLayout}>
          <form onSubmit={finalizarCompra} style={styles.checkoutForm}>
            <h2 style={styles.panelTitle}>DATOS DE FACTURACIÓN</h2>
            
            <label style={styles.label}>NOMBRE COMPLETO DEL TITULAR</label>
            <input type="text" required style={styles.input} placeholder="Ej. Fany..." value={datosPago.nombre} onChange={e => setDatosPago({...datosPago, nombre: e.target.value})} />

            <label style={styles.label}>NÚMERO DE CREDENCIAL FINANCIERA (TARJETA)</label>
            <input type="text" required maxLength="16" style={styles.input} placeholder="0000 0000 0000 0000" value={datosPago.tarjeta} onChange={e => setDatosPago({...datosPago, tarjeta: e.target.value})} />

            <div style={{ display: 'table', width: '100%', tableLayout: 'fixed', marginTop: '15px' }}>
              <div style={{ display: 'table-cell', paddingRight: '10px' }}>
                <label style={styles.label}>EXPIRACIÓN</label>
                <input type="text" placeholder="MM/AA" required maxLength="5" style={styles.input} value={datosPago.expiracion} onChange={e => setDatosPago({...datosPago, expiracion: e.target.value})} />
              </div>
              <div style={{ display: 'table-cell', paddingLeft: '10px' }}>
                <label style={styles.label}>CVC / CLAVE</label>
                <input type="password" placeholder="***" required maxLength="3" style={styles.input} value={datosPago.cvc} onChange={e => setDatosPago({...datosPago, cvc: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'table', width: '100%', marginTop: '30px' }}>
              <div style={{ display: 'table-cell', paddingRight: '10px' }}>
                <button type="submit" style={styles.buttonActive}>CONFIRMAR TRANSFERENCIA</button>
              </div>
              <div style={{ display: 'table-cell', paddingLeft: '10px' }}>
                <button type="button" onClick={() => setVistaPago(false)} style={styles.buttonCancel}>CANCELAR OPERACIÓN</button>
              </div>
            </div>
          </form>

          <div style={styles.checkoutSummary}>
            <h2 style={styles.panelTitle}>RESUMEN DE ADQUISICIÓN</h2>
            <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '340px', marginBottom: '15px', paddingRight: '5px' }}>
              {carrito.map(item => (
                <div key={item.id} style={styles.productCartCard}>
                  <div style={styles.cartCardImageWrapper}>
                    <img 
                      src={`/Imagenes/${item.imagen || 'default.jpg'}`} 
                      alt={item.nombre} 
                      style={styles.cartCardImage}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/imagenes/${item.imagen || 'default.jpg'}`; }}
                    />
                  </div>
                  <div style={styles.cartCardInfo}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={styles.cartCardTitle}>{item.nombre}</h4>
                      <button type="button" onClick={() => eliminarDelCarrito(item.id)} style={styles.cartCardDeleteBtn}>🗑️</button>
                    </div>
                    <div style={styles.cartCardFooter}>
                      <div style={styles.quantitySelector}>
                        <button type="button" onClick={() => disminuirCantidad(item.id)} style={styles.qtyBtn}>-</button>
                        <span style={styles.qtyValue}>{item.cantidad}</span>
                        <button type="button" onClick={() => agregarAlCarrito(item)} style={styles.qtyBtn}>+</button>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={styles.cartCardPrice}>${(item.precio * item.cantidad).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.totalBlock}>
              <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 'bold' }}>TOTAL NETO:</span>
              <span style={styles.priceValue}>${totalPrecio.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER 2: TIENDA PRINCIPAL + MODAL + GRÁFICAS ADMIN
  // ==========================================
  return (
    <div style={styles.container}>
      
      <header style={styles.banner}>
        <div style={{ display: 'table', width: '100%' }}>
          <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'left' }}>
            <div style={styles.headerTitleBox}>
              <h1 style={styles.bannerTitle}>FASTECH // CORE_CENTER</h1>
              <div style={styles.neonDot}></div>
            </div>
          </div>
          
          <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'right' }}>
            {esAdmin ? (
              <span style={styles.adminBadge}>MODO ADMINISTRADOR</span>
            ) : (
              carrito.length > 0 && (
                <button onClick={() => setVistaPago(true)} style={styles.cartStickyBtn}>
                  🛒 PROCESAR ORDEN ({carrito.reduce((a, b) => a + b.cantidad, 0)}) // ${totalPrecio.toFixed(2)}
                </button>
              )
            )}
          </div>
        </div>
        <p style={styles.bannerSubtitle}>Distribución de hardware de vanguardia estructurado en tiempo real.</p>
      </header>

      {/* ==========================================
          ⚡ NUEVA SECCIÓN DE GRÁFICAS (SÓLO ADMÍN) 
         ========================================== */}
      {esAdmin && (
        <section style={{ marginBottom: '50px' }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>📈</span>
            <h2 style={styles.sectionTitle}>SISTEMA DE ANALÍTICAS GLOBAL // CORE_METRICS</h2>
            <div style={styles.sectionLine}></div>
          </div>

          <div style={styles.chartsFlexContainer}>
            {/* Gráfica 1: Área de Ventas */}
            <div style={styles.chartCard}>
              <h3 style={styles.chartCardTitle}>RENDIMIENTO DE VENTAS BRUTAS ($ USD)</h3>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <AreaChart data={datosVentasMensuales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                    <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#00f0ff', color: '#fff', fontFamily: 'monospace' }} />
                    <Area type="monotone" dataKey="ventas" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorVentas)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfica 2: Barras de Stock */}
            <div style={styles.chartCard}>
              <h3 style={styles.chartCardTitle}>DISTRIBUCIÓN DE STOCK EN MARIADB (UNIDADES)</h3>
              <div style={{ width: '100%', height: 220 }}>
                <ResponsiveContainer>
                  <BarChart data={datosDistribuciónStock} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                    <XAxis dataKey="categoria" stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '11px' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#f000ff', color: '#fff', fontFamily: 'monospace' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                    <Bar dataKey="unidades" name="Disponibles" fill="#f000ff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Renderizado de Secciones de la Tienda */}
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
                  <div style={styles.imageWrapper} onClick={() => setProductoSeleccionado(prod)}>
                    <img 
                      src={`/Imagenes/${prod.imagen || 'default.jpg'}`} 
                      alt={prod.nombre} 
                      style={styles.image}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/imagenes/${prod.imagen || 'default.jpg'}`; }}
                    />
                    {prod.stock <= 5 && prod.stock > 0 && <span style={styles.badgeCritical}>STOCK_LIMITADO</span>}
                  </div>

                  <div style={styles.infoWrapper}>
                    <span style={styles.brand}>{prod.marca ? prod.marca.toUpperCase() : 'FASTECH LAB'}</span>
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
                      style={prod.stock > 0 || esAdmin ? styles.buttonActive : styles.buttonDisabled} 
                      disabled={prod.stock === 0 && !esAdmin}
                    >
                      {esAdmin ? 'VER DETALLES DEL NODO' : prod.stock > 0 ? 'VER DETALLES // ADQUIRIR' : 'NODO BLOQUEADO'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* MODAL DETALLES PRODUCTO */}
      {productoSeleccionado && (
        <div style={styles.modalOverlay} onClick={() => setProductoSeleccionado(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeModalBtn} onClick={() => setProductoSeleccionado(null)}>✕</button>
            <div style={styles.modalLayout}>
              <div style={styles.modalImageSide}>
                <img 
                  src={`/Imagenes/${productoSeleccionado.imagen || 'default.jpg'}`} 
                  alt={productoSeleccionado.nombre}
                  style={styles.modalImage}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `/imagenes/${productoSeleccionado.imagen || 'default.jpg'}`; }}
                />
              </div>

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
                  {esAdmin ? (
                    <button onClick={() => setProductoSeleccionado(null)} style={styles.buttonActive}>
                      CERRAR VISTA DE CONTROL
                    </button>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL COMPRA EXITOSA */}
      {compraExitosa && !esAdmin && (
        <div style={styles.overlayExito}>
          <div style={styles.cardExito}>
            <div style={styles.ledCheck}>✓</div>
            <h2 style={styles.tituloExito}>¡COMPRA PROCESADA CON ÉXITO!</h2>
            <p style={styles.subtituloExito}>El hardware ha sido asignado y el inventario en MariaDB se actualizó correctamente.</p>
            <div style={styles.ticketBox}>
              <span style={styles.ticketLabel}>COMPROBANTE DIGITAL DE OPERACIÓN</span>
              <div style={styles.ticketLine}><strong>NODO_EMISOR:</strong> FASTECH_CORE_CENTER</div>
              <div style={styles.ticketLine}><strong>ID_TRANSACCIÓN:</strong> <span style={{color: '#00f0ff'}}>{ticketId}</span></div>
              <div style={styles.ticketLine}><strong>ESTADO:</strong> APPROVED // 200_OK</div>
            </div>
            <button onClick={() => setCompraExitosa(false)} style={styles.btnEntendido}>REGRESAR AL CATÁLOGO</button>
          </div>
        </div>
      )}

    </div>
  );
};

// ESTILOS DE LA INTERFAZ
const styles = {
  container: { padding: '40px 30px', backgroundColor: '#0a0f1d', minHeight: '100vh', fontFamily: "'Courier New', Courier, monospace", boxSizing: 'border-box' },
  loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', fontSize: '16px', letterSpacing: '4px', color: '#00f0ff', fontWeight: 'bold' },
  banner: { backgroundColor: '#111827', padding: '35px', borderRadius: '12px', boxShadow: '0 0 25px rgba(0, 240, 255, 0.12)', marginBottom: '45px', border: '1px solid #1f293d', borderLeft: '5px solid #00f0ff' },
  headerTitleBox: { display: 'block', textAlign: 'left' },
  bannerTitle: { margin: 0, color: '#ffffff', fontSize: '26px', fontWeight: 'bold', letterSpacing: '2px', display: 'inline-block', verticalAlign: 'middle' },
  neonDot: { width: '10px', height: '10px', backgroundColor: '#00f0ff', borderRadius: '50%', boxShadow: '0 0 10px #00f0ff', display: 'inline-block', verticalAlign: 'middle', marginLeft: '15px' },
  bannerSubtitle: { margin: '10px 0 0 0', color: '#9ca3af', fontSize: '14px', fontFamily: 'sans-serif' },
  cartStickyBtn: { backgroundColor: '#00f0ff', color: '#0a0f1d', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'monospace', boxShadow: '0 0 15px #00f0ff' },
  adminBadge: { backgroundColor: 'rgba(240, 0, 255, 0.1)', color: '#f000ff', border: '1px solid #f000ff', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px', boxShadow: '0 0 10px rgba(240, 0, 255, 0.2)' },
  
  sectionBlock: { marginBottom: '50px' },
  sectionHeader: { display: 'table', width: '100%', marginBottom: '25px' },
  sectionIcon: { display: 'table-cell', width: '30px', fontSize: '20px', color: '#00f0ff', verticalAlign: 'middle' },
  sectionTitle: { display: 'table-cell', width: 'auto', margin: 0, color: '#ffffff', fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', verticalAlign: 'middle', whiteSpace: 'nowrap', paddingRight: '15px' },
  sectionLine: { display: 'table-cell', height: '1px', backgroundColor: 'rgba(0, 240, 255, 0.15)', width: '100%', verticalAlign: 'middle' },
  grid: { display: 'block', textAlign: 'center' },
  
  card: { display: 'inline-block', width: '280px', margin: '12px', backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #1f293d', textAlign: 'left', verticalAlign: 'top', overflow: 'hidden' },
  imageWrapper: { backgroundColor: '#ffffff', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', position: 'relative', cursor: 'pointer' },
  image: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
  badgeCritical: { position: 'absolute', top: '12px', left: '12px', backgroundColor: '#ff0055', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' },
  
  infoWrapper: { padding: '20px', display: 'block' },
  brand: { fontSize: '10px', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1.5px', marginBottom: '6px', display: 'block' },
  productName: { margin: '0 0 12px 0', fontSize: '16px', color: '#ffffff', fontWeight: 'bold', fontFamily: 'sans-serif', cursor: 'pointer', height: '40px', overflow: 'hidden' },
  footerRow: { display: 'table', width: '100%', marginBottom: '15px' },
  priceContainer: { display: 'table-cell', textAlign: 'left', verticalAlign: 'middle' },
  priceValue: { fontSize: '20px', color: '#00f0ff', fontWeight: 'bold' },
  stockAvailable: { display: 'table-cell', textAlign: 'right', verticalAlign: 'middle', fontSize: '11px', color: '#10b981', fontWeight: 'bold' },
  stockOut: { display: 'table-cell', textAlign: 'right', verticalAlign: 'middle', fontSize: '11px', color: '#ef4444', fontWeight: 'bold' },
  
  buttonActive: { backgroundColor: 'transparent', color: '#00f0ff', border: '1px solid #00f0ff', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', width: '100%', textTransform: 'uppercase', letterSpacing: '1px' },
  buttonDisabled: { backgroundColor: 'rgba(31, 41, 55, 0.4)', color: '#4b5563', border: '1px solid #374151', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', width: '100%', cursor: 'not-allowed' },
  buttonSecondary: { backgroundColor: 'transparent', color: '#9ca3af', border: '1px solid #374151', padding: '10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', width: '100%', marginTop: '10px', textTransform: 'uppercase' },
  buttonCancel: { backgroundColor: 'transparent', color: '#ff0055', border: '1px solid #ff0055', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', width: '100%' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 7, 13, 0.85)', display: 'block', textAlign: 'center', zIndex: 1000, padding: '40px 20px', overflowY: 'auto' },
  modalContent: { display: 'inline-block', backgroundColor: '#111827', width: '100%', maxWidth: '850px', borderRadius: '16px', border: '1px solid #1f293d', padding: '30px', position: 'relative', textAlign: 'left', boxShadow: '0 20px 50px rgba(0,0,0,0.7)', verticalAlign: 'middle' },
  closeModalBtn: { position: 'absolute', top: '20px', right: '20px', backgroundColor: 'transparent', color: '#9ca3af', border: 'none', fontSize: '22px', cursor: 'pointer', zIndex: 10 },
  modalLayout: { display: 'table', width: '100%', tableLayout: 'fixed' },
  
  modalImageSide: { display: 'table-cell', width: '45%', backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', verticalAlign: 'middle', height: '380px', textAlign: 'center' },
  modalImage: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
  
  modalInfoSide: { display: 'table-cell', width: '55%', paddingLeft: '30px', verticalAlign: 'top' },
  modalTitle: { margin: '5px 0 15px 0', color: '#ffffff', fontSize: '22px', fontWeight: 'bold', fontFamily: 'sans-serif' },
  
  modalPriceBlock: { backgroundColor: '#1f293d', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '3px solid #00f0ff' },
  priceLabel: { fontSize: '11px', color: '#9ca3af', display: 'block', marginBottom: '4px' },
  modalPriceValue: { fontSize: '26px', color: '#00f0ff', fontWeight: 'bold' },
  
  modalDescBlock: { marginBottom: '20px' },
  blockSubTitle: { margin: '0 0 8px 0', color: '#6b7280', fontSize: '11px', letterSpacing: '1px' },
  modalDescText: { color: '#d1d5db', fontSize: '13px', fontFamily: 'sans-serif', margin: 0, lineHeight: '1.5' },
  
  modalSpecsBlock: { marginBottom: '25px' },
  specsBox: { display: 'block' },
  specTag: { display: 'inline-block', backgroundColor: '#1f293d', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.15)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'sans-serif', margin: '3px' },

  checkoutLayout: { display: 'flex', gap: '30px', width: '100%', marginTop: '20px', alignItems: 'flex-start' },
  checkoutForm: { flex: '1 1 55%', backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f293d' },
  panelTitle: { color: '#ffffff', fontSize: '16px', letterSpacing: '1px', margin: '0 0 20px 0', borderBottom: '1px solid #1f293d', paddingBottom: '10px' },
  label: { color: '#9ca3af', fontSize: '11px', display: 'block', marginBottom: '8px', marginTop: '15px' },
  input: { backgroundColor: '#0a0f1d', border: '1px solid #1f293d', color: '#ffffff', padding: '12px', borderRadius: '6px', width: '100%', fontFamily: 'monospace', boxSizing: 'border-box', outline: 'none' },
  
  checkoutSummary: { flex: '1 1 45%', backgroundColor: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #1f293d', minWidth: '320px' },
  productCartCard: { display: 'flex', backgroundColor: '#1f293d', padding: '12px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #2d3748', gap: '12px', alignItems: 'center' },
  cartCardImageWrapper: { width: '65px', height: '65px', backgroundColor: '#ffffff', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px', flexShrink: 0 },
  cartCardImage: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  cartCardInfo: { flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  cartCardTitle: { margin: 0, color: '#ffffff', fontSize: '13px', fontWeight: 'bold', fontFamily: 'sans-serif', lineHeight: '1.3', paddingRight: '5px' },
  cartCardDeleteBtn: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', padding: 0, opacity: 0.7 },
  cartCardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  quantitySelector: { display: 'flex', alignItems: 'center', backgroundColor: '#0a0f1d', borderRadius: '4px', border: '1px solid #374151', overflow: 'hidden' },
  qtyBtn: { backgroundColor: 'transparent', border: 'none', color: '#00f0ff', padding: '2px 10px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'monospace' },
  qtyValue: { color: '#ffffff', fontSize: '12px', padding: '0 4px', minWidth: '16px', textAlign: 'center', fontWeight: 'bold' },
  cartCardPrice: { color: '#00f0ff', fontSize: '15px', fontWeight: 'bold' },
  totalBlock: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '2px dashed #00f0ff' },

  overlayExito: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 9, 20, 0.95)', display: 'block', textAlign: 'center', zIndex: 2000, overflowY: 'auto', padding: '40px 20px' },
  cardExito: { display: 'inline-block', backgroundColor: '#0b1120', border: '2px solid #10b981', boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)', padding: '40px', borderRadius: '12px', textAlign: 'center', width: '100%', maxWidth: '450px', verticalAlign: 'middle', marginTop: '10vh' },
  ledCheck: { width: '60px', height: '60px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '50%', color: '#10b981', fontSize: '32px', display: 'block', lineHeight: '56px', margin: '0 auto 20px auto', boxShadow: '0 0 15px #10b981' },
  tituloExito: { color: '#ffffff', fontSize: '18px', letterSpacing: '2px', margin: '0 0 10px 0', fontWeight: 'bold' },
  subtituloExito: { color: '#9ca3af', fontSize: '13px', fontFamily: 'sans-serif', lineHeight: '1.5', margin: '0 0 25px 0' },
  ticketBox: { backgroundColor: '#0a0f1d', border: '1px dashed #1f293d', padding: '15px', borderRadius: '8px', textAlign: 'left', marginBottom: '25px' },
  ticketLabel: { display: 'block', fontSize: '10px', color: '#6b7280', letterSpacing: '1px', marginBottom: '10px', fontWeight: 'bold' },
  ticketLine: { fontSize: '12px', color: '#eaeaea', marginBottom: '6px', letterSpacing: '0.5px' },
  btnEntendido: { backgroundColor: '#10b981', color: '#0a0f1d', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', width: '100%' },

  /* ESTILOS NUEVOS DE CONTENEDORES PARA LAS GRÁFICAS */
  chartsFlexContainer: { display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%', boxSizing: 'border-box' },
  chartCard: { flex: '1 1 calc(50% - 10px)', minWidth: '300px', backgroundColor: '#111827', border: '1px solid #1f293d', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', boxSizing: 'border-box' },
  chartCardTitle: { color: '#9ca3af', fontSize: '12px', letterSpacing: '1.5px', marginTop: 0, marginBottom: '20px', borderLeft: '3px solid #f000ff', paddingLeft: '10px', fontWeight: 'bold' }
};

export default Dashboard;