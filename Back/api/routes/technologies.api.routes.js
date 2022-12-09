import express from "express";
import {findAll} from '../controllers/technologies.api.controllers.js';

const router = express.Router();
router.route('/api/technologies')
.get(findAll);

export default router;
