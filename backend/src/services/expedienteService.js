const repo = require('../repositories/expedienteRepository');

async function crearExpediente(data) {
  const id = await repo.insertExpediente(data);
  return { id, ...data, estado: 'INGRESADO' };
}

async function listarExpedientes() {
  return await repo.getExpedientes();
}

module.exports = { crearExpediente, listarExpedientes };