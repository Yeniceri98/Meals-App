import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE } from '../actions/meals';
import { SET_FILTERS } from '../actions/meals';


const initialState = {
    meals: MEALS,             // Başlangıçta MEALS dataları gözükecek
    filteredMeals: MEALS,     // Başlangıçta herhangi bir filtre uygulanmadığı için MEALS dataları gözükecek
    favoriteMeals: []         // Başlangıçta favoriye eklenen bir yemek olmadığı için boş
}

const mealsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            
            if (existingIndex >= 0) {       // index 0'dan büyükse o item fav menüsünde var olmuş olacak. Yani bu durumda fav menüsündeki yemeği silecek
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals }
            } 
            
            else {
                const meal = state.meals.find(meal => meal.id === action.mealId)
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
            }
        
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {      // Eğer glutenFree filtresi seçilmiş ve yemek glutenFree değilse false döndürüyor (Diğerleri de aynı şekilde)
                    return false;
                }
                
                if (appliedFilters.vegan && !meal.vegan) {
                    return false;
                }

                if (appliedFilters.vegetarian && !meal.vegetarian) {
                    return false;
                }

                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }

                return true;
            })

            return { ...state, filteredMeals: updatedFilteredMeals }

        default:
            return state;
    }
}

export default mealsReducer;


// App.js'de Redux atamalarını yapıyoruz
// screens klasörünün içindeki dosyalarda MEALS'ı kullandıklarımızda bu dosyadaki Redux işlemini yapacağız
/*
    MEALS kullanılan dosyalar:
    MealDetailsScreen  ----->  Burada actions klasöründe oluşturulan dispatch'i de kullanacağız
    MealsScreen
    FavoriteMealsScreen
*/