import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PlatformMenu = ({ onPlataformasChange }) => {
    const [plataformas, setPlataformas] = useState([]);
    const [selectedPlataformas, setSelectedPlataformas] = useState([]);

    const getPlataformas = async () => {
        try {
            const response = await api.get("http://localhost:3000/plataformas");
            setPlataformas(response.data);
        } catch (error) {
            console.error("Error al obtener las plataformas:", error);
        }
    }

    useEffect(() => {
        getPlataformas();
        }, []);

    const handlePlataformasCheckboxChange = (plataforma) => {
        let updatedPlataformas;
        if (selectedPlataformas.includes(plataforma)) {
            updatedPlataformas = selectedPlataformas.filter(plat => plat !== plataforma);
        } else {
            updatedPlataformas = [...selectedPlataformas, plataforma];
        }
        setSelectedPlataformas(updatedPlataformas);
        onPlataformasChange(updatedPlataformas);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '20px 0' }}>
            {plataformas.map(plataforma => (
                <div key={plataforma.nombre} style={{ margin: '0 10px' }}>
                    <label>
                        <input
                            type="checkbox"
                            value={plataforma.nombre}
                            checked={selectedPlataformas.includes(plataforma.nombre)}
                            onChange={() => handlePlataformasCheckboxChange(plataforma.nombre)}
                        />
                        {plataforma.nombre}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default PlatformMenu;