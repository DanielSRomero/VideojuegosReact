import React from 'react';

const VideoGameDetail = ({ videojuego, onDeleteVideojuego, onHideDetail }) => {
    if (!videojuego) {
        return null;
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/videojuegos/${videojuego.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onDeleteVideojuego(videojuego.id); 
            onHideDetail(); 
        } catch (error) {
            console.error("Error al eliminar videojuego:", error);
        }
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '20px', margin: '20px 0', borderRadius: '5px' }}>
            <h3>{videojuego.nombre}</h3>
            <img src={videojuego.url_imagen} alt={videojuego.nombre} style={{ maxWidth: '200px', float: 'right', margin: '0 0 10px 10px' }} />
            <p><strong>Descripción:</strong> {videojuego.descripcion}</p>
            <p><strong>Fecha de Lanzamiento:</strong> {videojuego.fecha_lanzamiento}</p>
            <p><strong>Compañía:</strong> {videojuego.compañía}</p>
            <p><strong>Plataformas:</strong> {videojuego.plataformas.join(', ')}</p>
            <p><strong>Categorías:</strong> {videojuego.categorias.join(', ')}</p>
            <p><strong>Precio:</strong> ${videojuego.precio}</p>
            <p><strong>Video:</strong> <a href={videojuego.url_video} target="_blank" rel="noopener noreferrer">Ver Video</a></p>
            <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Eliminar Videojuego</button>
            <button onClick={onHideDetail} style={{ marginLeft: '10px', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Ocultar Detalle</button>
        </div>
    );
};

export default VideoGameDetail;