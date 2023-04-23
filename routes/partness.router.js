const express = require('express');

const partnessService = require('../services/partness.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new partnessService();

router.get('/', async (req, res, next) => {
  try {
    const partness = await service.find();
    res.json(partness);
  } catch (error) {
    next(error);
  }
}); 

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const partness = await service.findOne(id);
      res.json(partness);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newpartness = await service.create(body);
      res.status(201).json(newpartness);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const partness = await service.update(id, body);
      res.json(partness);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

