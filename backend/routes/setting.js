const express = require('express');
const router = express.Router();
const Controller = require('../app/api/controllers/setting');

router.post("/", Controller.create);
router.get("/", Controller.getAll);
router.post("/filter", Controller.getFilter);
router.get('/:id', Controller.getById);
router.put('/:id', Controller.updateById);
router.delete('/:id', Controller.deleteById);
module.exports = router;
