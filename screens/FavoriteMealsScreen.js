import React from 'react'
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; 
import CustomHeaderButton from '../components/CustomHeaderButton';


const FavoriteMealsScreen = (props) => {
    const favMeals = MEALS.filter(meal => meal.id === "m1" || meal.id === "m2")

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
