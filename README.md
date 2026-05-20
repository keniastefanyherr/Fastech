# 📊 Fastech // CONTROL CENTER

Sistema avanzado e integrado para la gestión de inventario, auditoría de procesos y catálogo automatizado de hardware en tiempo real. Desarrollado con una arquitectura moderna que desacopla la lógica del servidor y la interfaz del cliente bajo un entorno visual inmersivo de estilo cyberpunk optimizado.

<p align="center">
  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=fany&backgroundColor=0f172a" width="120" alt="Fastech Logo"/>
</p>

---

## 🔐 1. Control de Acceso y Seguridad (Authentication)

El sistema cuenta con un módulo centralizado de autenticación de operadores. El entorno visual está restringido y requiere credenciales válidas para inicializar los módulos de administración superior.

<p align="center">
  <img src="assets/01_login_auth.png" width="85%" alt="Fastech Core System Auth"/>
</p>

---

## 🏬 2. Entorno del Cliente // Catálogo de Smartphones Premium

Interfaz optimizada para la navegación pública responsiva ("Modo Invitado // Tienda Cliente"). Permite la exploración fluida de hardware a través de tarjetas dinámicas independientes que mapean datos en tiempo real (marca, modelo, precio y stock disponible) directo desde la base de datos.

<p align="center">
  <img src="assets/02_tienda_cliente.png" width="85%" alt="Fastech Tienda Cliente Smartphones"/>
</p>

---

## 🖥️ 3. Panel de Operador (Control Center Dashboard)

Una vez autenticado el administrador, se despliega el panel de control principal. Este módulo incluye un menú lateral intuitivo para alternar entre el catálogo, las herramientas CRUD de inventario y las configuraciones de la plataforma.

<p align="center">
  <img src="assets/03_control_center.png" width="85%" alt="Fastech Control Center Principal"/>
</p>

### 📈 Sistema de Analíticas Globales (Core Metrics)
El panel integra gráficas analíticas avanzadas para el monitoreo del rendimiento del sistema, como el reporte histórico de ventas brutas mensuales y la distribución de inventario físico.

<p align="center">
  <img src="assets/04_analiticas_ventas.png" width="48%" alt="Rendimiento de Ventas Brutas"/>
  <img src="assets/05_analiticas_stock.png" width="48%" alt="Distribución de Stock en MariaDB"/>
</p>

---

## 📦 4. Gestión de Almacén (Inventory CRUD)

Módulo operativo dedicado al control total del stock central. Permite registrar nuevos componentes informáticos especificando nombre, precio unitario y cantidad, impactando de forma inmediata en la persistencia de datos.

<p align="center">
  <img src="assets/06_inventario_crud_panel.png" width="85%" alt="Inventory Control Panel"/>
</p>

### 📋 Visualización de Registros Globales
Tabla estructurada que lista las especificaciones técnicas del hardware guardado. Si el sistema no detecta existencias o si el filtro de búsqueda se vacía, la interfaz responde dinámicamente notificando el estado del almacén.

<p align="center">
  <img src="assets/07_inventario_tabla_vacia.png" width="85%" alt="Registros en MariaDB Control Global"/>
</p>

---

## ⚙️ 5. Configuración del Núcleo y Perfil de Administrador

Módulo crítico para auditar el ecosistema de la aplicación en tiempo real, dividida en tres secciones esenciales de control:

<p align="center">
  <img src="assets/08_configuracion_sistema.png" width="85%" alt="System Configuration Status"/>
</p>

1. **Core Status:** Muestra el estado de la conexión con MariaDB (`ONLINE`), el puerto activo (`localhost:5000`) y una latencia de respuesta estable (ej. `14 ms`).
2. **Interface Theme:** Selector dinámico de identidad visual para alternar el espectro de iluminación del panel central (`CYAN_NEON`, `GREEN_MATRIX`, `RED_ALERT`).
3. **Administrator Profile:** Muestra los datos del operador en sesión activa, su nivel de acceso (`Clearance: Level 5 // Total Access`), un avatar personalizado y un contador de tiempo de la sesión actual.

<p align="center">
  <img src="assets/09_configuracion_perfil.png" width="85%" alt="Interface Theme and Admin Profile"/>
</p>

---

## 📄 6. Auditoría de Procesos (Live System Logs)

Consola integrada que renderiza de forma interactiva la secuencia de arranque de los módulos de React, confirmación de conexiones seguras por el puerto correspondiente, la sincronización de las tablas de MariaDB y los estados generales de estabilidad.

<p align="center">
  <img src="assets/10_system_logs.png" width="85%" alt="Terminal Live System Logs"/>
</p>

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React.js, HTML5, CSS3 (Efectos Neón y Layouts Flexbox/Grid responsivos).
* **Base de Datos:** MariaDB / MySQL.
* **Herramientas de Desarrollo:** Visual Studio Code, Ubuntu Linux (Entorno de ejecución de terminal).
