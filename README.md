# 📊 Fastech // CENTRO DE CONTROL

<p align="center">
  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=fany&backgroundColor=0f172a" width="120" alt="Fastech Logo"/>
</p>

---

## 🌌 Descripción del Proyecto

Sistema avanzado e integrado para el control de inventario y monitoreo de infraestructura local. Diseñado con una interfaz cyberpunk optimizada para la administración de stock y la auditoría de procesos en tiempo real. Actúa de forma desacoplada para garantizar velocidad, consistencia de datos y un entorno visual de vanguardia.

---

## 🛠️ Características principales

* 📊 **Dashboard Central:** Métricas en tiempo real y análisis rápidas mediante gráficos dinámicos del flujo del sistema.
* 📦 **Control de Inventario:** CRUD functional, estricto e intuitivo para la gestión de productos, marcas y unidades disponibles.
* ⚙️ **Panel de Configuración:** Centro de mando interactivo para el control del núcleo del sistema y personalización visual dinámica de la interfaz.

---

## 📱 Módulos y Galería del Sistema

### 1. Entorno del Cliente // Catálogo Responsivo
Yo implementé la interfaz del catálogo público responsivo ("Modo Invitado // Tienda Cliente") optimizada bajo un espectro visual oscuro con acentos neón cian, diseñada específicamente para la exploración fluida de hardware tecnológico en tiempo real. En este módulo, estructuré una visualización en cuadrícula utilizando tarjetas dinámicas e independientes para renderizar la sección de Smartphones Premium, mapeando datos clave desde MariaDB como la marca, el modelo exacto del dispositivo, el precio unitario formateado y el stock crítico disponible en unidades (UDS). Asimismo, incorporé botones interactivos con bordes estilizados para la acción de "Ver Detalles // Adquirir" y un sistema de navegación superior con una pasarela de retorno seguro hacia el módulo de autenticación central (Volver al Login), demostrando la eficiencia técnica de React para manipular layouts limpios, modernos y completamente adaptables a las demandas visuales de la plataforma.

<p align="center"><img src="assets/02_tienda_cliente.png" width="85%" alt="Fastech Tienda Cliente Smartphones"></p>

---

### 2. Panel de Operador Principal (Dashboard)
Consola central de administración con un menú lateral interactivo fluido, diseñado para que el usuario autenticado alterne rápidamente entre los diferentes entornos de control del sistema. Una vez superada la autenticación, el operador dispone de una suite central con un menú lateral fluido para alternar instantáneamente entre los diferentes entornos de control del sistema.

<p align="center"><img src="assets/03_control_center.png" width="85%" alt="Fastech Control Center Principal"></p>

---

### 3. Sistema de Analíticas Globales // Flujo de Ventas
Componente visual estadístico integrado en el dashboard que representa el rendimiento comercial, auditoría de transacciones y el flujo de ingresos brutos del sistema mediante gráficos dinámicos en el frontend.

<p align="center"><img src="assets/04_analiticas_ventas.png" width="85%" alt="Rendimiento de Ventas Brutas"></p>

---

### 4. Sistema de Analíticas Globales // Distribución de Almacén
Gráfico estadístico interactivo que analiza el volumen físico y la distribución del stock de hardware en tiempo real, basándose directamente en los registros y consultas relacionales de MariaDB.

<p align="center"><img src="assets/05_analiticas_stock.png" width="85%" alt="Distribución de Stock en MariaDB"></p>

---

### 5. Panel de Control de Inventario (Auditoría Gráfica)
Segunda sección analítica del centro de mando destinada a la comparación de métricas comerciales y el balance de inventario antes de realizar modificaciones estructurales en las tablas.

<p align="center"><img src="assets/04_analiticas_ventas.png" width="85%" alt="Fastech Analíticas Avanzadas de Sistema"></p>

---

