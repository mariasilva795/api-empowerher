const boom = require('@hapi/boom');

const crypto = require('crypto');

const getConnection = require('../libs/postgres');

class UserService {
  constructor() {}

  async create(data) {

    if(!data) return;

    const randomId = Math.floor(crypto.randomInt(1000 - 1) + 1);

    const client = await getConnection();

    let insertQuery = {
      text: 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)',
      values: [randomId, data.name, data.email, data.password, ], 
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
    const rta = await client.query('SELECT * FROM users');
    if (rta.rows.length === 0) {
      return null; 
    }
    return rta.rows;
  }

  async findOne(id) {
    const client = await getConnection();
    const res = await client.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);
    if (res.rows.length === 0) {
      return false; 
    }
    return res.rows[0]; 
  }

  async update(id, changes) {
      
      if(!changes.name) return;

      const client = await getConnection();

      const res = await client.query('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);

      if (res.rows.length === 0) {
        return false; 
      }

      const query = { 
        text: 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *',
        values: [ changes.name, id], 
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
      text: 'DELETE FROM users WHERE id = $1',
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

module.exports = UserService;
