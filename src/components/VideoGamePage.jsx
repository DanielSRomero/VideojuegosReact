import VideoGameList from './VideoGameList';
import CategoryMenu from './CategoryMenu';
import PlatformMenu from './PlatformMenu';
import SearchBox from './SearchBox';
import VideoGameDetail from './VideoGameDetail';
import api from '../services/api';
import React, { useState, useEffect } from 'react';
import { AuthContext, TOKEN_KEY} from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VideoGamePage = () => {
    const navigate = useNavigate();
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
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await fetch('http://localhost:3000/videojuegos', {
            headers: {'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            navigate("/")
        } else {
            const data = await response.json();      
            setVideojuegos(data)
        }
    }

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
        <div>
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
        </div>
    )
}
export default VideoGamePage