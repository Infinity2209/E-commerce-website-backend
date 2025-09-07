const express = require('express');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get cart for user
router.get('/', authMiddleware, async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.userId }).populate('items.item');
        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [] });
            await cart.save();
        } else {
            // Clean invalid items where item is null
            cart.items = cart.items.filter(i => i.item !== null);
            await cart.save();
            cart = await Cart.findById(cart._id).populate('items.item');
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add item to cart
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            cart = new Cart({ user: req.user.userId, items: [] });
        }
        const existingItemIndex = cart.items.findIndex(i => i.item.toString() === itemId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ item: itemId, quantity });
        }
        await cart.save();
        // Populate items before returning
        cart = await Cart.findById(cart._id).populate('items.item');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update item quantity in cart
router.post('/update', authMiddleware, async (req, res) => {
    try {
        const { itemId, quantity } = req.body;
        if (quantity < 1) return res.status(400).json({ error: 'Quantity must be at least 1' });
        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        const itemIndex = cart.items.findIndex(i => i.item.toString() === itemId);
        if (itemIndex === -1) return res.status(404).json({ error: 'Item not found in cart' });
        cart.items[itemIndex].quantity = quantity;
        await cart.save();
        // Populate items before returning
        cart = await Cart.findById(cart._id).populate('items.item');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove item from cart
router.post('/remove', authMiddleware, async (req, res) => {
    try {
        const { itemId } = req.body;
        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        cart.items = cart.items.filter(i => i.item.toString() !== itemId);
        await cart.save();
        // Populate items before returning
        cart = await Cart.findById(cart._id).populate('items.item');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
