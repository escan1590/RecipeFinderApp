import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    //Loading recipe

    await model.loadRecipe(id);
    resultView.render(model.getSearchResultPage());
    bookmarksView.render(model.state.bookmarks);
    //2)rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) Load searrch results

    await model.loadSearchResults(query);

    //3) renderResults

    resultView.render(model.getSearchResultPage());

    //4) render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};
const controlAddBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlPagination = function (page) {
  resultView.render(model.getSearchResultPage(page));
  paginationView.render(model.state.search);
};
0;

const ingredientPlus = function () {
  model.increaseServings();
  recipeView.update(model.state.recipe);
};

const ingredientMinus = function () {
  model.decreaseServings();
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerRenderQtyMinus(ingredientMinus);
  recipeView.addHandlerRenderQtyPlus(ingredientPlus);
  recipeView.addHandlerAddBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
