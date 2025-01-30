const pool = require('../db');

const createWishlist = async (req, res) => {
    try {
        const { name, items } = req.body;
        
        // Begin transaction
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            
            // Insert wishlist
            const [wishlistResult] = await connection.query(
                'INSERT INTO wishlists (name) VALUES (?)',
                [name]
            );
            const wishlistId = wishlistResult.insertId;
            
            // Insert wishlist items
            for (const item of items) {
                await connection.query(
                    'INSERT INTO wishlist_items (wishlist_id, make_id, make_name) VALUES (?, ?, ?)',
                    [wishlistId, item.makeId, item.makeName]
                );
            }
            
            await connection.commit();
            res.status(201).json({ message: 'Wishlist created successfully', wishlistId });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error creating wishlist:', error);
        res.status(500).json({ error: 'Failed to create wishlist' });
    }
};

const getWishlists = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                w.id,
                w.name,
                w.created_at,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', wi.id,
                        'make_id', wi.make_id,
                        'make_name', wi.make_name
                    )
                ) as items
            FROM wishlists w
            LEFT JOIN wishlist_items wi ON w.id = wi.wishlist_id
            GROUP BY w.id, w.name, w.created_at
        `);

        // Format the response to handle empty wishlists (where items is [null])
        const formattedRows = rows.map(row => ({
            ...row,
            items: row.items[0] === null ? [] : row.items
        }));

        res.json(formattedRows);
    } catch (error) {
        console.error('Error fetching wishlists:', error);
        res.status(500).json({ error: 'Failed to fetch wishlists' });
    }
};

const deleteWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to delete wishlist with ID:', id); // Debug log

        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();
            
            // Delete wishlist items first
            const [itemsResult] = await connection.query(
                'DELETE FROM wishlist_items WHERE wishlist_id = ?',
                [id]
            );
            console.log('Deleted items result:', itemsResult); // Debug log
            
            // Then delete the wishlist
            const [result] = await connection.query(
                'DELETE FROM wishlists WHERE id = ?',
                [id]
            );
            console.log('Delete wishlist result:', result); // Debug log
            
            if (result.affectedRows === 0) {
                await connection.rollback();
                return res.status(404).json({ 
                    error: 'Wishlist not found',
                    wishlistId: id 
                });
            }
            
            await connection.commit();
            res.json({ 
                message: 'Wishlist deleted successfully',
                wishlistId: id
            });
        } catch (err) {
            await connection.rollback();
            console.error('Database error:', err); // Debug log
            throw err;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Error deleting wishlist:', error);
        res.status(500).json({ 
            error: 'Failed to delete wishlist',
            details: error.message
        });
    }
};

module.exports = {
    createWishlist,
    getWishlists,
    deleteWishlist
}; 