import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import PopularMoviesReducer from './PopularMoviesReducer'
import MoviesFullInfoReducer from './MoviesFullInfoReducer'

const rootReducer = combineReducers({
    PopularMovies: PopularMoviesReducer,
    MoviesFullInfo: MoviesFullInfoReducer,
})

export default createStore(rootReducer, applyMiddleware(ReduxThunk));