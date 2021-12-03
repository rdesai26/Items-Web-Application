 import express from 'express';

import Item from '../models/items.mjs';
const router = express.Router();

router.get('/items', async (req,resp, next) => {
    try {
    resp.json(await Item.list());
    }
    catch (e) {
        next(e);
    }
});

export default router; 