 import express from 'express';

import Item from '../models/items.mjs';
import User from '../models/users.mjs';
import jwt from 'jsonwebtoken';
 import app from "../app.mjs";
 import path from "path";
const router = express.Router();

router.get('/api/items', async (req,resp, next) => {
    try {
    resp.json(await Item.list());
    }
    catch (e) {
        next(e);
    }
});

 router.get('/api/items/:id', async (req,resp, next) => {
     try {
         resp.json(await Item.get(req.params.id));
     }
     catch (e) {
         next(e);
     }
 });

 router.post('/api/items/add/', async (req,resp, next) => {
     try {
         resp.json(await Item.create(req.body));
     }
     catch (e) {
         next(e);
     }
 });

 router.put('/api/items/edit/:id', async (req,resp, next) => {
     try {
         resp.json(await Item.update(req.params.id,req.body));
     }
     catch (e) {
         next(e);
     }
 });

 router.delete('/api/items/delete/:id', async (req,resp, next) => {
     try {
         resp.json(await Item.delete(req.params.id));
     }
     catch (e) {
         next(e);
     }
 });

 router.post('/api/users/', async (req,res,next) => {
     try {
         res.json(await User.create(req.body));
     }
     catch (e) {
         next(e);
     }
 });

 router.get('/api/users/:username', async (req,res,next) => {
     try {
         console.log("username",req.params.username);
         res.json(await User.get(req.params.username));
     }
     catch (e) {
         next(e);
     }
 });

 router.post('/api/users/check/:username', async (req,res,next) => {
     try {
         const check = await User.check(req.body.username,req.body.password);
         if (check === false) {
             res.sendStatus(401);
         }
         else {
             const user = User.get(req.username);
             const {username,firstName,lastName,dateCreated} = user;
            jwt.sign({username,firstName,lastName,dateCreated} , 'shhhhh', { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    res.json(err);
                }
                res.json({ token });
            });
         }
     }
     catch (e) {
         next(e);
     }
 });



export default router; 