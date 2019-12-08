import React, { Component } from 'react'
import { View, TouchableOpacity, Platform, StatusBar, ScrollView, Image, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'

//libraries / add-ons
import { connect } from 'react-redux'
import { Feather, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

//my custom components
import MessageBubble from '../components/MessageBubble'
import Tag from '../components/Tag'
import Loader from '../components/Loader'

//constants and actions
import { fetchMovieData } from '../store/actions/MoviesFullInfoActions'
import Consts from '../constants/Consts'

const { width, height } = Dimensions.get("window")

class MovieScreen extends Component {

    componentDidMount(){
        //fetching the full info of the movie (from the action) by its id that got passed through the react-navigation param
        const movieId = this.props.navigation.getParam("movieId");
        this.props.fetchMovieData(movieId);
    }

    render() {
        const movieId = this.props.navigation.getParam("movieId");        
        const curMovie = this.props.MoviesFullInfo.movies[movieId];        
        const { isLoading = true, message = false, movie = false } = curMovie ? curMovie : {};
        
        //getting the poster url via the params so there'd be a background poster even if the movie is still laoding
        const moviePoster = this.props.navigation.getParam("moviePoster"); 

        //showing loader if currently loading content
        const loader = (isLoading && <Loader />);
        
        //setting error messages if there are any
        const errorMessage = (!isLoading && message && message.isError && <MessageBubble title={message.messageContent}
            subTitle={message.subMessage}
            onPress={() => {this.fetchMovie(movieId)}} btnTitle="Try Again" />);

        //constructing the UI of the movie, if its data finished loading
        const movieUI = (
            Object.keys(movie).length ?
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollViewContainer}>
                        <View style={styles.topScrollViewHolder}>
                            <View style={styles.posterHolder}>
                                <Image style={styles.poster} 
                                        resizeMode={"contain"} 
                                        source={{uri: Consts.IMAGE_BASE_URL + movie.poster_path}}/>
                            </View>
                            <View style={styles.subTitlesContainer}>
                                <Text style={styles.title}>{movie.title}</Text>
                                <View>
                                    <View style={styles.subTitleHolder}>
                                        <Feather style={styles.subTitleIcon} name="star" size={16} />
                                        <Text style={styles.subTitle}>{movie.vote_average}</Text>
                                        <Text style={styles.subTitle}>  •  {movie.vote_count} Votes</Text>
                                    </View>
                                    <View style={styles.subTitleHolder}>
                                        <Feather style={styles.subTitleIcon} name="calendar" size={16} />
                                        <Text style={styles.subTitle}>{movie.release_date}</Text>
                                    </View>
                                    <View style={styles.subTitleHolder}>
                                        <Feather style={styles.subTitleIcon} name="clock" size={16} />
                                        <Text style={styles.subTitle}>{movie.runtime} Minutes</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.tagsHolder}>
                            {movie.genres.map(genre => <Tag key={genre.id}>{genre.name}</Tag>)}
                            {movie.production_companies.map(production_company => 
                                <Tag key={production_company.id}>{production_company.name}</Tag>
                                )
                            }
                        </View>
                        <Text style={styles.desc}>{movie.overview}</Text>
                    </View>
                </ScrollView>
            : null);

        return (
            <SafeAreaView>
                <StatusBar hidden={false} barStyle="light-content" />

                {/* Setting a blurred background image */}
                <Image blurRadius={Platform.OS === "android" ? 10 : 15} 
                    style={styles.backgroundPoster} 
                    source={{uri: Consts.IMAGE_BASE_URL + moviePoster}}/>

                
                {/* Setting a dark colored gradient background */}
                <LinearGradient 
                    style={styles.backgroundPoster}
                    colors={['#000000', '#00000080', '#00000080', '#00000080']}
                />

                {/* Setting a back button at the top left side of the screen */}
                <TouchableOpacity style={styles.backBtn} onPress={() => {this.props.navigation.goBack()}}>
                    <Ionicons name="md-arrow-round-back" color="white" size={45} />
                </TouchableOpacity>

                {loader}
                {errorMessage}
                {movieUI}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "darkgrey",
        alignItems: "center",
        justifyContent: "center"
    },
    backgroundPoster: {
        position: "absolute",
        width,
        height,
    },
    backBtn: {
        position:"absolute", 
        zIndex: 1,
        start: 25,
        top: 40,
    },
    scrollView: {
        height: "100%",
    },
    scrollViewContainer: {
        paddingTop: 100,
    },
    topScrollViewHolder: {flexDirection: "row"},
    posterHolder: {
        height: 175,
        width: 175,
    },
    poster: {
        flex: 1,
        width: null,
        height: null,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        marginBottom: 10,
        color: "white",
    },
    subTitlesContainer: {flex: 1},
    subTitleHolder: {flexDirection: "row", alignItems:"center"},
    subTitle: {
        fontWeight: "bold",
        marginVertical: 5,
        fontSize: 16,
        color: "white",
    },
    subTitleIcon: {color:"white", marginEnd: 5, marginBottom: 1.5},
    tagsHolder: {flexDirection: "row", width, flexWrap: "wrap", justifyContent: "center", marginVertical: 15,},
    desc: {
        fontSize: 18,
        fontWeight: "600",
        paddingHorizontal: Platform === "android" ? 15 : 20,
        paddingBottom: 25,
        color: "white",
    },
})

const mapStateToProps = (state) => {
    return {
        MoviesFullInfo: state.MoviesFullInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchMovieData: (movieId) => dispatch(fetchMovieData(movieId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen);