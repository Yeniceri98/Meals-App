import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import { CATEGORIES, MEALS } from '../data/dummy-data';
import Colors from '../constants/Colors'
import { FlatList } from 'react-native-gesture-handler';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';


const MealsScreen = (props) => {
    
    // FlatList eklendikten sonra, renderItem property'si için aşağıdaki kısmı ekliyoruz (İlk olarak sadece "title" ı ekledik. Basılan kategoriye ait olan title'lar yani yemek adları gözükecek)
    // const renderMealItem = itemData => {
    //     return (
    //         // <View>
    //         //     <Text>{itemData.item.title}</Text>      
    //         // </View>

    //         // Yukarıyı yorum satırını aldım çünkü components klasörü içinde "MealItem.js" adında dosya oluşturdum. Buradan oraya props yollayacağız ve daha düzgün bir yapı oluşacak

    //         <MealItem 
    //             onSelectMeal={() => {
    //                 props.navigation.navigate({ routeName: "MealDetails", params: {      // Yemeklerden birine basınca "MealDetails" sayfasına geçecek. Veri geçişi için de "params" kullanıyoruz
    //                     mealID: itemData.item.id
    //                 } })
    //             }}
    //             title={itemData.item.title} 
    //             duration={itemData.item.duration}
    //             complexity={itemData.item.complexity}
    //             affordability={itemData.item.affordability}
    //             image={itemData.item.imageURL}
    //         />
    //     )
    // }

    // "renderMealItem" fonksiyonunu components'in içindeki "MealList.js" e taşıdım


    const catID = props.navigation.getParam("categoryId");      // "MealCategoriesScreen.js" de "categoryId" adında param alarak bu dosyaya veri geçişi sağlıyoruz

    // const selectedCategory = CATEGORIES.find(cat => cat.id === catID);        Yorum satırına aldım çünkü yeni oluşturulan MEALS datasındaki "categoryID" ye göre işlem yapacağız
    
    const displayedMeals = MEALS.filter(meal => {
        return meal.categoryId.includes(catID);       // catID'yi içeren categoryID'leri filtreliyoruz
    })


    return (
        // <View style={styles.screen}>
        //     {/* <Text>Meals Screen</Text>
        //     <Text>{selectedCategory.title}</Text>
        //     <Button title="Go to Meal Details Screen" onPress={() => {
        //         props.navigation.navigate('MealDetails')                  // "MealCategoriesScreen.js" dekinden farklı olarak bu şekilde de yapabiliriz (Ek olarak "navigate" yerine "push" da kullanılabilir)
        //     }} />
        //     <Button title="Go Back" onPress={() => {
        //         props.navigation.goBack();              // Önceki sayfaya geri döndürür. Bu buton olmadan da ekranın sol üstündeki ok sayesinde geri gidebiliyoruz ("goBack" yerine "pop" da kullanılabilir. Fakat sadece stack navigator'a özgüdür)
        //     }} /> */
        //     }
        // </View>

        // Yukarı kısmı yorum satırına aldım çünkü "MealCategories" sayfasındaki kategorilerden birine tıklayınca "Meals" sayfasında basılan kategoriye ait bilgilerin gözükmesini sağlayacağız. Bunu da <FlatList /> ile yapacağız


        // <View style={styles.screen}>
        //     <FlatList 
        //         data={displayedMeals}
        //         keyExtractor={(item, index) => item.id}
        //         renderItem={renderMealItem}
        //         style={{ width: "100%", padding: 10 }}
        //     />            
        // </View>

        // Yukarı kısmı components'in içindeki "MealList.js" e taşıdım ("FavoriteMealScreen.js" eklendikten sonra bu dosyayla o dosya <MealList /> componentini kullanacak )


        <MealList listData={displayedMeals} navigation={props.navigation} />
    )
}


// "MealCategoriesScreen.js" de yaptığımız gibi navigation'ın header'ında düzenleme yapacağız. Basılan kategorinin adı header kısmında gözükecek
// Fakat bunu yaparken headerTitle: selectedCategory.title şeklinde yapamayız çünkü o kısım fonksiyonun içinde
// Bu yüzden dinamik şekilde yapmalıyız:
MealsScreen.navigationOptions = (navigationData) => {
    console.log(navigationData);

    const catID = navigationData.navigation.getParam("categoryId");         // getParam ile "categoryId" adından oluşturulan objeyi burada aldık

    const selectedCategory = CATEGORIES.find(cat => cat.id === catID);

    return {
        headerTitle: selectedCategory.title,

        // NOT: Alttaki kısmı yorum satırına aldım çünkü "MealsNavigator.js" dosyasında global bir navigation header styling oluşturduk. Böylece her seferinde style ataması yapmamız gerekmez. Sadece başlık için ekstra ekleme yaparız çünkü her bir sayfanın başlığı farklıdır

        // headerStyle: {
        //     backgroundColor: Platform.OS === "android" ? Colors.secondaryColor : " "
        // },
        // headerTitleStyle: {
        //     color: Platform.OS === "android" ? "white" : Colors.secondaryColor
        // },
    }
}


export default MealsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
