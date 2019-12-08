import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import PopularScreen from '../screens/PopularScreen'
import MovieScreen from '../screens/MovieScreen'

const navigationOptions = {
    gesturesEnabled: true, //enables the back gesture on Android (iOS is true by default) 
    gestureResponseDistance: { //to be able to start the back gesture from anywhere on the screen
        horizontal: 500,
        vertical: 500,
    },
    headerShown: false, //hiding the header
}
const MainNavigator = createStackNavigator(
    {
        Popular: {
            screen: PopularScreen,
            navigationOptions
        },
        Movie: {
            screen: MovieScreen,
            navigationOptions
        }
    },
    {
        initialRouteName: "Popular"
    }
);


export default createAppContainer(MainNavigator);