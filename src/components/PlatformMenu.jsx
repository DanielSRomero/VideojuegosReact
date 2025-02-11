import React, { useState, useEffect } from 'react';

const PlatformMenu = ({ onPlatformChange }) => {
    const [plataformas, setPlataformas] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/plataformas')
            .then(response => {
                console.log("Fetch Response:", response);
                if (!response.ok) {
                    console.error("HTTP error!", response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetch Data:", data);
                setPlataformas(data);
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
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