import { API_URL, RESULT_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerpage: RESULT_PER_PAGE,
    //maxPage: 1,
  },

  servings: {
    ingredientsQty: [],
    NumberServings: 0,
  },

  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    state.servings = {
      ingredientsQty: recipe.ingredients.map(
        ingredients => ingredients.quantity / recipe.servings
      ),
      NumberServings: recipe.servings / recipe.servings,
    };

    decreaseServings();
    decreaseServings();
    decreaseServings();
    decreaseServings();
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        servings: rec.servings,
        cookingTime: rec.cooking_time,
        ingredients: rec.ingredients,
      };
    });
    //maxPage = Math.ceil(state.search.results.length / RESULT_PER_PAGE);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const increaseServings = function () {
  state.recipe.servings++;
  state.recipe.ingredients = state.recipe.ingredients.map(
    (ingredients, index) => {
      return {
        quantity: ingredients.quantity + state.servings.ingredientsQty[index],
        unit: ingredients.unit,
        description: ingredients.description,
      };
    }
  );
};

export const decreaseServings = function () {
  if (state.recipe.servings > 1) {
    state.recipe.servings--;
    state.recipe.ingredients = state.recipe.ingredients.map(
      (ingredients, index) => {
        return {
          quantity: ingredients.quantity - state.servings.ingredientsQty[index],
          unit: ingredients.unit,
          description: ingredients.description,
        };
      }
    );
  }
};

export const addBookMark = function (recipe) {
  //Add bookMarkk
  state.bookmarks.push(recipe);

  //Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerpage;
  const end = page * state.search.resultsPerpage;
  return state.search.results.slice(start, end);
};

export const resetPage = function () {
  state.search.page = 1;
};
//Delete bookmark
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
