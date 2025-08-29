require('dotenv').config();
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json()); //JSON

//http://localhost:3000
const port = process.env.PORT || 3000;

const handDbError = (res, error) => {
  console.error('Error de acceso BD:', error);
  res.status(500).json({error: 'Error interno en el servidor'});
}

//Verbos
//GET (consulta)
app.get('/vehiculos', async (req, res) => {
  try {
   const[rows] = await pool.query('SELECT * FROM vehiculos');
   res.status(200).json(rows);
  } catch (error) {
    handDbError(res, error);
  }
});

//POST (insercion)
app.post('/vehiculos', async (req, res) => {

  const {marca, modelo, color, precio, placa} = req.body;

  //Todos los datos obligatorios
  if(!marca || !modelo || !color || !precio || !placa){
     //No se podra realizar el registro
     return res.status(400).json({error: 'Todos los campos son necesarios'}) 
  }

  try {
    const [result] = await pool.query('INSERT INTO vehiculos (marca,modelo,color,precio,placa) VALUE (?,?,?,?,?)',
      [marca, modelo, color, precio, placa]
    );
    //Obtener el PK generado
    const id = result.insertId
   res.status(200).json({'id': id});
  } catch (error) {
    if(error.code === 'ER_DUP_ENTRY'){
    return res.status(409).json({error: 'La palca ya existe'})
    }
    handDbError(res, error);
  }
});

//PUT (Actualizacion)
app.put('/vehiculos/:id', async (req, res) => {
  const {id} = req.params; //URL
  const {marca, modelo, color, precio, placa} = req.body; //JSON

  //Todos los datos obligatorios
  if(!marca || !modelo || !color || !precio || !placa){
     //No se podra realizar el registro
     return res.status(400).json({error: 'Todos los campos son necesarios'}) 
  }

  try {
    const [result] = await pool.query(
      'UPDATE vehiculos SET marca = ?, modelo = ?, color = ?, precio = ?, placa = ? WHERE id = ?',
      [marca, modelo, color, precio, placa, id]
    );

    if (result.affectedRows === 0){
      return res.status(404).json({success: false, message: 'Vehículo no existe'})
    }

    res.status(200).json({success: true, message: 'Vehículo actualizado correctamente'})
  } catch (error) {
    if(error.code === 'ER_DUP_ENTRY'){
    return res.status(409).json({error: 'La palca ya existe'})
    }
    handDbError(res, error);
  }
});
//DELETE (Eliminacion)
app.delete('/vehiculos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      'DELETE FROM vehiculos WHERE id = ?',[id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({success: false, message: 'Vehículo no existe' });
    }

    res.status(200).json({success: true, message: 'Vehículo eliminado correctamente' });
  } catch (error) {
    handDbError(res, error);
  }
});

//Buscar
app.get('/vehiculos/buscar/:placa', async (req, res) => {
  const {placa} = req.params;

  if (!placa) {
    return res.status(400).json({error: "la placa es requerida para su busqueda"});   
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM vehiculos WHERE placa = ?',
      [placa]
    );

    if(rows.length === 0) {
      return res.status(404).json({success: false, message: "No se encontro ningún vehiculo con esa placa"});
    }

    res.status(200).json({success: true, data: rows[0]});
  } catch (error) {
    handDbError(res, error);
  }
});


//Inicar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
