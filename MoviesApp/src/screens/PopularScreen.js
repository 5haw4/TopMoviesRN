import React, { Component } from 'react'
import { StyleSheet, StatusBar, View } from 'react-native';

//libraries / add-ons
import { connect } from 'react-redux'

//my custom components
import Carousel from '../components/Carousel'
import Movie from '../components/Movie'
import Loader from '../components/Loader'
import MessageBubble from '../components/MessageBubble'

//constants and actions
import { fetchMovies } from '../store/actions/PopularMoviesActions'
import Consts from '../constants/Consts'


class PopularScreen extends Component {

    componentDidMount() {
        this.props.fetchMovies(); //fetching movies
    }

    render() {
        const { isLoading, message, movies, curPage } = this.props.PopularMovies;

        //constructing the array of JSX components that will be held inside the carousel
        var carouselData = 
            movies ? movies.map(movie =>
                <Movie
                    key={movie.id}
                    data={movie}
                    navigation={this.props.navigation}
                />
            ) : [];

        /*
            shows a loader page at the end of the carousel if already loading more movies, 
            or if still can load more movies (meaning that it hasn't reached the api page limit)
        */
        const loader = (isLoading || curPage <= Consts.API_PAGE_LIMIT ? <Loader key="loader" /> : null);
        loader && carouselData.push(loader);
        
        //shows an error message in case there's an error and isn't trying to load data already
        const errorMessage = (
            (!isLoading && message && message.isError) ? <MessageBubble key="message" title={message.messageContent}
            subTitle={message.subMessage} centerVertically={true}
            onPress={() => {this.fetchMovies()}} btnTitle="Try Again" />
            : null
        );
        errorMessage && carouselData.push(errorMessage);

        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <Carousel
                    onEndReached={() => { this.props.fetchMovies() }}
                >
                    {carouselData}
                </Carousel>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'darkgrey',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
const mapStateToProps = (state) => {
    return {
        PopularMovies: state.PopularMovies
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovies: () => dispatch(fetchMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularScreen);