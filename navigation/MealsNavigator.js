import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';          // Stack Navigator
import { createBottomTabNavigator } from 'react-navigation-tabs';       // Tabs Navigator
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';    // Android'de kullanacağız
import { createDrawerNavigator } from 'react-navigation-drawer';        // Drawer Navigator
import { createAppContainer } from "react-navigation";                  // Navigator'ı kullanabilmek için burası da import edilmeli
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MealCategoriesScreen from '../screens/MealCategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import FavoriteMealsScreen from '../screens/FavoriteMealsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

// Navigation 5:
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';


// Stack Navigator'da kullanılmasını istediğimiz screenleri atarız
const MealsNavigator = createStackNavigator({
    MealCategories: MealCategoriesScreen,         // Sol kısımdaki isimlendirmeyi istediğimiz gibi yapabiliriz
    Meals: {
        screen: MealsScreen                       // Böyle obje şeklinde de atayabiliyoruz. Ekstra property'ler eklenebilir
    },
    MealDetails: MealDetailsScreen
}, 
{                                                 // createStackNavigator 2 parametre alır. İkinci parametrede navigation için header styling yapabiliriz. Böylece her bir dosya için ayrı style ataması yapmamış oluruz
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : " "
        },
        headerTitleStyle: {
            color: Platform.OS === "android" ? "white" : Colors.primaryColor,
            fontFamily: "OpenSans-Bold"
        },
    }
})


// Favorilere eklenecek yemekler için bir stack navigator daha oluşturduk
const FavoritesNavigator = createStackNavigator({
    Favorites: FavoriteMealsScreen,     // Tab ismi olarak "Favorites" gözükür. Bunu "headerTitle" prop'uyla değiştirebiliriz. Bunu bu kısımda da yapabiliriz "FavoriteMealsScreen.js" dosyasında da yapabiliriz
    MealDetails: MealDetailsScreen      // Yukarıda başka bir stack navigator'da bulunan sayfayı burada da ekleyebiliriz
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : " "
        },
        headerTitleStyle: {
            color: Platform.OS === "android" ? "white" : Colors.primaryColor,
            fontFamily: "OpenSans-Bold"
        },
    }
})


// Stack Navigator Navigation 5:
// const Stack = createStackNavigator();
// export const StackNavigator = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="MealCategories" component={MealCategoriesScreen} />
//             <Stack.Screen name="Meals" component={MealsScreen} />
//             <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
//         </Stack.Navigator>
//     )
// }


// Tab Navigator Navigation 5:
// const Tabs = createBottomTabNavigator();
// export const TabNavigator = () => {
//     return (
//         <Tabs.Navigator>
//             <Tabs.Screen name="MealCategories" component={StackNavigator} />
//             <Tabs.Screen name="FavoriteMeals" component={FavoriteMealsScreen} />
//         </Tabs.Navigator>
//     )
// }


// Tab Navigator (Yorum satırına aldım çünkü bir alt kısımda iOS ve Android için 2 farklı tab dizaynı yaptım)
// const TabNavigator = createBottomTabNavigator({
//     MealCategories: { screen: StackNavigator, navigationOptions: {          // Bu şekilde direkt diğer navigator'a atama yapabiliriz. Bunun yerine screen adı da verebilirdik
//         tabBarIcon: tabInfo => {
//             return <Ionicons name="restaurant" size={24} color={tabInfo.tintColor} />
//         }
//     }},    
//     Favorites: { screen: FavoriteMealsScreen, navigationOptions: {
//         tabBarIcon: tabInfo => {
//             return <MaterialIcons name="favorite" size={24} color={tabInfo.tintColor}/>
//         }
//     }}
// },
// {
//     tabBarOptions: {
//         activeTintColor: Colors.secondaryColor
//     }
// })


// createMaterialBottomTabNavigator ile createBottomTabNavigator'in çalışma mekanizması aynıdır
// Bu yüzden "tabBarScreenConfig" adında bir obje oluşturup daha önceden createBottomTabNavigator'ın 1. parametresinde yer alan kısmı buraya yapıştırdım
// Böylece her iki navigator'da da aynı parametreyi kullanırken daha kısa bir syntax oluşturmuş olduk
const tabBarScreenConfig = {
    MealCategories: { 
        screen: MealsNavigator,     // Bu şekilde direkt diğer navigator'a atama yapabiliriz. Bunun yerine screen adı da verebilirdik
        navigationOptions: {          
            tabBarIcon: tabInfo => {
                return <Ionicons name="restaurant" size={24} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor    // Ripple efekt verir (NOT: Sadece shifting: true olduğu durumlarda )
    }   },    
    Favorites: { 
        screen: FavoritesNavigator,     // 2. stack navigator oluşturmadan önce "FavoritesNavigator" yerine "FavoriteMealsScreen" yazıyordu
        navigationOptions: {     
            tabBarIcon: tabInfo => {
                return <MaterialIcons name="favorite" size={24} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.secondaryColor
    }   }   
}


// Tab Navigator (iOS ve Android'de farklı olacak şekilde)
const TabNavigator = Platform.OS === "android" ? createMaterialBottomTabNavigator(tabBarScreenConfig, {
    activeColor: "white",     // Tek farkı activeTintColor yerine activeColor 
    shifting: true
}) 

: createBottomTabNavigator(tabBarScreenConfig, {
    tabBarOptions: {
        activeTintColor: "white"
    }
})


// FiltersScreen.js için Stack Navigator:
const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : " "
        },
        headerTitleStyle: {
            color: Platform.OS === "android" ? "white" : Colors.primaryColor,
            fontFamily: "OpenSans-Bold"
        },
    }
})


// Drawer Navigator (Ana navigator olacak)
const MainNavigator = createDrawerNavigator({
    MealsFavs: { 
        screen: TabNavigator, 
        navigationOptions: {
            drawerLabel: "Meal Categories"
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: "Filters"
        }
    }
},
{
    contentOptions: {
        activeTintColor: Colors.secondaryColor,
        labelStyle: {
            fontFamily: "OpenSans-Regular"
        }
    }
})



// export default createAppContainer(StackNavigator);       // Yukarıda "createAppContainer" import edilmişti. Bu şekilde kullanmamız lazım
// export default createAppContainer(TabNavigator);         // Yukarıdakini yorum satırına aldım çünkü Stack Navigator'ı TabNavigator olarak değiştirdik
export default createAppContainer(MainNavigator);           // Drawer Navigator'ı ana navigatorımız olarak değiştirdik 


// createStackNavigator'ın 2. parametresinde "defaultNavigationOptions" adında global bir navigation header style oluşturduk ve "title" haricinde (çünkü her bir sayfanın başlığı farklı) her bir dosya için ayrı ayrı style ataması yapmaktan kurtulduk
// "navigationOptions" createStackNavigator'ın 1. parametresinde de her bir screen için ayrı ayrı tanımlanabilir. Fakat o şekilde de sürekli aynı styling kodunu yazmak zorunda kalacağız yani bir değişiklik olmayacak