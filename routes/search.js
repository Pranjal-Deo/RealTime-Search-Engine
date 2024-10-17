const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define a sample model for storing search data
const ItemSchema = new mongoose.Schema({
   title: String,
   description: String
});

const Item = mongoose.model('Item', ItemSchema);

// Sample search function
router.post('/', async (req, res) => {
   try {
      const query = req.body.query;
      const results = await Item.find({ $text: { $search: query } });
      res.json(results);
   } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
   }
});

module.exports = {
   router,
   findResults: async (query) => {
      return await Item.find({ $text: { $search: query } });
   }
};
