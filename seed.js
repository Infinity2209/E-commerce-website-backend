require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const dummyData = [
    // Electronics
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 199.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Smartphone 128GB',
        description: 'Latest smartphone with advanced camera, fast processor, and long-lasting battery.',
        price: 699.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Gaming Laptop',
        description: 'Powerful gaming laptop with RTX graphics, 16GB RAM, and SSD storage.',
        price: 1299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1602004212503-df1238327859?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor and GPS.',
        price: 299.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Wireless Charger',
        description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
        price: 39.99,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?auto=format&fit=crop&w=300&q=80'
    },

    // Clothing
    {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors.',
        price: 19.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans with perfect fit and durability.',
        price: 79.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Summer Dress',
        description: 'Elegant summer dress perfect for casual and formal occasions.',
        price: 49.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1495121605193-b116b5b09a09?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with advanced cushioning technology.',
        price: 129.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1528701800489-3fc7f852d5ee?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Winter Jacket',
        description: 'Warm and stylish winter jacket with waterproof coating.',
        price: 149.99,
        category: 'Clothing',
        image: 'https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=300&q=80'
    },

    // Books
    {
        name: 'The Great Gatsby',
        description: 'Classic American novel by F. Scott Fitzgerald about the Jazz Age.',
        price: 12.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'JavaScript: The Good Parts',
        description: 'Essential guide to JavaScript programming by Douglas Crockford.',
        price: 29.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1519452575410-72a9780d3b66?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'The Art of Cooking',
        description: 'Comprehensive cookbook with recipes from around the world.',
        price: 34.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1529692236671-f4dadd364fda?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'World History',
        description: 'Complete guide to world history from ancient times to present.',
        price: 49.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Mystery Novel Collection',
        description: 'Set of 5 bestselling mystery novels by various authors.',
        price: 39.99,
        category: 'Books',
        image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?auto=format&fit=crop&w=300&q=80'
    },

    // Home & Garden
    {
        name: 'Garden Hose 50ft',
        description: 'Durable garden hose with brass connectors and adjustable spray nozzle.',
        price: 24.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1508697014387-982d1d8be937?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Indoor Plant Set',
        description: 'Set of 3 beautiful indoor plants with decorative pots.',
        price: 45.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Tool Set 100pcs',
        description: 'Complete tool set with various hand tools for home repairs.',
        price: 89.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Throw Pillow Set',
        description: 'Set of 4 decorative throw pillows for sofa and bed.',
        price: 39.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1505692794400-6f13bed3bf49?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'LED Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and USB charging.',
        price: 49.99,
        category: 'Home & Garden',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80'
    },

    // Sports
    {
        name: 'Basketball',
        description: 'Official size basketball with superior grip and durability.',
        price: 29.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with carrying strap and alignment guides.',
        price: 34.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Dumbbell Set 20lbs',
        description: 'Adjustable dumbbell set perfect for home workouts.',
        price: 79.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001d8?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Tennis Racket',
        description: 'Professional tennis racket with graphite construction.',
        price: 149.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1509038055100-16eb033c8977?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Swimming Goggles',
        description: 'Anti-fog swimming goggles with UV protection.',
        price: 19.99,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?auto=format&fit=crop&w=300&q=80'
    },

    // Jewelry
    {
        name: 'Silver Necklace',
        description: 'Elegant sterling silver necklace with pendant.',
        price: 89.99,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Gold Earrings',
        description: '14k gold hoop earrings with diamond accents.',
        price: 299.99,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1501594907357-57cbd6c92d41?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Diamond Ring',
        description: 'Beautiful diamond engagement ring in white gold setting.',
        price: 999.99,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Bracelet Set',
        description: 'Set of 3 beaded bracelets in various colors.',
        price: 49.99,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?auto=format&fit=crop&w=300&q=80'
    },
    {
        name: 'Watch',
        description: 'Classic analog watch with leather strap and stainless steel case.',
        price: 199.99,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80'
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Clear existing items
        await Item.deleteMany({});
        console.log('Cleared existing items');

        // Insert dummy data
        await Item.insertMany(dummyData);
        console.log(`Seeded ${dummyData.length} items successfully`);

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
