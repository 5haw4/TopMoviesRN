import { SET_LOADING_POPULAR_MOVIES, ADD_POPULAR_MOVIES, 
    SET_MESSAGE_POPULAR_MOVIES } from '../actions/PopularMoviesActions'

const initialState = {
    isLoading: false,
    message: {
        isError: false,
        messageContent: "",
        subMessage: "",
    },
    curPage: 1,
    movies: []
}

const popularMoviesReducer = (state = initialState, action) => {
    switch(action.type) {

        //setting isLoading
        case SET_LOADING_POPULAR_MOVIES:
            return {
                ...state,
                isLoading: action.newState,
            }

        //adding the newly fetched movie list to the cached one
        case ADD_POPULAR_MOVIES: 
            return {
                ...state,
                isLoading: false,
                message: {
                    isError: false,
                    messageContent: "",
                    subMessage: "",
                },
                curPage: state.curPage + 1,
                movies: state.movies.concat(action.moviesToAdd)
            }

        //setting an error message
        case SET_MESSAGE_POPULAR_MOVIES: 
            return {
                ...state,
                isLoading: false,
                message: {
                    isError: true,
                    messageContent: "An Error Occurred",
                    subMessage: action.message,
                }    
            }
        default:
            return state;
    }
}

export default popularMoviesReducer;