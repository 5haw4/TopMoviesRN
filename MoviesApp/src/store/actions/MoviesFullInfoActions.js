import Consts from '../../constants/Consts'

export const SET_LOADING_MOVIE = "SET_LOADING_MOVIE";
export const ADD_MOVIE = "ADD_MOVIE";
export const SET_MESSAGE_MOVIE = "SET_MESSAGE_MOVIE";

export const fetchMovieData = (movieId) => {
    return (dispatch, getState) => {
        const { movies } = getState().MoviesFullInfo;
        const curMovie = movies[movieId];
        
        //if the movie already been loaded -> return
        if(curMovie && !curMovie.isLoading && curMovie.message && !curMovie.message.isError) return;
        
        //set isLoading to true
        dispatch({type: SET_LOADING_MOVIE, movieId, newState: true})

        //fetch the movie's full data from the api
        fetch(Consts.API_BASE_URL + movieId +  "?api_key=" + Consts.API_KEY)
        .then(response => response.json())
        .then(res => {
            //if there's a status message or at least one error
            if(res.status_message || res.errors) {
                //throwing a new error
                throw Error(res.status_message ? res.status_message : res.errors[0]);
            } else {
                //sending the movie info to the reducer
                dispatch({type: ADD_MOVIE, movieId, movie: res})
            }
        }).catch((err) => {
            console.log(err);
            //sending the error to the reducer
            dispatch({type: SET_MESSAGE_MOVIE, movieId, message: err.message})
        })
    }
}