import React from 'react'
import MealList from '../components/MealList';
import { View, Text, StyleSheet } from 'react-native';
// import { MEALS } from '../data/dummy-data';      Redux eklendikten sonra yorum satırına aldık
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; 
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from 'react-redux';


const FavoriteMealsScreen = (props) => {
    // const favMeals = MEALS.filter(meal => meal.id === "m1" || meal.id === "m2")      // Dummy data (m1 ve m2 kategorileri yazdırıyor. Örnek olabilmesi açısından eklendi)
    // "favMeals" kısmını yorum satırına alıp Redux kullanarak değiştirdik


    // Redux:
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <Text>No favorite meals found!</Text>
            </View>
        )
    }


    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}


FavoriteMealsScreen.navigationOptions = navData => {
    return {
        headerTitle: "Favorite Meals",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Ionicons name="menu" size={24} color="white" onPress={() => {
                    navData.navigation.toggleDrawer();      // Drawer navigator açılır
                }} />
            </HeaderButtons>
        )   
    }
}


export default FavoriteMealsScreen

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
