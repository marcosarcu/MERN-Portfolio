import express from 'express';
import { create, find, deleteOne, login, logout } from '../controllers/users.api.controllers.js';

const router = express.Router();

router.route('/api/users/login')
.post(login)

router.route('/api/users/logout')
.post(logout)

router.route('/api/users')
.get(find)
.post(create)

router.route('/api/users/:id')
.delete(deleteOne)

export default router;