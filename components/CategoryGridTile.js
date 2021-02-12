import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'


const CategoryGridTile = (props) => {
    return (
        <TouchableOpacity style={styles.gridItem} onPress={props.onSelect} activeOpacity={0.5}>
            <View
                style={{ ...styles.container, ...{ backgroundColor: props.color }}}
            >
                <Text style={styles.title}>{props.title}</Text>     
            </View>
        </TouchableOpacity>
    )
}

export default CategoryGridTile

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 200,
    },
    container: {
        flex: 1,
        borderRadius: 15,
        elevation: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: "black",
        fontFamily: "OpenSans-Bold",
        fontSize: 18
    }
})
