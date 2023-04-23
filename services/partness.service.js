const boom = require('@hapi/boom');

const crypto = require('crypto');

const getConnection = require('../libs/postgres');

class partnessService {

  constructor() {}

  async create(data) {

    if(!data) return;

    const randomId = Math.floor(crypto.randomInt(1000 - 1) + 1);

    const client = await getConnection();

    let insertQuery = {
      text: 'INSERT INTO partness (id, name, description, link, image) VALUES ($1, $2, $3, $4, $5)',
      values: [randomId, data.name, data.description, data.link, data.image], 
    };
    
    try {
      const res = await client.query(insertQuery);
      console.log('Inserción exitosa');
      return true;
    } catch (err) {
      console.error('Error al insertar:', err);
    }
  }

  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM partness');
    if (rta.rows.length === 0) {
      return null; 
    }
    return rta.rows;
  }

  async findOne(id) {
    const client = await getConnection();
    const res = await client.query('SELECT * FROM partness WHERE id = $1 LIMIT 1', [id]);
    if (res.rows.length === 0) {
      return false; 
    }
    return res.rows[0]; 
  }

  async update(id, changes) {
      
      if(!changes.name) return;

      const client = await getConnection();

      const res = await client.query('SELECT * FROM partness WHERE id = $1 LIMIT 1', [id]);

      if (res.rows.length === 0) {
        return false; 
      }

      const query = { 
        text: 'UPDATE partness SET id=$1, name = $2, description=$3, link=$4, image=$5 VALUES ($1, $2, $3, $4, $5)',
        values: [randomId, data.name, data.description, data.link, data.image], 
      };

      try {
        const res = await client.query(query);
        console.log('actualizacion exitosa');
      } catch (err) {
        console.error('Error al actualizar:', err);
      }
      return true;
  }

  async delete(id) {
    const client = await getConnection();

    let deleteQuery = {
      text: 'DELETE FROM partness WHERE id = $1',
      values: [id], 
    };

    try {
      const res = await client.query(deleteQuery);
      console.log('Eliminación exitosa');
      return true;
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  }
}

module.exports = partnessService;
