const express = require('express');
const router = express.Router();
const { createWishlist, getWishlists, deleteWishlist } = require('../controllers/wishlistController');

router.post('/', createWishlist);
router.get('/', getWishlists);
router.delete('/:id', deleteWishlist);

module.exports = router; 