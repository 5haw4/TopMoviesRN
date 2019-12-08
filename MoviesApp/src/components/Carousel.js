import React from 'react'
import { FlatList } from 'react-native'

export default Carousel = (props) => {

    _renderItem = ({item, index}) => {
        return item;
    }

    const { onEndReached } = props;
    const items = props.children;

    return (
        <FlatList 
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => ("key-" + index)}
            data={items}
            renderItem={this._renderItem}
            onEndReached={onEndReached}
        />
    )
    
}
