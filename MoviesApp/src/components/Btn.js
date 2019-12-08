import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default Btn = (props) => {
    const { title, children, style, onPress } = props;
    return(
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            {children}
            {title ? <Text style={styles.text}>{title}</Text> : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 50,
        backgroundColor: "lightblue",
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 5,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
})