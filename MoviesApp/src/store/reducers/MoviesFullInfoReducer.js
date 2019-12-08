import { SET_LOADING_MOVIE, ADD_MOVIE, SET_MESSAGE_MOVIE } from '../actions/MoviesFullInfoActions'

const initialState = {
    movies: {
        /*
            ### Sample object:
            <MOVIE-ID>: {
                isLoading: true,
                message: {
                    isError: false,
                    messageContent: "",
                    subMessage: "",
                },
                movie: {
                    //actual movie info
                }
            },
        */
    }
}

const popularMoviesReducer = (state = initialState, action) => {
    switch(action.type) {

        //setting isLoading
        case SET_LOADING_MOVIE:
            return {
                movies: {
                    ...state.movies,
                    [action.movieId]: {
                        ...state.movies[action.movieId],
                        isLoading: action.newState,
                    }
                }
            }

        //adding the movie to the movies object with its movieId as its id
        case ADD_MOVIE: 
            return {
                movies: {
                    ...state.movies,
                    [action.movieId]: {
                        ...state.movies[action.movieId],
                        isLoading: false,
                        message: {
                            isError: false,
                            messageContent: "",
                            subMessage: "",
                        },
                        movie: action.movie
                    }
                }
            }

        //setting an error message
        case SET_MESSAGE_MOVIE: 
            return {
                movies: {
                    ...state.movies,
                    [action.movieId]: {
                        ...state.movies[action.movieId],
                        isLoading: false,
                        message: {
                            isError: true,
                            messageContent: "An Error Occurred",
                            subMessage: action.message,
                        },
                    }
                }
            }
        default:
            return state;
    }
}

export default popularMoviesReducer;