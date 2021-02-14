import React, { useEffect, useCallback } from 'react'
import { Button, StyleSheet, Text, View, ScrollView, Image } from 'react-native'

// import { MEALS } from '../data/dummy-data';      Redux eklendikten sonra yorum satırına aldık
import { HeaderButtons, Item } from 'react-navigation-header-buttons';      // Header Buttons
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';


const MealDetailsScreen = (props) => {
    const mealId = props.navigation.getParam("mealID");            // "MealsScreen.js" den "mealID" adında param aldık


    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    // NOT: Redux eklendikten sonra yorum satırına aldık. Bu fonksiyonu güncelleyerek aşağıda kullanacağız


    // Redux:
    const availableMeals = useSelector(state => state.meals.meals);

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);


    // Dispatch:
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {       // Sonsuz bir döngü olmaması için useCallback ekliyoruz
        // dispatch(toggleFavorite(selectedMeal.id));       // Alttaki de olur bu da
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });    // navigationOptions'a "toggleFav" adında param yolluyoruz"
    }, [toggleFavoriteHandler])


    return (
        // <View style={styles.screen}>
        //     <Text>{selectedMeal.title}</Text>
        //     <Button title="Go Back to Main Page" onPress={() => {
        //         props.navigation.popToTop();       // En baştaki sayfaya götürür
        //     }}/>
        // </View>


        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedMeal.imageURL }} />
            <View style={styles.details}>
                <Text style={styles.text}>{selectedMeal.duration}m</Text>
                <Text style={styles.text}>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text style={styles.text}>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            
            <View style={styles.mealInfoContainer}>
                <Text style={styles.title}>Ingredients</Text>
                {selectedMeal.ingredients.map(ingredient => <Text style={styles.ingredients} key={ingredient}>{ingredient}</Text>)}
                
                <Text style={styles.title}>Steps</Text>
                {selectedMeal.steps.map(step => <Text style={styles.steps} key={step}>{step}</Text>)}
            </View>
        </ScrollView>
    )
}


// Dynamic Navigation Header
MealDetailsScreen.navigationOptions = navigationData => {
    //nconst mealId = navigationData.navigation.getParam("mealID");            

    // const selectedMeal = MEALS.find(meal => meal.id === mealId);
    // NOT: "selectedMeal" ı yorum satırına aldım. "mealTitle" adında param yollayarak veri geçişi sağlayacağız
    // NOT: "useSelector" bu fonksiyonun içinde kullanılamaz. Bu yüzden param yollayarak bu sorunu çözüyoruz

    const mealTitle = navigationData.navigation.getParam("mealTitle");

    const toggleFavorite = navigationData.navigation.getParam("toggleFav");

    return {
        // headerTitle: selectedMeal.title,
        // NOT: Bu kısmı yorum satırına aldım. Çünkü Redux kullanacağız

        headerTitle: mealTitle,     // Redux eklenince 
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Favorite"     
                    iconName="star"       // https://icons.expo.fyi/AntDesign/star  ----->  icon name (star) buradan geliyor
                    // onPress={() => {      
                    //     console.log("Marked as favorite")
                    // }}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    }
}


export default MealDetailsScreen

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
    },
    details: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around"
    },
    text: {
        fontFamily: "OpenSans-Bold"
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        fontFamily: "OpenSans-Bold"
    },
    mealInfoContainer: {
        marginHorizontal: 20,
        marginVertical: 8,
        borderColor: "white",
        borderWidth: 1
    },
    ingredients: {
        marginVertical: 5,
        borderColor: "black",
        borderWidth: 1,
        padding: 10
    },
    steps: {
        marginVertical: 3,
    }
})


// ___ HEADER BUTTONS ___
// yarn add react-navigation-header-buttons
// Navigation header'ın sağ kısmına simge eklemek için bu paketi indirdik
// components klasörü içinde "CustomHeaderButton.js" dosyasını oluşturup bu dosyadaki "headerRight" kısmında kullandık