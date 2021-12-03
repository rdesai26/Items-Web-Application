import express from 'express';

import Item from '../models/items.mjs';

import {authenticate} from './users.mjs';

var router = express.Router();

 router.get('/', async (req, res, next) => {
  try {
  res.render('items', {
    title: 'Items',
    items: await Item.list()
  });
}
catch (e) {
  next(e);
}
});


router.get('/add', authenticate, async (req, resp, next) => {
  try { 
    if (req.query.id && req.query.name && req.query.price) {
      console.log(req.query);
      console.log(await Item.get(req.query.id));
      if (await Item.get(req.query.id) != null)
      {
        resp.render('edit-item', {
          exists:true,
          id: req.query.id,
          title: 'Add Item'
        });
      }
      else {
      await Item.create(req.query);
      resp.redirect('/items');
      }
    } else {
      resp.render('edit-item', {
        title: 'Add Item'
      }); 
    }
  } catch (e) {
    next(e);
  }
});


router.get('/edit/:id', authenticate,  async (req,resp,next) => {
  try {
    if (req.query.name && req.query.price) {
      await Item.update(req.params.id,req.query);
      resp.redirect('/items');
    } else {
      let item = await Item.get(req.params.id);
      resp.render('edit-item', {
        item: item,
        edit: true,
        title: 'Edit Item'
      });
    }
  }
  catch (e) {
    next(e);
  }
})

router.get('/delete/:id', authenticate, async (req,resp,next) => {
  try {
   await Item.delete(req.params.id);
   resp.redirect('/items');
  }
  catch(e) {
    next(e);
  }
})
export default router;
