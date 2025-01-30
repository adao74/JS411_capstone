const express = require('express');
const cors = require('cors');
const app = express();

// Configure CORS based on environment
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.VERCEL_URL  // Vercel's deployment URL
        : 'http://localhost:3000', // Local development
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));

app.use(express.json());
app.use('/api/wishlists', require('./routes/wishlists'));
app.use('/api/auth', require('./routes/auth'));

// Only start the server if we're not in Vercel's production environment
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the Express API
module.exports = app; 