import React, { useState } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import * as Font from 'expo-font';                          // Custom Font için ekledik  ----->  expo install expo-font  ----->  https://fonts.google.com/ sitesinden istediğim font'u yükleyip "assets" klasörü içindeki "fonts" klasörüne attım
import AppLoading from 'expo-app-loading';                  // Custom Font kullanmak için ekledik  ----->  expo install expo-app-loading  
import { enableScreens } from 'react-native-screens';       // Optimizasyon için import ettik. Büyük uygulamalarda programın daha hızlı çalışmasını sağlar  ----->  expo install react-native-screens

// Navigation 5:
// import { TabNavigator } from './navigation/MealsNavigator';
// import { StackNavigator } from './navigation/MealsNavigator';
// import { NavigationContainer } from '@react-navigation/native';

import MealsNavigator from './navigation/MealsNavigator';

// Redux Imports:
import { createStore, combineReducers } from 'redux'    
import { Provider } from 'react-redux';                 // "Provider", return kısmında MealsNavigator'ı kapsayacak şekilde yerleştirilecek
import mealsReducer from './store/reducers/meals';


console.disableYellowBox = true;    // Warning mesajlarının gözükmesini engeller
enableScreens();                    // Optimizasyon


// Redux:
const rootReducer = combineReducers({
    meals: mealsReducer                     // Soldaki isimlendirmeyi istediğimiz gibi yapabiliriz
})

const store = createStore(rootReducer);     // "Provider" ın aldığı "store" propunda buradaki değişkeni atayacağız


const fetchFonts = () => {
    return Font.loadAsync({
        'OpenSans-Regular' : require('./assets/fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold' : require('./assets/fonts/OpenSans-Bold.ttf')
    })
}


export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={() => console.log(err)}
            />
        )
    }

    return (
        // Navigation 5:
        // <NavigationContainer>
        //     <TabNavigator />
        // </NavigationContainer>


        <Provider store={store}>
            <MealsNavigator />
        </Provider>
    );
}


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',       
//     },
// });



// ___ PROJE TASLAĞI ___
// MealCategoriesScreen.js'de kategori seçilecek (italyan, çin vs) 
// MealCategoriresScreen.js'de seçilen kategoriye göre Meal.js'de o kategorinin yemekleri gözükecek
// MealScreen.js'de seçilen yemeğe ait detaylar MealDetails.js'de olacak
// FavoriteMealsScreen.js'de kullanıcının favoriye eklediği yemekler bulunacak
// FiltersScreen.js'de filtreleme olacak


// ___ CUSTOM FONT ___
// https://fonts.google.com/
// Custom font için  ----->  expo install expo-font
// AppLoading için  ----->  expo install expo-app-loading  


// ___ REACT NAVIGATION ___
// https://reactnavigation.org/docs/getting-started
// 5x çıkmasına rağmen 4x versiyonunu kullanacağız (İleride 5 de kullanılacak)
// Installing Navigation  ----->  yarn add react-navigation
// Installing Dependencies  ----->  expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view


// ___ 1)STACK NAVIGATOR ___
// yarn add @react-navigation/stack
// import { createStackNavigator } from 'react-navigation-stack'; şeklinde import etmeliyiz


// ___ 2)TAB NAVIGATOR ___          (Platform componentiyle iOS'da bu navigator'ı atayacağız)
// yarn add react-navigation-tabs
// import { createBottomTabNavigator } from 'react-navigation-tabs'; şeklinde import etmeliyiz


// ___ 2-B)createMaterialBottomTabNavigator        (Android'de bu navigator'ı kullanacağız)
// yarn add react-navigation-material-bottom-tabs react-native-paper
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// Android telefonlardaki tab görünümüne daha çok uyar


// ___ 2-C)React Native Paper
// yarn add react-native-paper


// ___ 3)DRAWER DAVIGATOR ___
// yarn add react-navigation-drawer
// import { createDrawerNavigator } from 'react-navigation-drawer'; şeklinde import etmeliyiz


// ___ HEADER BUTTONS ___
// yarn add react-navigation-header-buttons
// "MealDetails.js" de navigation header'ın sağ kısmına simge eklemek için bu paketi indirdik


// ___ EXPO VECTOR ICONS ___
// https://icons.expo.fyi/
// yarn add @expo/vector-icons
// components > HeaderButton.js'de icon kullanmak için indirdik
// Sonrasında "CustomHeaderButton.js" dosyasını "MealDetails.js" de import ettik


// ___ REDUX ___
// https://react-redux.js.org/introduction/quick-start
// yarn add redux
// yarn add react-redux
// Redux için "store" adlı klasör oluşturduk. Bu klasörün içinde de "actions" ve "reducers" adlı 2 klasör oluşturduk