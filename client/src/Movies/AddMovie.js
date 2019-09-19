import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMovie = (props) => {
    const [newMovie, setNewMovie] = useState({ title: '', director: '', metascore: '', stars: [] })
    const [star, setStar] = useState('');

    const handleChange = (e) => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleStar = e => {
        setStar(e.target.value)
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, newMovie)
        .then(res => props.handleListUpdate())
        .then(res => props.history.push(`/`))

    }

    const handleStarsSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setNewMovie({
            ...newMovie,
            stars: [...newMovie.stars, star]
        });
        setStar('');
    }

    return (
        <form onSubmit={handlePostSubmit}>
            <input name='title' placeholder='title' value={newMovie.title} onChange={handleChange} />
            <input name='director' placeholder='director' value={newMovie.director} onChange={handleChange} />
            <input name='metascore' placeholder='metascore' value={newMovie.metascore} onChange={handleChange} />
            <form onSubmit={handleStarsSubmit}>
                {newMovie.stars.map(person => <p key={Math.random()}>{person}</p>)}
                <input name='add-actor' placeholder='Add Star' value={star} onChange={handleStar} />
                <button>Add Star</button>
            </form>
            <button>Finish Edit</button>
        </form>
    )
}

export default AddMovie;