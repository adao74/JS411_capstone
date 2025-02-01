import React, { useState, useEffect } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Collapse,
    Box
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const Home = () => {
    const [wishlists, setWishlists] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    const fetchWishlists = async () => {
        try {
            const response = await fetch('/api/wishlists');
            if (!response.ok) {
                throw new Error('Failed to fetch wishlists');
            }
            const data = await response.json();
            setWishlists(data);
        } catch (error) {
            console.error('Error fetching wishlists:', error);
        }
    };

    useEffect(() => {
        fetchWishlists();
    }, []);

    const handleDelete = async (id) => {
        try {
            console.log('Deleting wishlist:', id); // Debug log
            const url = `/api/wishlists/${id}`;
            console.log('Delete URL:', url); // Add this log
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.headers.get('content-type')?.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to delete wishlist');
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('Delete successful:', data);
            fetchWishlists(); // Refresh the list
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete wishlist: ' + error.message);
        }
    };

    const handleToggleDetails = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <Container maxWidth="lg" className="car-container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {wishlists.map((wishlist) => (
                        <React.Fragment key={wishlist.id}>
                            <TableRow>
                                <TableCell>{wishlist.id}</TableCell>
                                <TableCell>{wishlist.name}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        onClick={() => handleToggleDetails(wishlist.id)}
                                    >
                                        {expandedId === wishlist.id ? 'Hide Details' : 'Show Details'}
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <DeleteIcon
                                        onClick={() => handleDelete(wishlist.id)}
                                        className="icon text-red"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                    <Collapse in={expandedId === wishlist.id} timeout="auto" unmountOnExit>
                                        <Box margin={1}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Item ID</TableCell>
                                                        <TableCell>Make ID</TableCell>
                                                        <TableCell>Make Name</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {wishlist.items && wishlist.items.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                            <TableCell>{item.make_id}</TableCell>
                                                            <TableCell>{item.make_name}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}

export default Home