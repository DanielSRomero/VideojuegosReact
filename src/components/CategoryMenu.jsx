import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CategoryMenu = ({ onCategoriasChange }) => {

    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');

    const getCategorias = async () => {
        const response = await api("categorias")
        setCategorias(response)
    }

    useEffect(() => {
            getCategorias();
        }, 
        []);

    const handleCategoriaSelectChange = (event) => {
        const categoriaSeleccionada = event.target.value;
        setSelectedCategoria(categoriaSeleccionada);
        onCategoriasChange(categoriaSeleccionada ? [categoriaSeleccionada] : []);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '20px 0' }}>
            <select
                value={selectedCategoria}
                onChange={handleCategoriaSelectChange}
            >
                <option value="">Selecciona una categoría</option> {}
                {categorias.map(categoria => (
                    <option key={categoria.nombre} value={categoria.nombre}>
                        {categoria.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryMenu;