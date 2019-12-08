import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default Tag = (props) => {
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        backgroundColor: "lightgreen",
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        margin: 2.5,
    },
    text: {
        fontWeight: "bold",
    }
})