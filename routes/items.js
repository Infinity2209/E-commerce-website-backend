const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

// GET /items - List items with filters, search, pagination, sorting
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, page = 1, limit = 12, sortBy = 'name' } = req.query;
        let query = {};

        // Category filter
        if (category) query.category = category;

        // Price range filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Search filter (name or description)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Sorting
        let sort = {};
        switch (sortBy) {
            case 'price_asc':
                sort.price = 1;
                break;
            case 'price_desc':
                sort.price = -1;
                break;
            case 'newest':
                sort.createdAt = -1;
                break;
            default:
                sort.name = 1;
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Get total count for pagination
        const totalItems = await Item.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limitNum);

        // Fetch items with pagination and sorting
        const items = await Item.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        res.json({
            items,
            totalPages,
            currentPage: pageNum,
            totalItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /items - Create item
router.post('/', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /items/:id - Update item
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /items/:id - Delete item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

