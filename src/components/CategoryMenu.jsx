import React, { useState, useEffect } from 'react';

const CategoryMenu = ({ onCategoryChange }) => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
            fetch('http://localhost:3001/categorias')
                .then(response => {
                    console.log("Fetch Response:", response);
                    if (!response.ok) {
                        console.error("HTTP error!", response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Fetch Data:", data);
                    setCategorias(data);
                })
                .catch(error => {
                    console.error("Fetch Error:", error);
                });
        }, []);

    const handleCategoryCheckboxChange = (categoria) => {
        let updatedCategories;
        if (selectedCategories.includes(categoria)) {
            updatedCategories = selectedCategories.filter(cat => cat !== categoria);
        } else {
            updatedCategories = [...selectedCategories, categoria];
        }
        setSelectedCategories(updatedCategories);
        onCategoryChange(updatedCategories);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {categorias.map(categoria => (
                <div key={categoria.nombre} style={{ margin: '0 10px' }}>  
                    <label>
                        <input
                            type="checkbox"
                            value={categoria.nombre}
                            checked={selectedCategories.includes(categoria.nombre)}
                            onChange={() => handleCategoryCheckboxChange(categoria.nombre)}
                        />
                        {categoria.nombre} 
                    </label>
                </div>
            ))}
        </div>
    );
};

export default CategoryMenu;