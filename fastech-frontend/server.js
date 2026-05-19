// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu usuario de MySQL
  password: 'fany123', // Tu contraseña de MySQL
  database: 'fastech_db' 
});

// Conectar a la base de datos para verificar errores en consola
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a MariaDB:", err.message); 
  } else {
    console.log("Conectado con éxito a la base de datos fastech_db"); 
  }
});

// 1. Ruta para obtener productos (READ)
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => { 
    if (err) return res.status(500).send(err); 
    res.json(results); 
  });
});

// 2. Ruta para agregar un producto (CREATE)
app.post('/productos', (req, res) => {
  const { nombre, marca, precio, stock, introduccion, caracteristicas, imagen } = req.body;
  
  const sql = 'INSERT INTO productos (nombre, marca, precio, stock, introduccion, caracteristicas, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, 
  [nombre, marca || 'Genérico', precio, stock, introduccion || '', caracteristicas || '', imagen || 'default.jpg'], 
  (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, ...req.body }); 
  });
});

// 3. Ruta para eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => { 
  const { id } = req.params; 
  
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => { 
    if (err) return res.status(500).send(err); 
    res.json({ message: "Producto eliminado con éxito", id: parseInt(id) }); 
  });
});

// 4. Ruta para actualizar/editar un producto completo (UPDATE) - ¡BLINDADA CONTRA BORRADOS!
app.put('/productos/:id', (req, res) => {
  const { id } = req.params; 
  const { nombre, marca, precio, stock, introduccion, caracteristicas, imagen } = req.body;
  
  let sql = '';
  let params = [];

  // Si 'imagen' viene definida en la petición, significa que queremos actualizar todo (incluyendo la foto)
  if (imagen) {
    sql = 'UPDATE productos SET nombre = ?, marca = ?, precio = ?, stock = ?, introduccion = ?, caracteristicas = ?, imagen = ? WHERE id = ?';
    params = [nombre, marca, precio, stock, introduccion, caracteristicas, imagen, id];
  } else {
    // 👈 ¡ESTA ES LA PROTECCIÓN! Si modificas desde la tabla del CRUD rápido y no mandas imagen,
    // actualizamos únicamente los campos modificados para NO destruir ni borrar la imagen previa en MariaDB.
    sql = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';
    params = [nombre, precio, stock, id];
  }
  
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error SQL al actualizar:", err); 
      return res.status(500).send(err); 
    }
    res.json({ message: "SISTEMA: Nodo actualizado con éxito sin alterar archivos multimedia", id: parseInt(id) });
  });
});

// 4.5 NUEVA RUTA: Específica para restar stock desde el Dashboard de forma limpia
app.put('/productos/:id/stock', (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  const sql = 'UPDATE productos SET stock = ? WHERE id = ?';

  db.query(sql, [stock, id], (err, result) => {
    if (err) {
      console.error("Error SQL al actualizar el stock:", err);
      return res.status(500).send(err);
    }
    res.json({ id: parseInt(id), stock });
  });
});

app.listen(5000, () => console.log("Servidor corriendo en puerto 5000"));