# 📊 Fastech // CONTROL CENTER

<p align="center">
  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=fany&backgroundColor=0f172a" width="120" alt="Fastech Logo"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/STATUS-OPERATIONAL-06b6d4?style=for-the-badge&logoColor=white" alt="Status Operational">
  <img src="https://img.shields.io/badge/VERSION-1.0.0-f43f5e?style=for-the-badge&logoColor=white" alt="Version 1.0.0">
  <img src="https://img.shields.io/badge/ENVIRONMENT-LINUX_/_WSL2-10b981?style=for-the-badge&logoColor=white" alt="Environment Linux">
</p>

---

## 🌌 Descripción del Proyecto

Sistema avanzado e integrado para el control de inventario y monitoreo de infraestructura local. Diseñado con una interfaz cyberpunk optimizada para la administración de stock y la auditoría de procesos en tiempo real. Actúa de forma desacoplada para garantizar velocidad, consistencia de datos y un entorno visual de vanguardia.

---

## 🛠️ Características Principales

* 📊 **Dashboard Central:** Métricas en tiempo real y analíticas rápidas mediante gráficos dinámicos del flujo del sistema.
* 📦 **Control de Inventario:** CRUD funcional, estricto e intuitivo para la gestión de productos, marcas y unidades disponibles.
* ⚙️ **Panel de Configuración:** Centro de mando interactivo para el control del núcleo del sistema y personalización visual dinámica de la interfaz.

---

## 🔒 Arquitectura de Seguridad (Acceso Cerrado)

> [!IMPORTANT]
> **Fastech** está diseñado exclusivamente como una plataforma de control interno y cerrado para infraestructura empresarial. Por motivos de seguridad de inventario y auditoría, el sistema **no cuenta con un registro público de usuarios**. 
> 
> El acceso está estrictamente restringido a terminales autorizadas mediante perfiles de administrador centralizados (`CLEARANCE_LEVEL_5`) controlados por la variable de estado `esAdmin`, previniendo alteraciones externas en las tablas de stock.

---

## 💻 Stack Tecnológico

| Componente | Tecnología | Propósito Técnico |
| :--- | :--- | :--- |
| **Frontend** | `React.js` | Componentes funcionales, hooks de estado de interfaz asíncronos y consumo de API. |
| **Gráficas** | `Recharts` | Renderizado de métricas en tiempo real para auditoría de ventas e inventario. |
| **Estilos** | `CSS3` | Espectro visual en modo oscuro con iluminación neón interactiva (Cian / Magenta). |
| **Backend** | `Node.js / Express` | API REST encargada del parseo de datos en formato JSON y gestión de rutas. |
| **Base de Datos** | `MariaDB` | Persistencia relacional local estable y control estricto de nulidades. |

---

## 🚀 Instalación Rápida

Sigue estos pasos en tu terminal para clonar y levantar el entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/keniastefanyherr/Fastech.git](https://github.com/keniastefanyherr/Fastech.git)
cd Fastech
