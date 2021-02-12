import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import MealItem from './MealItem';


const MealList = (props) => {
    const renderMealItem = itemData => {
        return (
            <MealItem 
                onSelectMeal={() => {
                    props.navigation.navigate({ routeName: "MealDetails", params: {      // Yemeklerden birine basınca "MealDetails" sayfasına geçecek. Veri geçişi için de "params" kullanıyoruz
                        mealID: itemData.item.id
                    } })
                }}
                title={itemData.item.title} 
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageURL}
            />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealItem}
                style={{ width: "100%", padding: 10 }}
            />
        </View>
    )
}

export default MealList

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})
