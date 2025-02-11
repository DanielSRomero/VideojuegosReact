import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CategoryMenu = ({ onCategoryChange }) => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const getCategorias = async () => {
        const response = await api("categorias")
        setCategorias(response)
    }

    useEffect(() => {
            getCategorias();
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