import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Platform, SafeAreaView } from 'react-native'

import Card from './Card'
import Btn from './Btn'

import Consts from '../constants/Consts'

const { width, height } = Dimensions.get("window");

export default class Movie extends Component {

    openNextScreen(){
        const movie = this.props.data;
        this.props.navigation.navigate("Movie", {
            movieId: movie.id,
            movieTitle: movie.title,
            moviePoster: movie.poster_path
        })
    }

    render() {
        const movie = this.props.data;
        return (
            <View>
                <Image blurRadius={Platform.OS === "android" ? 10 : 15} style={styles.backgroundPoster} source={{uri: Consts.IMAGE_BASE_URL + movie.poster_path}}/>
                <SafeAreaView>
                    <View style={styles.container}>
                        <View style={styles.posterHolder}>
                            <Image style={styles.poster} resizeMode={"contain"} source={{uri: Consts.IMAGE_BASE_URL + movie.poster_path}}/>
                        </View>
                        <Card isRound={true} style={styles.card}>
                            <Text numberOfLines={2} style={styles.title}>{movie.title}</Text>
                            <Text numberOfLines={5} style={styles.desc}>{movie.overview}</Text>
                            <Btn onPress={() => { this.openNextScreen() }} style={styles.btnStyle} title="Read More"/>
                        </Card>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignContent: "center",
        paddingTop: 50,
    },
    backgroundPoster: {
        position: "absolute",
        width,
        height,
    },
    card: {
        alignSelf: "center",
        padding: 15,
    },
    posterHolder: {
        height: 250,
    },
    poster: {
        flex: 1,
        width: null,
        height: null,
    },
    title: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "800",
    },
    desc: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    },
    btnStyle: {
        marginTop: 15,
    },
})