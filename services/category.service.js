const boom = require('@hapi/boom');

const crypto = require('crypto');

const getConnection = require('../libs/postgres');

class CategoryService {
  constructor() {}

  async create(data) {

    if(!data) return;

    const randomId = Math.floor(crypto.randomInt(1000 - 1) + 1);

    const client = await getConnection();

    let insertQuery = {
      text: 'INSERT INTO category (id, name, description) VALUES ($1, $2, $3)',
      values: [randomId, data.name, data.description], 
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
    const rta = await client.query('SELECT * FROM category');
    if (rta.rows.length === 0) {
      return null; 
    }
    return rta.rows;
  }

  async findOne(id) {
    const client = await getConnection();
    const res = await client.query('SELECT * FROM category WHERE id = $1 LIMIT 1', [id]);
    if (res.rows.length === 0) {
      return false; 
    }
    return res.rows[0]; 
  }

  async update(id, changes) {
      
      if(!changes.name) return;

      const client = await getConnection();

      const res = await client.query('SELECT * FROM category WHERE id = $1 LIMIT 1', [id]);

      if (res.rows.length === 0) {
        return false; 
      }

      const query = { 
        text: 'UPDATE category SET name = $1, description=$2 WHERE id = $3 RETURNING *',
        values: [ changes.name, changes.description, id], 
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
      text: 'DELETE FROM category WHERE id = $1',
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

module.exports = CategoryService;
