import React from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window")

export default Loader = () => {
    return (<ActivityIndicator style={{width, height}} color="white" size="large" />)
}
