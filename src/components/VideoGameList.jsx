import React from 'react';

const VideoGameList = ({ videojuegos, onVideojuegoSelect }) => {
    
    return (
        <div>
            <h2>Listado de Videojuegos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {videojuegos.map(videojuego => (
                    <div
                        key={videojuego.id}
                        style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc', cursor: 'pointer' }}
                        onClick={() => onVideojuegoSelect(videojuego)}
                    >
                        <h3>{videojuego.nombre}</h3>
                        <img src={videojuego.url_imagen} alt={videojuego.nombre} style={{ maxWidth: '100%', height: 'auto' }} />
                        <p>Plataformas: {videojuego.plataformas.join(', ')}</p>
                        <p>Precio: ${videojuego.precio}</p>
                        <p>Descripción: {videojuego.descripcion.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoGameList;