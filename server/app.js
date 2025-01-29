const express = require('express');
const app = express();
const cors = require('cors');

// Configure CORS to allow requests from your React app
app.use(cors({
    origin: 'http://localhost:3000',  // Your React app's URL
    methods: ['GET', 'POST', 'DELETE', 'PUT'],  // Allowed methods
    credentials: true  // Allow credentials
}));

app.use(express.json());
app.use('/api/wishlists', require('./routes/wishlists'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 