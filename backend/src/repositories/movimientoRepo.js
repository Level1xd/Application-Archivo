const { poolPromise, sql } = require('../db/mssql');

async function insertMovimiento({ expediente_id, usuario_id, tipo, fecha, motivo }) {
  const pool = await poolPromise;
  await pool.request()
    .input('expediente_id', sql.Int, expediente_id)
    .input('usuario_id', sql.Int, usuario_id)
    .input('tipo', sql.VarChar(10), tipo)
    .input('fecha', sql.DateTime, fecha)
    .input('motivo', sql.VarChar(200), motivo)
    .execute('sp_InsertMovimiento');
}

async function getMovimientos(expediente_id) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('expediente_id', sql.Int, expediente_id)
    .query('SELECT * FROM MOVIMIENTO WHERE expediente_id = @expediente_id ORDER BY fecha DESC');
  return result.recordset;
}

module.exports = { insertMovimiento, getMovimientos };