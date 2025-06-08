const { poolPromise, sql } = require('../db/mssql');

async function insertExpediente({ codigo_unico, fecha_recepcion, fiscal_remitente }) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('codigo_unico', sql.VarChar(50), codigo_unico)
    .input('fecha_recepcion', sql.Date, fecha_recepcion)
    .input('fiscal_remitente', sql.VarChar(100), fiscal_remitente)
    .execute('sp_InsertExpediente');
  return result.recordset[0].newId;
}

async function getExpedientes() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM EXPEDIENTE');
  return result.recordset;
}

module.exports = { insertExpediente, getExpedientes };