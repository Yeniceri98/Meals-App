import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'


const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealHeader, ...styles.mealRow }}>    
                        <ImageBackground 
                            source={{ uri: props.image }}
                            style={styles.bgImage}
                        >
                            <Text style={styles.title}>{props.title}</Text> 
                        </ImageBackground>    
                    </View>
                    <View style={{ ...styles.mealContent, ...styles.mealRow }}>
                        <Text style={styles.text}>{props.duration}m</Text>
                        <Text style={styles.text}>{props.complexity.toUpperCase()}</Text>
                        <Text style={styles.text}>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MealItem

const styles = StyleSheet.create({
    mealItem: {
        height: 250,
        width: "100%",
        backgroundColor: "#b0c4de",
        borderRadius: 20,
        overflow: "hidden",
        marginVertical: 15
    },
    mealRow: {
        flexDirection: "row"
    },
    mealHeader: {
        height: "85%"
    },
    mealContent: {
        height: "15%",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    bgImage: {
        width: "100%",
        height: "100%"
    },
    title: {
        fontFamily: "OpenSans-Bold",
        fontSize: 18,
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingVertical: 5,
        paddingHorizontal: 10,
        textAlign: "center"
    },
    text: {
        fontFamily: "OpenSans-Bold"
    }
})
