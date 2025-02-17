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
        <div style={{
            position: 'fixed', /* Posición fixed para que se superponga */
            top: 0,
            left: 0,
            width: '100vw', /* Ancho completo de la ventana */
            height: '100vh', /* Alto completo de la ventana */
            backgroundColor: 'rgba(0, 0, 0, 0.5)', /* Fondo semitransparente para el efecto de superposición */
            display: 'flex', /* Flexbox para centrar el contenido */
            justifyContent: 'center', /* Centrar horizontalmente */
            alignItems: 'center', /* Centrar verticalmente */
            zIndex: 1000 /* Asegura que esté por encima de todo el contenido */
        }}>
            <div style={{ /* Contenedor interno con el estilo original, y fondo blanco para que resalte */
                border: '1px solid #ddd',
                padding: '20px',
                margin: 0, /* Elimina el margin para que se centre correctamente en el fixed */
                borderRadius: '5px',
                backgroundColor: 'white', /* Añade un fondo blanco para que el contenido resalte sobre el overlay */
                maxWidth: '80%', /* Opcional: Ancho máximo para el contenedor interno */
                maxHeight: '80%', /* Opcional: Altura máxima para el contenedor interno */
                overflow: 'auto' /* Opcional: Añade scroll si el contenido excede el tamaño máximo */
            }}>
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
        </div>
    );
};

export default VideoGameDetail;