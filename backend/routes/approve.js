const express = require('express');
const router = express.Router();
const Controller = require('../app/api/controllers/approve');

router.post("/", Controller.create);
router.get("/", Controller.getAll);
router.post("/filter", Controller.getFilter);
router.get('/:id', Controller.getById);
router.get('/token/:id', Controller.getByTokenId);
router.put('/:id', Controller.updateById);
router.put('/token/:id', Controller.updateByTokenId);
router.delete('/:id', Controller.deleteById);
module.exports = router;
