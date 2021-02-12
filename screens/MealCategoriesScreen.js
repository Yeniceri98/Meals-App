import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Platform } from 'react-native'

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; 


const MealCategoriesScreen = (props) => {
    // const [people, setPeople] = useState([
    //     { id: 1, name: "Ahmet" },
    //     { id: 2, name: "Hüseyin" },                      Aşağıdaki FlatList'e örnek olması için yaptım
    //     { id: 3, name: "Alperen" },
    //     { id: 4, name: "Safa" },
    // ])


    const renderGridItem = itemData => {                       // Normalde fonksiyonun üstünde tanımlamıştık fakat o şekildeyken "props" a ulaşamazdık. Bu yüzden fonksiyonun içine aldık
        return (
            // <TouchableOpacity 
            //     style={styles.gridItemStyle} 
            //     onPress={() => {
            //         props.navigation.navigate({ 
            //             routeName: 'Meals', 
            //             params: {                              // "params" sayfalar arası veri geçişi için kullanılır. "Meals" sayfasına seçilen kategorinin id'sini yollayacağız. Böylece seçilen kategori hakkında bilgi alma işlemini gerçekleştireceğiz
            //                 categoryId: itemData.item.id       // "categoryId" ismi yerine farklı bir isim de verilebilir. "MealsScreen.js" de burada verilen isimle çağırmalıyız
            //             }
            //         });         
            //     }}
            // >
            //     <View>
            //         <Text>{itemData.item.title}</Text>     
            //     </View>
            // </TouchableOpacity>

            // Yukarıyı yorum satırına alıp bu kısmı components klasörünün içindeki "CategoryGridTile.js" e taşıdım. Daha düzenli bir kod yapısı sunar


            <CategoryGridTile                   
                title={itemData.item.title}          // title, color ve onSelect prop'larını "CategoryGridTile.js" e yolluyoruz
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({ 
                        routeName: "Meals", 
                        params: {                              
                            categoryId: itemData.item.id    // "MealsScreen.js" e param'la "categoryId" yi yolluyoruz   
                        }
                    });    
                }}
            />
        )
    }

    return (
        // <View style={styles.screen}>
        //     <Text>Meal Categories Screen</Text>
        //     <Button title="Go to Meals Screen" onPress={() => {
        //         props.navigation.navigate({ routeName: 'Meals' })         // "MealsNavigator.js" de tanımlanan screen adını yazmalıyız. Orada "Meals" tanımlaması yapmıştık
        //     }} />
        // </View>


        // <FlatList 
        //     keyExtractor={(item, index) => item.id}
        //     data={people}                                      FlatList örneği olması açısından yaptım
        //     renderItem={({ item }) => (                        category.js ve dummy-data.js'deki gibi yapmadan yukarıda useState oluşturarak da yapılabilir
        //         <Text>{item.name}</Text>
        //     )}
        // />


        <FlatList 
            keyExtractor={(item, index) => item.id}
            data={CATEGORIES} 
            renderItem={renderGridItem} 
            numColumns={2}                  // 1 satırda kaç adet itemin gözükeceğini belirler
        />
        
    )
}


// Navigation header'ı için style ataması yapabiliriz
// NOT: Title atamazsak direkt default ismi verir. Yani title atamamız şart değildir
// NOT: Sayfayı yenilemeden değişiklikler gözükmüyordu fakat global style yapınca (MealsNavigator.js'de yaptık) o sorun da ortadan kalktı
MealCategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: "Meal Categories",    
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Ionicons name="menu" size={24} color="white" style={{ margin: 10}} onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }

    
    // NOT: Alttaki kısmı yorum satırına aldım çünkü "MealsNavigator.js" dosyasında global bir navigation header styling oluşturduk. Böylece her seferinde style ataması yapmamız gerekmez. Sadece başlık için ekstra ekleme yaparız çünkü her bir sayfanın başlığı farklıdır
    
    // headerStyle: {
    //     backgroundColor: Platform.OS === "android" ? Colors.primaryColor : " "
    // },
    // headerTitleStyle: {
    //     textAlign: "center",
    //     color: Platform.OS === "android" ? "white" : Colors.primaryColor
    // },
}


export default MealCategoriesScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    // gridItemStyle: {
    //     flex: 1,
    //     margin: 15,
    //     height: 200
    // }
})
