import React, { useState } from 'react';

const SearchBox = ({ onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearchChange(event.target.value);
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <input
                type="text"
                placeholder="Buscar videojuego..."
                value={searchTerm}
                onChange={handleSearchInputChange}
                style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
        </div>
    );
};

export default SearchBox;