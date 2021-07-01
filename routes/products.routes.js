const express = require('express');
const Product = require('../models/product.model');

const router = express.Router();


router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch(err) {
    res.status(500).json({message: err});
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    const prod = await Product.findOne().skip(random);
    if (prod) {
      res.json(prod);
    } else {
      res.status(404).json({message: 'Not found'});
    }    
  } catch(err) {
    res.status(500).json({message: err});
  }  
});

router.get('/products/:id', async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) {
      res.status(404).json({message: 'Not found'});
    } else {
      res.json(prod);
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
  
});

router.post('/products', async (req, res) => {
  const { name, client } = req.body;  
  try {
    const product = new Product({name: name, client: client});
    await product.save();
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({message: err});
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;  
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({message: 'Not found'});
    } else {
      product.name = name ? name : product.name;
      product.client = client ? client : product.client;      
      await product.save();
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const prod = Product.findById(req.params.id);
    if (!prod) {
      res.status(404).json({message: 'Not found'});
    } else {
      await Product.deleteOne({_id: req.params.id});      
      res.json({message: 'OK'});
    }
  } catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;
