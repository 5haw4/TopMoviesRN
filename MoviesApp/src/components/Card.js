import React from 'react'
import { View, StyleSheet, Platform, Dimensions } from 'react-native'

const { width } = Dimensions.get("window");

export default Card = (props) => {
    const { isRound = false } = props;

    const extraStyles = props.style;
    const innerExtraStyles = props.innerStyle;
        
    return (
        <View style={[styles.container, isRound ? {borderRadius: 15} : {}, extraStyles]}>
            <View style={[styles.mainContent, isRound ? {borderRadius: 15} : {}, innerExtraStyles]}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        elevation: 15,
        backgroundColor: "#FEFEFE",
        overflow: Platform.OS === "android" && Platform.Version >= 21 ? "hidden" : "visible",
        marginTop: 20,
        marginBottom: 30,
        shadowColor: "black",
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.25,
        maxWidth: width * .9,
    },
    mainContent: {
        backgroundColor: "#FEFEFE",
        overflow: Platform.OS === "android" ? "visible" : "hidden",
        alignItems: "center",
    },
})