import Consts from '../../constants/Consts'

export const SET_LOADING_POPULAR_MOVIES = "SET_LOADING_POPULAR_MOVIES";
export const ADD_POPULAR_MOVIES = "ADD_POPULAR_MOVIES";
export const SET_MESSAGE_POPULAR_MOVIES = "SET_MESSAGE_POPULAR_MOVIES";

export const fetchMovies = () => {
    return (dispatch, getState) => {
        const { isLoading, curPage } = getState().PopularMovies;
        //if already loading
        if(isLoading) {
            return;
        }
        
        //if reached to the api page limit and is not allowed to load any more data
        if(curPage > Consts.API_PAGE_LIMIT) {
            //if isLoading is true setting to false
            isLoading && dispatch({type: SET_LOADING_POPULAR_MOVIES, newState: false})
            return;
        }

        //setting isLoading to true
        dispatch({type: SET_LOADING_POPULAR_MOVIES, newState: true})
                
        //fetching movies from the api
        fetch(Consts.API_POPULAR_ENDPOINT + "&page=" + curPage)
        .then(response => response.json())
        .then(res => {
            //if there's a status message or at least one error
            if(res.status_message || res.errors) {
                //throwing a new error
                throw Error(res.status_message ? res.status_message : res.errors[0]);
            } else {
                //sending the movies to the reducer
                dispatch({type: ADD_POPULAR_MOVIES, moviesToAdd: res.results})
            }
        }).catch((err) => {
            console.log(err);
            //sending the error to the reducer
            dispatch({type: SET_MESSAGE_POPULAR_MOVIES, message: err.message})
        })
    }
}