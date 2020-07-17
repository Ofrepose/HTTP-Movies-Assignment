import React,{useState, useEffect} from 'react';
import axios from "axios";
import {useParams, useHistory, Redirect} from "react-router-dom";


const MovieEditForm = props =>{
    const history = useHistory();
    const params = useParams();

    const [messageHandler, setMessageHandler] = useState({
        putSuccessMessage:'',
        putErrorMessage:'',
    })

    const[movie, setMovie] = useState({
        id:0,
        title:'',
        director:'',
        metascore:0,
        stars:['',''],
    });

    const [value, setValue] = useState({
        id:0,
        title:'',
        director:'',
        metascore:0,
        stars:[],
    })

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setMovie(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err.response));
    };

    const handleChange = e =>{
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) =>{

        e.preventDefault();
        console.log(movie)
        editMovie(movie);
        history.push('/');

    }

    const editMovie = movie =>{
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(response=>{
                setMessageHandler({
                    putSuccessMessage: response.data.successMessage,
                    putErrorMessage: ''
                })
                props.getMovieList();
            })
            .catch(err=>{
                setMessageHandler({
                    putSuccessMessage: '',
                    putErrorMessage: err.response.data.Error
                })
            })
    }

    const gimme = (e) =>{
        e.preventDefault();
        console.log(movie);
    }

    useEffect(()=>{
        fetchMovie(params.id);
    },[params.id]);

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder={movie.title}
                name='title'
                value={movie.title}
                onChange={handleChange}
            />
            <input
                type='text'
                placeholder={movie.director}
                name='director'
                value={movie.director}
                onChange={handleChange}
            />
            <input
                type='number'
                placeholder={movie.metascore}
                name='metascore'
                value={movie.metascore}
                onChange={handleChange}
            />

            {movie.stars.map(item=>{
                return(
                    <input
                        type='text'
                        placeholder={item}
                        name={`movie.stars[${item}]`}
                        value={movie.stars[item]}
                        onChange={handleChange}
                    />
                )
            })}


            <button>submit</button>




        </form>


    <button onClick={gimme}>gimme</button>
        </>
    )
}

export default MovieEditForm;