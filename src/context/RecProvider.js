import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contexto from './index';
import fetchs from '../fetchs';
const {
  fetchFoods,
  fetchBtnFoods,
  fetchDrinks,
  fetchBtnDrinks,
  reqCategoryDrink,
  reqCategoryFood,
} = fetchs;

export default function RecProvider({ children }) {
  const [mealFixedList, setMealFixedList] = useState([]);
  const [drinkFixedList, setDrinkFixedList] = useState([]);
  const [btnFoodFixedList, setBtnFoodFixedList] = useState([]);
  const [btnDrinkFixedList, setBtnDrinkFixedList] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [listApi, setListApi] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [type, setType] = useState('foods');
  const [searchArea, setSearchArea] = useState(false);

  const initialRequest = async () => {
    const food = await fetchFoods();
    setMealFixedList(food.meals);
    const btnApiFood = await fetchBtnFoods();
    setBtnFoodFixedList(btnApiFood.meals);
    const drink = await fetchDrinks();
    setDrinkFixedList(drink.drinks);
    const btnApiDrink = await fetchBtnDrinks();
    setBtnDrinkFixedList(btnApiDrink.drinks);
      if (type === 'drinks') {
      setButtons(btnDrinkFixedList);
      setListApi(drinkFixedList);
    } else {
      setButtons(btnFoodFixedList);
      setListApi(mealFixedList);
    }
  }

  const reqApiCategory = async (category) => {
    if(type === 'drinks') {
      const req = await reqCategoryDrink(category);
        const searchItem = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=52917`);
      setFilterCat(req.drinks);
    } else {
      const req = await reqCategoryFood(category);
        const searchItem = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=52917`);
      setFilterCat(req.meals);
    }
  }

  const alterType = (type) => {
    setType(type);
  }

  const clearFilterCat = () => {
    setFilterCat([]);
  }

  const setSearchBar = (bool) => {
    if(bool === undefined) {
    setSearchArea(!searchArea);
    } else setSearchArea(bool);
  }

  const setInListApi = (list) => {
    setListApi(list);
  }

  const setSearchItem = (items) => {
    if(type === 'drinks') {
      setFilterCat(items.drinks);
    } else setFilterCat(items.meals);
  }

  // const reqApiProgressDrinks = async (id) => {
  //   const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  //   const result = await fetch(url);
  //   const data = await result.json();
  //   setDrinksInProgress(data.drinks);
  // };

  // const reqApiProgressFoods = async (id) => {
  //   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  //   const result = await fetch(url);
  //   const data = await result.json();
  //   setFoodsInProgress(data.meals);
  // };

  // const reqApiFoodsID = async (id) => {
  //   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  //   const result = await fetch(url);
  //   const data = await result.json();
  //   setFoodID(data.meals);
  // };

  // const reqApiDrinksID = async (id) => {
  //   const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  //   const result = await fetch(url);
  //   const data = await result.json();
  //   setDrinkID(data.drinks);
  // };

  //  const setFetch = (apiReq) => {
  //   if (Object.keys(apiReq).includes('drinks')) {
  //     setDrink(apiReq.drinks);
  //   } else if (Object.keys(apiReq).includes('meals')) {
  //     setFood(apiReq.meals);
  //   }
  // };

  // const sendInputSearch = (e) => {
  //   setInputSearch(e);
  // };

  const context = {
    buttons,
    listApi,
    type,
    searchArea,
    filterCat,
    btnFoodFixedList,
    btnDrinkFixedList,
    mealFixedList,
    drinkFixedList,
    setInListApi,
    alterType,
    setSearchBar,
    reqApiCategory,
    clearFilterCat,
    setSearchItem,
    initialRequest,
    // food,
    // drink,
    // search,
    // setSearch,
    // inputSearch,
    // setFetch,
    // sendInputSearch,
    // foodsIn12,
    // drinksIn12,
    // btnFoods,
    // btnDrinks,
    // filterCategory,
    // reqApiCategory,
    // filterCategoryDrink,
    // reqApiCategoryDrink,
    // setFilterCategoryDrink,
    // setFilterCategory,
    // resetFilters,
    // resetFiltersDrink,
    // foodId,
    // reqApiFoodsID,
    // reqApiDrinksID,
    // drinkId,
    // reqApiProgressFoods,
    // foodsInProgress,
    // drinksInProgress,
    // reqApiProgressDrinks,
    // searchArea,
    // setSearchBar,
  };

  return (
    <contexto.Provider value={ { context } }>
      {children}
    </contexto.Provider>
  );
}

RecProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
