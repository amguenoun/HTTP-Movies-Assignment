import React, { useState, useEffect } from 'react'
import axios from 'axios';

const UpdateForm = (props) => {
    const [movie, setMovie] = useState({ title: '', director: '', metascore: '', stars: [] });
    const [star, setStar] = useState('');
    const id = props.match.params.id;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response))
    }, [id])

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStar = e => {
        setStar(e.target.value)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => props.handleListUpdate())
        props.history.push(`/movies/${id}`);
    }

    const handleStarsSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMovie({
            ...movie,
            stars: [...movie.stars, star]
        });
        setStar('');
    }

    return (
        <div>
            <form onSubmit={handleEditSubmit}>
                <input name='title' placeholder='title' value={movie.title} onChange={handleChange} />
                <input name='director' placeholder='director' value={movie.director} onChange={handleChange} />
                <input name='metascore' placeholder='metascore' value={movie.metascore} onChange={handleChange} />
                <form onSubmit={handleStarsSubmit}>
                    {movie.stars.map(person => <p key={Math.random()}>{person}</p>)}
                    <input name='add-actor' placeholder='Add Star' value={star} onChange={handleStar} />
                    <button>Add Star</button>
                </form>
                <button>Finish Edit</button>
            </form>
        </div>
    )
}

export default UpdateForm;