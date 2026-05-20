# 📊 Fastech // CENTRO DE CONTROL

<p align="center">
  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=fany&backgroundColor=0f172a" width="120" alt="Fastech Logo"/>
</p>

---

## 📱 Smartphone Premium

Yo implementé la interfaz del catálogo público responsivo ("Modo Invitado // Tienda Cliente") optimizada bajo un espectro visual oscuro con acentos neón cian, diseñada específicamente para la exploración fluida de hardware tecnológico en tiempo real. En este módulo, estructuré una visualización en cuadrícula utilizando tarjetas dinámicas e independientes para renderizar la sección de Smartphones Premium, mapeando datos clave desde MariaDB como la marca, el modelo exacto del dispositivo, el precio unitario formateado y el stock crítico disponible en unidades (UDS). Asimismo, incorporé botones interactivos con bordes estilizados para la acción de "Ver Detalles // Adquirir" y un sistema de navegación superior con una pasarela de retorno seguro hacia el módulo de autenticación central (Volver al Login), demostrando la eficiencia técnica de React para manipular layouts limpios, modernos y completamente adaptables a las demandas visuales de la plataforma.

<p align="center"><img src="assets/02_tienda_cliente.png" width="85%" alt="Fastech Tienda Cliente Smartphones"></p>

## 📺 Dashboard

Consola central de administración con un menú lateral interactivo fluido, diseñado para que el usuario autenticado alterne rápidamente entre los diferentes entornos de control del sistema. Una vez superada la autenticación, el operador dispone de una suite central con un menú lateral fluido para alternar instantáneamente entre los diferentes entornos de control del sistema.

<p align="center"><img src="assets/03_control_center.png" width="85%" alt="Fastech Control_center.png"></p>

## 📊 Analíticas

El dashboard integra componentes basados en gráficos dinámicos para auditar el comportamiento comercial y el volumen físico del stock en tiempo real basándose en los registros almacenados en el sistema de base de datos.

<p align="center"><img src="assets/04_analiticas_ventas.png" width="85%" alt="Rendimiento de Ventas Brutas"></p>
<p align="center"><img src="assets/05_analiticas_stock.png" width="85%" alt="Distribución de Stock en MariaDB"></p>
<p align="center"><img src="assets/04_analiticas_ventas.png" width="85%" alt="Fastech Analíticas Avanzadas de Sistema"></p>

<p align="center"><img src="assets/05_analiticas_stock.png" width="85%" alt="Distribución General del Stock"></p>

<p align="center"><img src="assets/06_inventario_tess.png" width="85%" alt="Panel de Control CRUD de Almacén"></p>

<p align="center"><img src="assets/07_conttoolmetrmany.png" width="85%" alt="Estructura de Tabla Dinámica de Componentes"></p>

<p align="center"><img src="assets/08_commard_client.png" width="85%" alt="Configuración del Estado del Núcleo"></p>

<p align="center"><img src="assets/09_systems_store.png" width="85%" alt="Configuración del Perfil del Operador"></p>

<p align="center"><img src="assets/10_system_logs.png" width="85%" alt="Consola de Logs de Auditoría en Vivo"></p>

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
