import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';      // Dispatch
import { setFilters } from '../store/actions/meals';


const FiltersScreen = (props) => {
    const { navigation } = props;      // Destructuring 

    const [isGlutenFree, setIsGlutenFree] = useState(false);    // false iken switch kapalı biçimde olur
    const [isVegan, setIsVegan] = useState(false);    
    const [isVegetarian, setIsVegetarian] = useState(false);    
    const [isLactoseFree, setIsLactoseFree] = useState(false);    


    const GlutenFreeHandler = (value) => {
        // setIsGlutenFree(value);    Bu da alttaki de aynı şekilde çalışır
        
        setIsGlutenFree(!isGlutenFree)
    }


    // Dispatch
    const dispatch = useDispatch();


    // Save butonu için fonksiyon oluşturduk
    // Bu fonksiyonu aşağıdaki useEffect kısmında param atayarak en alttaki navigationOptions kısmında kullanabileceğiz
    const saveFilters = useCallback(() => {
        const appliedFilteres = {
            glutenFree: isGlutenFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
            lactoseFree: isLactoseFree
        }

        // Console.log(appliedFilteres);
        dispatch(setFilters(appliedFilteres));
    }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree, dispatch])


    useEffect(() => {
        navigation.setParams({ save: saveFilters })
    }, [saveFilters])
 

    // Her bir filtre için template niteliğinde bir fonksiyon oluşturduk. <Filters /> componentini aşağıda çağıracağız (Normalde farklı bir dosya içerisinde de oluşturabilirdik ama sadece burada kullandığım için onu yapmadım)
    const Filters = props => {
        return (
            <View style={styles.filterContainer}>
                <Text style={styles.filterNames}>{props.label}</Text>
                <Switch 
                    trackColor={{ true: Colors.primaryColor }}
                    thumbColor={{ true: Colors.secondaryColor }}
                    value={props.state}
                    onValueChange={props.onChange}
                />
            </View>
        )
    }


    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Filters</Text>
            {/* <View style={styles.filterContainer}>
                <Text style={styles.filterName}>Gluten-free</Text>
                <Switch 
                    trackColor={{ true: Colors.primaryColor }}      // Switch'i sağa çektiğimizdeki o aradaki renk
                    thumbColor={Colors.secondaryColor}              // Switch'in kapalıyken gözüken yuvarlak kısmı
                    value={isGlutenFree}
                    onValueChange={GlutenFreeHandler}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterName}>Vegan</Text>
                <Switch 
                    trackColor={{ true: Colors.primaryColor }}      
                    thumbColor={Colors.secondaryColor}                
                    value={isVegan}
                    onValueChange={() => setIsVegan(!isVegan)}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterName}>Vegetarian</Text>
                <Switch 
                    trackColor={{ true: Colors.primaryColor }}      
                    thumbColor={Colors.secondaryColor}                
                    value={isVegetarian}
                    onValueChange={() => setIsVegetarian(!isVegetarian)}
                />
            </View>
            <View style={styles.filterContainer}>
                <Text style={styles.filterName}>Lactose-free</Text>
                <Switch 
                    trackColor={{ true: Colors.primaryColor }}      
                    thumbColor={Colors.secondaryColor}                
                    value={isLactoseFree}
                    onValueChange={() => setIsLactoseFree(!isLactoseFree)}
                />
            </View> */
            
                // Yukarı kısmı yorum satırına alıp aşağıdaki <Filters /> componentine props yollayarak daha düzgün bir kod yapısına ulaştık
            }

            
            <Filters 
                label="Gluten-free"
                state={isGlutenFree}
                onChange={GlutenFreeHandler}
            />
            
            <Filters 
                label="Vegan"
                state={isVegan}
                onChange={() => setIsVegan(!isVegan)}
            />

            <Filters 
                label="Vegetarian"
                state={isVegetarian}
                onChange={() => setIsVegetarian(!isVegetarian)}
            />

            <Filters 
                label="Lactose-free"
                state={isLactoseFree}
                onChange={() => setIsLactoseFree(!isLactoseFree)}
            />
        </View>
    )
}


FiltersScreen.navigationOptions = navData => {
    return { 
        headerTitle: "Filter Meals",
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Ionicons 
                    name="menu" 
                    size={24} 
                    color="white" 
                    style={{ margin: 10}} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} 
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <AntDesign 
                    name="save" 
                    size={24} 
                    color="white" 
                    style={{ margin: 10}} 
                    onPress={navData.navigation.getParam("save")}     // useEffect kısmında "save" adında param atamıştık 
                />
            </HeaderButtons>
        )
    }
}


export default FiltersScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontFamily: "OpenSans-Bold",
        fontSize: 24,
        margin: 20
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        marginVertical: 8
    },
    filterNames: {
        fontFamily: "OpenSans-Regular",
        fontSize: 16
    }
})
