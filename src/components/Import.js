import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox, TextField, Button } from '@mui/material';

const Import = (props) => {
    const [inputValue, setInputValue] = useState('');  // Add state for input
    const [selectedItems, setSelectedItems] = useState({});  // Add new state for selected items

    // Add useEffect to call fetchMakes on mount
    useEffect(() => {
        props.fetchMakes();
    }, []); // Empty dependency array means this runs once on mount

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const rows = props.makes;

    const handleCheckboxChange = (event, row) => {
        setSelectedItems(prev => ({
            ...prev,
            [row.MakeId]: event.target.checked
        }));
        console.log('Selected items:', selectedItems);  // For debugging
    };

    const handleCreateWishlist = () => {
        // Get array of selected makes with full details
        const selectedMakes = props.makes
            .filter(make => selectedItems[make.MakeId])
            .map(make => ({
                makeId: make.MakeId,
                makeName: make.MakeName
            }));

        // Create wishlist object
        const wishlist = {
            name: inputValue,
            items: selectedMakes
        };

        console.log('Creating wishlist:', wishlist);  // For debugging
        // TODO: Add API call or props function to save wishlist
    };

    return (
        <>
            <h2>COUNT: {props.makes.length}</h2>

            <TextField
                label="Enter text"
                value={inputValue}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
            />

            <Button 
                variant="contained" 
                onClick={handleCreateWishlist}
                disabled={!inputValue.trim() || !Object.values(selectedItems).some(v => v)}
                sx={{ mt: 2, mb: 2 }}
            >
                Create Wishlist
            </Button>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">ID</TableCell>
                        <TableCell align="right">Make&nbsp;(g)</TableCell>
                        <TableCell align="right">Select&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.MakeId}</TableCell>
                            <TableCell align="right">{row.MakeName}</TableCell>
                            <TableCell align="right">
                                <Checkbox 
                                    checked={!!selectedItems[row.MakeId]}
                                    onChange={(e) => handleCheckboxChange(e, row)}
                                    color="primary"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    );
};

export default Import;
