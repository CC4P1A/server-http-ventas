import express from 'express';
import * as Sale from './sale.js';

const router = express.Router();

router.use(express.json());

// Product routes
router.post('/sales', Sale.create);
router.get('/sales', Sale.readAll);
router.get('/sales/:id', Sale.read);
router.put('/sales/:id', Sale.update);
router.delete('/sales/:id', Sale.remove);


export default router;