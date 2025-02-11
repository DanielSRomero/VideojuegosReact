import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PlatformMenu = ({ onPlatformChange }) => {
    const [plataformas, setPlataformas] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    const getPlataformas = async () => {
        const response = await api("plataformas")
        setPlataformas(response)
    }

    useEffect(() => {
        getPlataformas();
        }, []);

    const handlePlatformCheckboxChange = (plataforma) => {
        let updatedPlatforms;
        if (selectedPlatforms.includes(plataforma)) {
            updatedPlatforms = selectedPlatforms.filter(plat => plat !== plataforma);
        } else {
            updatedPlatforms = [...selectedPlatforms, plataforma];
        }
        setSelectedPlatforms(updatedPlatforms);
        onPlatformChange(updatedPlatforms); // Notificar al padre plataformas seleccionadas
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {plataformas.map(plataforma => (
                <div key={plataforma.nombre} style={{ margin: '0 10px' }}>
                    <label>
                        <input
                            type="checkbox"
                            value={plataforma.nombre}
                            checked={selectedPlatforms.includes(plataforma.nombre)}
                            onChange={() => handlePlatformCheckboxChange(plataforma.nombre)}
                        />
                        {plataforma.nombre}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default PlatformMenu;