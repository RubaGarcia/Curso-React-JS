import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { Drink, SearchFilter } from "../types"

export async function getCategories(){


    // const url = 'www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'

    const url= 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    // const url = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"
    const {data} = await axios.get(url)

    const result = CategoriesAPIResponseSchema.safeParse(data)

    if(result.success){
        return result.data
    }
}



export async function getRecipes(filters:SearchFilter){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await axios.get(url)

    // console.log(data)
    const result = DrinksAPIResponse.safeParse(data)

    if(result.success){
        return result.data
    }
}


export async function getRecipeById(id:Drink['idDrink']){
    // console.log(id)
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios.get(url)

    // console.log(data)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success){
        return result.data
    }
}