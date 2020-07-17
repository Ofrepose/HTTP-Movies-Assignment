import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';


export const DeleteMovie = props =>{
    const params = useParams();

    const [messageHandler, setMessageHandler] = useState({
        delSuccessMessage:'',
        delErrorMessage:'',
    })
    const history = useHistory();

    const[movie, setMovie] = useState({
        id:0,
        title:'',
        director:'',
        metascore:0,
        stars:['',''],
    });

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setMovie(res.data);
                console.log(res.data)
            })
            .catch((err) => console.log(err.response));
    };

    useEffect(()=>{
        fetchMovie(params.id);

    },[params.id])

    const asker = (x) =>{
        x === 'yes'?

            (axios
                .delete(`http://localhost:5000/api/movies/${movie.id}`)
                .then(response=>{
                    setMessageHandler({
                        delSuccessMessage: response.data.successMessage,
                        delErrorMessage: ''
                    })
                    props.getMovieList();
                })
                .catch(err=>{
                    setMessageHandler({
                        delSuccessMessage: '',
                        delErrorMessage: err.response.data.Error
                    })
                }))
         : history.push('/');
        history.push('/');

    }



    return(
        <>

            <h1>Are you sure?
            <button onClick={()=>asker('yes')}>yes</button>
                <button onClick={()=>asker('no')}>no</button>

            </h1>


        </>
    )


}

export default DeleteMovie;