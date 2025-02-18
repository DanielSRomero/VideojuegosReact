import React, { useState, useEffect } from 'react';
import VideoGameList from './components/VideoGameList';
import CategoryMenu from './components/CategoryMenu';
import PlatformMenu from './components/PlatformMenu';
import SearchBox from './components/SearchBox';
import VideoGameDetail from './components/VideoGameDetail';
import api from './services/api';


function App() {
    const [videojuegos, setVideojuegos] = useState([]);
    const [filteredVideojuegos, setFilteredVideojuegos] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVideojuego, setSelectedVideojuego] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        fetchVideojuegos();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [videojuegos, selectedCategories, selectedPlatforms, searchTerm]);


    const fetchVideojuegos = async () => {
      const response = await api("videojuegos")
      setVideojuegos(response)
    };

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };

    const handlePlatformChange = (platforms) => {
        setSelectedPlatforms(platforms);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    const applyFilters = () => {
        let filtered = [...videojuegos];

        if (selectedCategories.length > 0 && selectedCategories.length < getCategories().length) {
            filtered = filtered.filter(videojuego =>
                videojuego.categorias.some(categoria => selectedCategories.includes(categoria))
            );
        }

        if (selectedPlatforms.length > 0 && selectedPlatforms.length < getPlatforms().length) {
            filtered = filtered.filter(videojuego =>
                videojuego.plataformas.some(plataforma => selectedPlatforms.includes(plataforma))
            );
        }


        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(videojuego =>
                videojuego.nombre.toLowerCase().includes(lowerSearchTerm) ||
                videojuego.descripcion.toLowerCase().includes(lowerSearchTerm)
            );
        }

        setFilteredVideojuegos(filtered);
    };


    const handleVideojuegoSelect = (videojuego) => {
        setSelectedVideojuego(videojuego);
        setShowDetail(true);
    };

    const handleHideDetail = () => {
        setShowDetail(false); 
    };

    const handleVideojuegoDelete = (deletedVideojuegoId) => {
        const updatedVideojuegos = videojuegos.filter(vg => vg.id !== deletedVideojuegoId);
        setVideojuegos(updatedVideojuegos);
        setFilteredVideojuegos(updatedVideojuegos); 
        setSelectedVideojuego(null);
        setShowDetail(false); 
    };

    const getCategories = () => {
        return Array.from(new Set(videojuegos.flatMap(vg => vg.categorias)));
    };

    const getPlatforms = () => { 
        return Array.from(new Set(videojuegos.flatMap(vg => vg.plataformas)));
    };


    return (
        <>
            <h1>Aplicación de Videojuegos</h1>

            <CategoryMenu onCategoriasChange={handleCategoryChange} />
            <PlatformMenu onPlataformasChange={handlePlatformChange} />
            <SearchBox onSearchChange={handleSearchChange} />

            <VideoGameList videojuegos={filteredVideojuegos} onVideojuegoSelect={handleVideojuegoSelect} />
            
            {showDetail && (
                <VideoGameDetail
                    videojuego={selectedVideojuego}
                    onDeleteVideojuego={handleVideojuegoDelete}
                    onHideDetail={handleHideDetail}
                />
            )}
        </>
    );
}

export default App;