### 6. Consola de Registro General de Existencias
Módulo operativo secundario enfocado en la supervisión visual previa de las tablas relacionales de almacenamiento, asegurando la consistencia antes de los procesos de actualización masiva.

<p align="center"><img src="assets/05_analiticas_stock.png" width="85%" alt="Distribución General del Stock"></p>

---

### 7. Gestión de Almacén (Inventory CRUD)
Formulario interactivo y suite de operaciones dedicada a ejecutar los procesos CRUD (crear, leer, actualizar y eliminar) en el stock físico de componentes informáticos, aplicando validaciones lógicas inmediatas.

<p align="center"><img src="assets/06_inventario_tess.png" width="85%" alt="Panel de Control CRUD de Almacén"></p>

---

### 8. Visualización de Tablas Dinámicas
Interfaz estructurada en tablas limpias para listar el hardware guardado. Cuenta con una validación de estado alternativo dinámico que notifica al operador en tiempo real si el almacén está vacío o los filtros de búsqueda no arrojan coincidencias.

<p align="center"><img src="assets/07_conttoolmetrmany.png" width="85%" alt="Estructura de Tabla Dinámica de Componentes"></p>

---

### 9. Configuración del Núcleo (Core Status)
Módulo de diagnóstico técnico de infraestructura que reporta en tiempo real las métricas vitales del entorno local: el estado del motor de persistencia relacional (ONLINE), el puerto activo del backend (5000) y la latencia actual de red.

<p align="center"><img src="assets/08_commard_client.png" width="85%" alt="Configuración del Estado del Núcleo"></p>

---

### 10. Perfil Operativo y Selección de Entorno
Panel de control de usuario que muestra las credenciales del operador en sesión, su nivel de autorización, el temporizador de sesión activa y la suite interactiva de selección de temas estéticos para la interfaz.

<p align="center"><img src="assets/09_systems_store.png" width="85%" alt="Configuración del Perfil del Operador"></p>

---

### 11. Auditoría de Procesos (Live System Logs)
Consola interactiva integrada directamente en el cliente que simula y renderiza en tiempo real las secuencias de arranque de los módulos, las confirmaciones de red del servidor, los registros de conexiones HTTP y la traza de actividad del entorno de ejecución.

<p align="center"><img src="assets/10_system_logs.png" width="85%" alt="Consola de Logs de Auditoría en Vivo"></p>

---

## 💻 Stack Tecnológico

<table width="100%">
  <thead>
    <tr style="background-color: #1a1a2e; color: #ffffff;">
      <th align="left" style="padding: 10px;"><b>Componente</b></th>
      <th align="left" style="padding: 10px;"><b>Tecnología</b></th>
      <th align="left" style="padding: 10px;"><b>Propósito Técnico</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Interfaz</td>
      <td style="padding: 10px; border-bottom: 1px solid #333;"><code>React.js</code></td>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Componentes funcionales, ganchos de estado de interfaz asíncronos y consumo de API.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Gráficas</td>
      <td style="padding: 10px; border-bottom: 1px solid #333;"><code>Recharts</code></td>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Renderizado de métricas en tiempo real para auditoría de ventas e inventario.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Estilos</td>
      <td style="padding: 10px; border-bottom: 1px solid #333;"><code>CSS3</code></td>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Espectro visual en modo oscuro con iluminación neón interactiva (Cian / Magenta).</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Backend</td>
      <td style="padding: 10px; border-bottom: 1px solid #333;"><code>Node.js / Express</code></td>
      <td style="padding: 10px; border-bottom: 1px solid #333;">API REST encargada del análisis de datos en formato JSON y gestión de rutas.</td>
    </tr>
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Base de Datos</td>
      <td style="padding: 10px; border-bottom: 1px solid #333;"><code>MariaDB</code></td>
      <td style="padding: 10px; border-bottom: 1px solid #333;">Persistencia relacional local estable y control estricto de nulidades y restricciones de stock.</td>
    </tr>
  </tbody>
</table>
