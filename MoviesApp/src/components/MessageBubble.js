import React from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

import Card from './Card'
import Btn from './Btn'

const { width } = Dimensions.get("window")

export default MessageBubble = (props) => {

    const { title, subTitle, onPress, btnTitle, centerVertically = false } = props;

    return (
        <View style={[styles.container, centerVertically ? { justifyContent: "center" } : {}]}>
            <Card isRound={true} style={styles.card}>
                <Text style={styles.title}>{title}</Text>
                {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
                {onPress && btnTitle ? <Btn style={styles.btn} onPress={onPress} title={btnTitle} /> : null}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: width,
        alignItems: "center",
    },
    card: {
        width: width * .75,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15,
    },
    subTitle: {
        fontSize: 16,
        width: "80%",
        marginBottom: 15,
    },
    btn: {
        marginBottom: 15,
    }
})