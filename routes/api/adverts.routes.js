const express = require('express');
// const multer = require('multer');
const router = express.Router();
const advertController = require('../../controllers/advertController');
const Adverts = require('../../models/Adverts');

/**
 *  Get /api/adverts
 */
router.get('/adverts', advertController.getAdvert);

/**
 * GET /api/adverts/<_id>
 */
router.get('/adverts/:_id', advertController.getAdvertById);

module.exports = router;
